const { loadConfiguration } = require('./config/index');
const scrapeHandler = require('./handlers/scrapeHandler');
const storageHandler = require('./handlers/storageHandler');

const siteKeys = ['cbc', 'theGlobeAndMailCanada', 'theGlobeAndMailWorld']; // List of site keys to scrape
async function main() {
  const promises = siteKeys.map(async (siteKey) => {
      const config = loadConfiguration(siteKey);
      if (!config) {
          console.error(`Configuration not found for siteKey: ${siteKey}`);
          return; // Skip to the next siteKey
      }

      try {
          // Scrape data
          const scrapedData = await scrapeHandler(config);

          // Store data
          await storageHandler.storeData(siteKey, scrapedData);
      } catch (error) {
          console.error(`Error processing site ${siteKey}: ${error.message}`);
          // Handle error or continue to the next site
      }
  });

  await Promise.all(promises);
}

main();
