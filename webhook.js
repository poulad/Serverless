'use strict';

const https = require('https');

function getRandomJoke() {
  return new Promise((resolve, reject) => {
    https.get(
      'https://icanhazdadjoke.com', {
        headers: {
          "Accept": "text/plain"
        },
      },
      resp => {
        let joke = ''
        resp.on('data', chunk => {
          joke += chunk
        })

        resp.on('end', () => {
          resolve(joke)
        })
      }
    ).on("error", err => {
      reject(err);
    });
  })
}


module.exports.handle = async (event, context) => {
  let joke
  try {
    joke = await getRandomJoke()
  } catch (err) {
    console.error(err)
    joke = null
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