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

app.useAsync(async (req, res, next) => {
    const parsedUrl = parse(req.url, true);
    const { pathname, query } = parsedUrl;

    if (pathname === '/api/generateAudio') {
        console.log("Received request");

        try {
            const backendResponse = await axios.post(
                // 'http://127.0.0.1:5000/generate',
                'http://127.0.0.1:5000/generate',
                {
                    audioBase64: req.body.audioBase64,
                    bpm: req.body.bpm,
                    duration: req.body.duration,
                    iterations: req.body.iterations,
                    outputDurationRange: req.body.outputDurationRange,
                    audioBase64: req.body.audioBase64,
                    bpm: req.body.bpm,
                    duration: req.body.duration,
                    iterations: req.body.iterations,
                    outputDurationRange: req.body.outputDurationRange
                },
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