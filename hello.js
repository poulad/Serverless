'use strict';

module.exports.handle = async (event, context) => {
  return {
    statusCode: 200,
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      message: 'Go Serverless v1.0! Your function executed successfully!',
      input: event,
    }),
  };
};
