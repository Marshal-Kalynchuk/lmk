const fs = require('fs');
const path = require('path');

// Path to the sites.json file
const configPath = path.join(__dirname, 'sites.json');

function loadConfiguration(siteKey) {
    try {
        // Read the sites.json file
        const configFile = fs.readFileSync(configPath);
        const config = JSON.parse(configFile);

        // Retrieve and return the configuration for the specified siteKey
        if (config[siteKey]) {
            return config[siteKey];
        } else {
            console.error(`No configuration found for site key: ${siteKey}`);
            return null;
        }
    } catch (error) {
        console.error(`Error loading configuration: ${error.message}`);
        return null;
    }
}

module.exports = {
    loadConfiguration,
};
