import { Configuration, OpenAIApi } from "openai";
import { config } from "dotenv";
import readline from "readline";

config()

const configuration = new Configuration({
    organization: "org-G9CCjtTgP31zzOMuJcBIO35R",
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const userInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

userInterface.prompt()
userInterface.on("line", async input => {
    const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{"role": "user", "content": input}]
    });

    console.log(response.data.choices[0].message.content)
    userInterface.prompt()
})