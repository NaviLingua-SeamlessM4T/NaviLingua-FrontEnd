import { createServer } from 'vite';
import { parse } from 'url';
import { streamingMiddleware } from 'vite';
import axios from 'axios';

const dev = process.env.NODE_ENV !== 'production';
const app = createServer({});

app.use(streamingMiddleware);

app.config.server.hmr.options = {
    protocol: 'wss',
    hostname: 'localhost',
    port: 3000,
};
app.config.server.force: true;

app.listen(3000, (err) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');
});

// Axios POST request to match the new API
app.useAsync(async (req, res, next) => {
    const parsedUrl = parse(req.url, true);
    const { pathname, query } = parsedUrl;

    if (pathname === '/api/generateAudio') {
        console.log("Received request");

        try {
            // Decoding Base64 to blob for 'inputSpeech'
            const audioBlob1 = Buffer.from(req.body.audioBase64, 'base64');
            const audioBlob2 = Buffer.from(req.body.audioBase64, 'base64'); // Could be different

            // New API endpoint
            const newApiUrl = 'https://facebook-seamless-m4t.hf.space/run';

            // Mapped and new API parameters
            const newApiParameters = {
                "task": "S2ST (Speech to Speech translation)",
                "audioSource": "file",
                "inputSpeech1": audioBlob1,
                "inputSpeech2": audioBlob2,
                "inputText": "Hello World!",
                "sourceLanguage": "English",
                "targetLanguage": "French"
            };

            // Axios POST request to the new API
            const backendResponse = await axios.post(
                newApiUrl,
                newApiParameters,
                {
                    responseType: 'json',
                }
            );

            console.log("Received response from Flask backend");

            // Handle the expected output structure
            const translatedAudio = backendResponse.data[0]; // Object representing 'Translated speech'
            const translatedText = backendResponse.data[1]; // String representing 'Translated text'

            // Prepare the response to the frontend
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify({ translatedAudio, translatedText }));
        } catch (error) {
            console.error('Error:', error);
            res.status(500).send('Internal Server Error');
        }
    } else {
        next();
    }
});

app.use((req, res, next) => {
    const parsedUrl = parse(req.url, true);
    const { pathname } = parsedUrl;
  
    if (pathname === "/") {
      app.render(req, res, "/", {});
    } else {
      next();
    }
});
