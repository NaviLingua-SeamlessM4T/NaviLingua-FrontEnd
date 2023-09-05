import axios from 'axios';
import React, { FormEvent, useState } from 'react';
import { Toaster, toast } from "react-hot-toast";
import { ScaleLoader } from 'react-spinners';


const endpoint: string = import.meta.env.VITE_ENDPOINT;
// console.log(endpoint)
if (!endpoint) {
  throw new Error("Endpoint missing");
}

interface TranslationFormProps {
  onAudioGenerated: (url: string) => void;
}


const TranslationForm: React.FC<TranslationFormProps> = ({ onAudioGenerated }) => {
  const [file, setFile] = useState<File | null>(null);
  const [bpm, setBpm] = useState<string>("75");
  const [duration, setDuration] = useState<string>("5");
  const [iterations, setIterations] = useState<string>("2");
  const [outputDurationRange, setOutputDurationRange] = useState<string>("10-15");

  const [isLoading, setIsLoading] = useState<boolean>(false);

  function fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        // The result contains the text "data:audio/wav;base64," followed by the Base64-encoded data.
        // Split off the prefix to get just the Base64 data.
        const base64String = reader.result?.toString().split(',')[1];

        resolve(base64String || "");
      };
      reader.onerror = (error) => {
        reject(error);
      };
    });
  }


  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!file) {
      console.error('No file selected');
      toast.error(
        "No file selected"
      );
      return;
    }

    try {
      console.log("Starting Generating Music...");
      setIsLoading(true);

      const audioBase64 = await fileToBase64(file);
      const data = {
        audioBase64,
        bpm,
        duration,
        iterations,
        outputDurationRange
      };


      // const response = await axios.post('https://be79-2600-4041-1f2-1500-c5d0-7-7395-63aa.ngrok-free.app/generate', data, {
      const response = await axios.post(endpoint, data, {
        headers: {
          'Content-Type': 'application/json',
        },
        responseType: 'arraybuffer',
      });

      const blob = new Blob([response.data], { type: 'audio/wav' });
      const url = window.URL.createObjectURL(blob);
      onAudioGenerated(url);

      setIsLoading(false);
      toast.success("Generation is Done");

    } catch (error) {
      setIsLoading(false);
      console.error('Error generating audio:', error);
      toast.error("Oups! Something went wrong.");
    }
  }
  return (
    <div className="flex-box flex-col h-screen bg-yellow-600 p-6 my-10">
      <div className="p-6 rounded shadow-lg bg-slate-300">
        <h1 className="text-2xl font-bold mb-4">Generate Translated Speech & Text</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">Upload Audio</label>
            <input type="file" accept="audio/*" onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)} className="mt-1 p-2 w-full border rounded-md" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">BPM</label>
            <input type="text" placeholder="BPM" value={bpm} onChange={(e) => setBpm(e.target.value)} className="mt-1 p-2 w-full border rounded-md" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">Prompt Duration</label>
            <input type="text" placeholder="Prompt Duration" value={duration} onChange={(e) => setDuration(e.target.value)} className="mt-1 p-2 w-full border rounded-md" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">Iterations</label>
            <input type="text" placeholder="Iterations" value={iterations} onChange={(e) => setIterations(e.target.value)} className="mt-1 p-2 w-full border rounded-md" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">Output Duration Range</label>
            <input type="text" placeholder="Output Duration Range" value={outputDurationRange} onChange={(e) => setOutputDurationRange(e.target.value)} className="mt-1 p-2 w-full border rounded-md" />
          </div>
          <div>
            <p className="pt-10 block text-sm font-medium text-red-700">This form is just MusicGen for now based on AudioCraft model</p>

          </div>
          <div>
            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:border-blue-700 focus:ring focus:ring-blue-200">
              Generate
            </button>
          </div>
        </form>

      </div>
      {isLoading ? (
        <div className="p-8 w-full h-screen flex-box bg-primary-background">
          <div className="flex flex-col items-center">
            <div>
              <ScaleLoader color="#36d7b7" />
            </div>
            <div>
              <p className="text-md font-medium text-slate-100 pt-8">
                NaviLingua is generating...
              </p>
            </div>
          </div>
        </div>
      ) : null}

      <Toaster
        position="top-center"
        reverseOrder={false}
      />
    </div>
  );
};

export default TranslationForm;
