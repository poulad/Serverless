'use strict';

const https = require('https');

function getRandomJoke() {
  return new Promise((resolve, reject) => {
    https.get({
        hostname: 'icanhazdadjoke.com',
        headers: {
          Accept: "text/plain"
        }
      }, response => {
        let joke = ''

        response.on('data', chunk => {
          joke += chunk
        })

        response.on('end', () => {
          resolve(joke)
        })

        response.on('error', error => {
          reject(error)
        })
      })
      .on('error', error => {
        reject(error)
      })
  })
}

function postComment(owner, repo, issue, comment) {
  return new Promise((resolve, reject) => {
    let request = https.request({
        hostname: 'api.github.com',
        method: 'POST',
        path: `/repos/${owner}/${repo}/issues/${issue}/comments`,
        headers: {
          Accept: "application/vnd.github.v3+json",
          Authorization: `token ${process.env.GITHUB_TOKEN}`,
          'Content-Type': 'application/json',
          'User-Agent': 'Serverless Demo',
        }
      }, response => {
        let responseBody = ''
        response.on('data', data => {
          responseBody += data
        })
        response.on('end', () => resolve(responseBody))
        response.on('error', error => {
          reject(error)
        })
      })
      .on('error', error => {
        reject(error)
      })

    request.write(JSON.stringify({
      body: comment
    }))
    request.end()
  })
}

async function _handle(payload) {
  if (!(
      payload.action === 'created' &&
      payload.comment.body[0] !== '@'
    )) {
    return
  }

  const joke = await getRandomJoke()

  await postComment(
    payload.repository.owner.login,
    payload.repository.name,
    payload.issue.number,
    `@${payload.comment.user.login}\n> ${joke}`
  )
}

module.exports.handle = async (event, _) => {
  let response = {
    statusCode: 201
  }

  try {
    const payload = JSON.parse(event.body)
    await _handle(payload)
  } catch (err) {
    response.statusCode = 204
  }

  return response
}