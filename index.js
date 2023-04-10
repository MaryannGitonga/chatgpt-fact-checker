import { Configuration, OpenAIApi } from "openai";
import { config } from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import cors from 'cors';
// import readline from "readline";

config()

const configuration = new Configuration({
    organization: "org-G9CCjtTgP31zzOMuJcBIO35R",
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const app = express()
app.use(bodyParser.json())
app.use(cors())
const port = 3080

app.post('/', async (req, res) => {
    const { message } = req.body;
    const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{"role": "user", "content": `${message}`}]
    });

    console.log("response...", response.data.choices[0].message.content);

    res.json({
        message: response.data.choices[0].message.content
    })
});

app.listen(port, () => {
    console.log(`Listening at port ${port}`)
});

// const userInterface = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// });

// userInterface.prompt()
// userInterface.on("line", async input => {
//     const response = await openai.createChatCompletion({
//         model: "gpt-3.5-turbo",
//         messages: [{"role": "user", "content": input}]
//     });

//     console.log(response.data.choices[0].message.content)
//     userInterface.prompt()
// })