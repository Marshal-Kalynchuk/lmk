require('dotenv').config();
import OpenAI from "openai";

const OPENAI_ORG_KEY = process.env.ORG_NAME;

const openai = new OpenAI({
    organization: OPENAI_ORG_KEY,
});

/**
 * Sends a request to the GPT API to generate content based on the provided prompt.
 * @param {string} prompt - The prompt to send to the GPT API.
 * @returns {Promise<string>} - The generated content.
 */
async function generateContent(prompt) {
    try {
        const completion = await openai.chat.completions.create({
            messages: [{ role: "system", content: prompt }],
            model: "gpt-4",
        });
        
        console.log(completion.choices[0]);
        return completion.choices[0];
    } catch (error) {
        console.error('Error in GPT API request:', error);
        throw error; // Rethrow the error for upstream handling
    }
}

module.exports = {
    generateContent
};
