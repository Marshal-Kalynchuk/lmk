const axios = require('axios');
const cheerio = require('cheerio');
const storageHandler = require('./storageHandler');

/**
 * Main scraping function.
 * @param {Object} config - The configuration object for the site to be scraped.
 * @returns {Object} Scraped data.
 */
async function scrapeHandler(config) {
    try {
        // Fetch the HTML content from the site
        const response = await axios.get(config.url);
        const $ = cheerio.load(response.data);

        // Define an array to store the scraped data
        let scrapedData = [];

        // Use Cheerio to extract data based on CSS selectors defined in the config
        $(config.selector).each((index, element) => {
            // Extract and process data based on the site's structure and requirements
            // For example, extracting text from an element:
            const text = $(element).text().trim();
            scrapedData.push({ text });
        });
        
        console.log(scrapedData);
        return scrapedData;
    } catch (error) {
        console.error(`Error in scrapeHandler: ${error.message}`);
        throw error; // Re-throw the error for handling upstream
    }
}

module.exports = scrapeHandler;
