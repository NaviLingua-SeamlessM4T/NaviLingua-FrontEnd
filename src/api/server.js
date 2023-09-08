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

// Refactored Axios POST request to match the new API
app.useAsync(async (req, res, next) => {
    const parsedUrl = parse(req.url, true);
    const { pathname, query } = parsedUrl;

    if (pathname === '/api/generateAudio') {
        console.log("Received request");

        try {
            // Decoding Base64 to blob for 'inputSpeech'
            const audioBlob = Buffer.from(req.body.audioBase64, 'base64');
            
            // New API endpoint
            const newApiUrl = 'https://facebook-seamless-m4t.hf.space/run';

            // Mapped and new API parameters
            const newApiParameters = {
                "task": "S2ST (Speech to Speech translation)", // New parameter
                "audioSource": "file", // Mapped from req.body.audioBase64
                "inputSpeech": audioBlob, // Mapped from req.body.audioBase64
                "inputText": "Howdy!", // New parameter
                "sourceLanguage": "Afrikaans", // New parameter
                "targetLanguage": "Bengali" // New parameter
            };

            // Axios POST request to the new API
            const backendResponse = await axios.post(
                newApiUrl,
                newApiParameters,
                {
                    responseType: 'arraybuffer',
                }
            );

            console.log("Received response from Flask backend");
            res.setHeader('Content-Type', 'audio/wav');
            res.send(backendResponse.data);
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
