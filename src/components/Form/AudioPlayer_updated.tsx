import React, { useRef, useState } from "react";

interface AudioPlayerProps {
  audioUrl: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioUrl }) => {
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  const startRecording = () => {
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      mediaRecorderRef.current = new MediaRecorder(stream);
      // ... set up event listeners and start recording
      setIsRecording(true);
    });
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      // ... process the recorded audio
      setIsRecording(false);
    }
  };

  return (
    <div className="audio-player">
      {/* Existing audio player UI */}
      <audio src={audioUrl} controls />
      <a
        href={audioUrl}
        download="generated_audio.wav"
        className="border rounded-lg text-slate-200 bg-blue-500 p-2 text-lg border-slate-300"
      >
        Download
      </a>
      {/* New: microphone functionality */}
      {isRecording ? (
        <button onClick={stopRecording}>Stop Recording</button>
      ) : (
        <button onClick={startRecording}>Start Recording</button>
      )}
    </div>
  );
};

export default AudioPlayer;
