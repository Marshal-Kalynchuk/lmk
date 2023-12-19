

// Import the GPT API
import { generateContent } from './gptAPI.js';




async function contentGenerator(inputData) {
    try {
        // Format the input data for GPT
        const prompt = createPrompt(inputData);

        // Send a request to the GPT API
        const generatedContent = await generateContent(prompt);

        // Process and return the generated content
        //console.log(generatedContent);
        return formatGeneratedContent(generatedContent);
    } catch (error) {
        console.error('Error generating content:', error);
        // Handle error appropriately
    }
}



function createPrompt(inputObject) {
    let prompt = "Write a brief summary about: " + inputObject.headline;
    prompt += ". Content: " + inputObject.linkData.content;
    prompt += "add the title of the article: " + inputObject.headline;
    prompt += " And put the link at the end of the content: " + inputObject.link;

    return prompt;
}

function formatGeneratedContent(generatedContent) {
    // Post-process and format the generated content as needed

    return generatedContent;
}
async function main() {
    // Sample inputData based on the provided format
    const inputData = [
        {
            headline: 'U.S., Canada to join multi-national operation to counter attacks on commercial ships in Red Sea',
            link: 'https://www.cbc.ca/news/news/world/red-sea-ships-strikes-1.7062343',
            linkData: {
                content: "Detailed information about the operation and its significance."
            }
        },
        {
            headline: 'TOP 10 REASONS WHY YOU SHOULD VISIT CANADA',
            link: 'https://www.cbc.ca/news/news/world/CANADA',
            linkData: {
                content: "Detailed information about the operation and its significance."
            }
        }
        
    ];

    // Iterate through each input data object and generate content
    for (const inputObject of inputData) {
        const generatedContent = await contentGenerator(inputObject);
        console.log('Generated Content:', generatedContent);
    }
}

// Call the main function
main().catch(console.error);