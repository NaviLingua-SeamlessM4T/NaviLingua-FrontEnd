import { client } from "@gradio/client";

const response_0 = await fetch("https://github.com/gradio-app/gradio/raw/main/test/test_files/audio_sample.wav");
const exampleAudio = await response_0.blob();
                        
const response_1 = await fetch("https://github.com/gradio-app/gradio/raw/main/test/test_files/audio_sample.wav");
const examplAudio = await response_1.blob();
                        
const app = await client("https://facebook-seamless-m4t.hf.space/");
const result = await app.predict("/run", [        
                "S2ST (Speech to Speech translation)", 
                "file", 
                exampleAudio,     
                examplAudio,         
                "Howdy!", 
                "Afrikaans",
                "Bengali", 
    ]);

console.log(result.data);