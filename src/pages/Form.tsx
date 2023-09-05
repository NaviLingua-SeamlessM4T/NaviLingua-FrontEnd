import React, { useState } from 'react';

import '../styles/Form.css'
import Header from '../components/Header & Footer/Header';
import Footer from '../components/Header & Footer/Footer';
import TranslationForm from '../components/Form/TranslationForm';
import AudioPlayer from './../components/Form/AudioPlayer';


const Form: React.FC = () => {
    const [audioUrl, setAudioUrl] = useState<string | null>(null);

    const handleAudioGenerated = (generatedAudioUrl: string) => {
        setAudioUrl(generatedAudioUrl);
    };

    return (
        <>
        <Header/>
        <div className="flex-box flex-col bg-yellow-600 w-full">
            <div className="p-6 w-full">
                <TranslationForm onAudioGenerated={handleAudioGenerated} />
            </div>
            <div className="p-6 w-full">
                {audioUrl && <AudioPlayer audioUrl={audioUrl} />}

            </div>
        </div>
        <Footer/>
        </>

    );
};

export default Form;