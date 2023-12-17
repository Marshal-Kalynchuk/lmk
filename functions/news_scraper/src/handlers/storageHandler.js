

async function storeData(siteKey, data) {
  // Logic to store data in a cloud database
  // ...

  // After storing data, trigger the next function
  await triggerNextFunction(siteKey, data);
}

async function triggerNextFunction(siteKey, data) {
  // This can be a direct API call, a message queue, or a cloud event trigger
  // Example: Sending a message to a queue
  //const messageQueueService = require('./messageQueueService');
  //await messageQueueService.sendMessage({ siteKey, data });
}

module.exports = {
  storeData
};
