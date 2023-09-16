import { client } from "@gradio/client";

const response_0 = await fetch("https://github.com/gradio-app/gradio/raw/main/test/test_files/audio_sample.wav");
const exampleAudio = await response_0.blob();
                        
const response_1 = await fetch("https://github.com/gradio-app/gradio/raw/main/test/test_files/audio_sample.wav");
const examplAudio = await response_1.blob();
                        
const app = await client("https://facebook-seamless-m4t.hf.space/");
const result = await app.predict("/run", [        
                "S2ST (Speech to Speech translation)", // string (Option from: ['S2ST (Speech to Speech translation)', 'S2TT (Speech to Text translation)', 'T2ST (Text to Speech translation)', 'T2TT (Text to Text translation)', 'ASR (Automatic Speech Recognition)']) in 'Task' Dropdown component        
                "file", // string  in 'Audio source' Radio component
                exampleAudio,     // blob in 'Input speech' Audio component
                examplAudio,     // blob in 'Input speech' Audio component        
                "Howdy!", // string  in 'Input text' Textbox component        
                "Afrikaans", // string (Option from: ['Afrikaans', 'Amharic', [[CLIPED]] 'Urdu', 'Vietnamese', 'Welsh', 'West Central Oromo', 'Western Persian', 'Yoruba', 'Zulu']) in 'Source language' Dropdown component        
                "Bengali", // string (Option from: ['Bengali', 'Catalan', 'Czech', 'Danish', 'Dutch', 'English', 'Estonian', 'Finnish', 'French', 'German', 'Hindi', 'Indonesian', 'Italian', 'Japanese', 'Korean', 'Maltese', 'Mandarin Chinese', 'Modern Standard Arabic', 'Northern Uzbek', 'Polish', 'Portuguese', 'Romanian', 'Russian', 'Slovak', 'Spanish', 'Swahili', 'Swedish', 'Tagalog', 'Telugu', 'Thai', 'Turkish', 'Ukrainian', 'Urdu', 'Vietnamese', 'Welsh', 'Western Persian']) in 'Target language' Dropdown component
    ]);

console.log(result.data);