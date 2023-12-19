import dotenv from 'dotenv';
dotenv.config();
import OpenAI from 'openai';



// Set the API key

// change this to your API key
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
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
        
        return completion.choices[0];
    } catch (error) {
        console.error('Error in GPT API request:', error);
        throw error; // Rethrow the error for upstream handling
    }
}

export { generateContent };

