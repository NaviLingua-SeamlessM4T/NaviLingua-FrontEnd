
// ... existing imports
import axios from 'axios';

// ... existing code

const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
        const response = await axios.post(
            '/api/generateAudio',
            {
                // ... existing parameters
                // ... new parameters, e.g., task, inputText, sourceLanguage, targetLanguage
            }
        );

        // New: handle both audio and text
        onAudioGenerated(response.data.translatedAudio, response.data.translatedText);
    } catch (error) {
        // ... error handling
    }
};

// ... existing code
