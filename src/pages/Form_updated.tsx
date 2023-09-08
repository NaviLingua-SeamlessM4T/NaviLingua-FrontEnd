import React, { useState } from "react";
import "../styles/Form.css";
// import TranslationForm_updated from "../components/Form/TranslationForm_updated";
import TranslationForm from "../components/Form/TranslationForm";
import AudioPlayer_updated from "./../components/Form/AudioPlayer_updated";
import Header from "../components/Header & Footer/Header";
import Footer from "../components/Header & Footer/Footer";

const Form: React.FC = () => {
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [translatedText, setTranslatedText] = useState<string | null>(null); // New State

  const handleAudioGenerated = (
    generatedAudioUrl: string,
    generatedText: string
  ) => {
    // Updated
    setAudioUrl(generatedAudioUrl);
    setTranslatedText(generatedText); // New
  };

  return (
    <>
      <Header />
      <div className="flex-box flex-col bg-yellow-600 w-full">
        <div className="p-6 w-full">
          <TranslationForm onAudioGenerated={handleAudioGenerated} />
        </div>
        <div className="p-6 w-full">
          {audioUrl && <AudioPlayer_updated audioUrl={audioUrl} />}
         {/* <AudioPlayer_updated audioUrl={audioUrl!} /> */}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Form;
