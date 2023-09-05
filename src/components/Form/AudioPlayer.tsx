import React from 'react';

interface AudioPlayerProps {
    audioUrl: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioUrl }) => {
    return (
        <div className="audio-player">
            <audio controls src={audioUrl}></audio>
            <a href={audioUrl} download="generated_audio.wav" className='border rounded-lg text-slate-200 bg-blue-500 p-2 text-lg border-slate-300'>Download</a>
        </div>
    );
};

export default AudioPlayer;