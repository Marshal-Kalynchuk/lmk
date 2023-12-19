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
        let headlinesSet = new Set(); // Set to track unique headlines

        // Iterate over each selector configuration
        for (const selectorConfig of config.selectors) {
            const parentElements = $(selectorConfig.parentSelector);


            // Iterate over each parent element
            for (const parent of parentElements.slice(0, selectorConfig.maxElementsToScrape).get()) {
                let data = {};

                // Extract data from child selectors
                for (const [key, childSelector] of Object.entries(selectorConfig.childSelectors)) {
                    const childElement = $(parent).find(childSelector);
                    const text = childElement.text().trim();

                    if (key === 'headline' && headlinesSet.has(text)) {
                        continue; // Skip duplicate headline
                    }

                    data[key] = text;

                    // Handle links
                    if (key === 'link' && selectorConfig.linkHandling.follow && childElement.attr('href')) {
                        let link = childElement.attr('href');
                        if (selectorConfig.linkHandling.completeLink) {
                            link = selectorConfig.linkHandling.linkPrefix + link;
                        }
                        data[key] = link;
                        data['linkData'] = await followLink(link, selectorConfig.linkHandling);
                    }
                }

                if (data.headline) {
                    headlinesSet.add(data.headline);
                    scrapedData.push(data);
                }

                // Check if max links to follow is reached
                if (selectorConfig.linkHandling.follow && scrapedData.filter(d => d.linkData).length >= selectorConfig.maxLinksToFollow) {
                    break; // Exit the loop
                }
            }
        }

        console.log(scrapedData);

        return scrapedData;
    } catch (error) {
        console.error(`Error in scrapeHandler: ${error.message}`);
        throw error; // Re-throw the error for handling upstream
    }
}

/**
 * Follow a link and scrape data based on the provided selector.
 * @param {string} url - The URL to follow.
 * @param {Object} selectorConfig - The selector configuration for scraping the linked page.
 * @returns {Object} Scraped data from the linked page.
 */
async function followLink(url, selectorConfig) {
    try {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);
        let linkData = {};

        const parent = $(selectorConfig.parentSelector);

        // Extract data from child selector
        for (const [key, childSelector] of Object.entries(selectorConfig.childSelector)) {
            linkData[key] = parent.find(childSelector).text().trim();
        }

        return linkData;
    } catch (error) {
        console.error(`Error in followLink: ${error.message}`);
        return {};
    }
}


module.exports = scrapeHandler;
