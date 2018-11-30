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


module.exports.handle = async (event, context) => {
  let joke
  try {
    joke = await getRandomJoke()
  } catch (err) {
    joke = err
  }

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      joke: joke
    }),
  }
}