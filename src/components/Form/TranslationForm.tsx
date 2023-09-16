import axios from "axios";
import React, { FormEvent, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { ScaleLoader } from "react-spinners";

// const endpoint: string = import.meta.env.VITE_ENDPOINT;
// console.log(endpoint)
// if (!endpoint) {
//   throw new Error("Endpoint missing");
// }

interface TranslationFormProps {
  onAudioGenerated: (url: string, urlx: string) => void;
  // onAudioGenerated: (url: string) => void;
}

const TranslationForm: React.FC<TranslationFormProps> = ({
  onAudioGenerated,
}) => {
  // const fetchAudio = async () => {
  //   const response = await fetch("hello.wav");
  //   return await response.blob();
  // };

  const convertBlobToFile = (blob: Blob): File => {
    const fileOptions: FilePropertyBag = {
      lastModified: Date.now(),
      type: blob.type,
    };
    const convertedFile = new File([blob], name, fileOptions);
    return convertedFile;
  };
  // Get the example audio Blob
  // Fetch the audio Blob using the Promise<Response>
  const fetchAudio = async () => {
    fetch("./hello.wav")
      .then((response) => response.blob())
      .then((audioBlob) => {
        // Convert the Blob to a File object and set the state
        const convertedAudioFile = convertBlobToFile(audioBlob);
        setAudio(convertedAudioFile);
        setMic(convertedAudioFile);
      })
      .catch((error) => {
        console.error("Error fetching audio:", error);
      });
  };

  const [file, setFile] = useState<File | null>(null);
  const [task, setTask] = useState<string>(
    // "S2ST (Speech to Speech translation)"
    "S2ST"
  );
  const [src, setSrc] = useState<string>("file");
  const [mic, setMic] = useState<File | null>(null);
  const [audio, setAudio] = useState<File | null>(null);
  const [text, setText] = useState<string>("Howdy!");
  const [lgg, setLgg] = useState<string>("en");
  // const [tgt, setTgt] = useState<string>("es");
  const [tgt, setTgt] = useState<string>("Afrikaans");

  const [isLoading, setIsLoading] = useState<boolean>(false);

  function fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        // The result contains the text "data:audio/wav;base64," followed by the Base64-encoded data.
        // Split off the prefix to get just the Base64 data.
        const base64String = reader.result?.toString().split(",")[1];

        resolve(base64String || "");
      };
      reader.onerror = (error) => {
        reject(error);
      };
    });
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    // fetchAudio();

    if (!file) {
      // console.error("No file selected");
      toast.error("No file selected");
      return;
    }

    try {
      console.log("Starting Generating Translation...");
      setIsLoading(true);

      const audioBase = await fileToBase64(file);
      const micBase = await fileToBase64(file);
      // const audioBase = await fileToBase64(audio);
      // const data = {
      //   task,
      //   src,
      //   // mic,
      //   micBase,
      //   // audio,
      //   audioBase,
      //   text,
      //   tgt,
      //   sourceLanguage: "en",
      //   targetLanguage: "es",
      // };
      const data = {
        data: {
          task_name: task,
          audio_source: src,
          // input_audio_mic: mic,
          input_audio_mic: micBase,
          // input_audio_file: audio,
          input_audio_file: audioBase,
          input_text: text,
          source_language: lgg,
          target_language: tgt,
        },
      };

      // const response = await axios.post('https://be79-2600-4041-1f2-1500-c5d0-7-7395-63aa.ngrok-free.app/generate', data, {
      // const response = await axios.post(endpoint, data, {
      // const response = await axios.post(
      const response = await axios.post(
        "https://facebook-seamless-m4t.hf.space/run/predict",
        data,
        {
          headers: {
            // "Content-Type": "application/json",
            "Content-Type": "audio/wav",
          },
          responseType: "arraybuffer",
        }
      );

      const blob = new Blob([response.data.translatedAudio], {
        // const blob = new Blob([response.data], {
        type: "audio/wav",
      });

      const blobx = new Blob([response.data.translatedText], {
        type: "text",
      });

      const url = window.URL.createObjectURL(blob);
      const urlx = window.URL.createObjectURL(blobx);

      onAudioGenerated(url, urlx);
      // onAudioGenerated(url);

      setIsLoading(false);
      toast.success("Generation is Done");
    } catch (error) {
      setIsLoading(false);
      console.error("Error generating audio:", error);
      toast.error("Oups! Something went wrong.");
    }
  };
  return (
    <div className="flex-box flex-col h-screen bg-yellow-600 p-6 my-10">
      <div className="p-6 rounded shadow-lg bg-slate-300">
        <h1 className="text-2xl font-bold mb-4">
          Generate Translated Speech & Text
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Upload Audio
            </label>
            <input
              type="file"
              accept="audio/*"
              onChange={(e) =>
                setFile(e.target.files ? e.target.files[0] : null)
              }
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Language
            </label>
            <input
              type="text"
              placeholder="Language"
              value={lgg}
              onChange={(e) => setLgg(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>

          {/* <div>
            <p className="pt-10 block text-sm font-medium text-red-700">This form is just AudioGen for now based on AudioCraft model</p>

          </div> */}
          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:border-blue-700 focus:ring focus:ring-blue-200"
            >
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

      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default TranslationForm;
