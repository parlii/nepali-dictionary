import React, { useState } from "react";

import { TextToSpeechClient } from "@google-cloud/text-to-speech";
import { v1 } from "@google-cloud/text-to-speech";

const TextToSpeechComponent: React.FC = () => {
  const [text, setText] = useState<string>("");

  const synthesizeSpeech = async () => {
    const client = new TextToSpeechClient();
    const request: v1.ISynthesizeSpeechRequest = {
      input: { text: text },
      voice: { languageCode: "en-US", ssmlGender: "NEUTRAL" },
      audioConfig: { audioEncoding: "MP3" },
    };

    try {
      const [response] = await client.synthesizeSpeech(request);
      const audioBlob = new Blob([response.audioContent as BlobPart], {
        type: "audio/mp3",
      });
      const audioURL = URL.createObjectURL(audioBlob);
      return audioURL;
    } catch (error) {
      console.error("Error synthesizing speech:", error);
    }
  };

  const playAudio = async () => {
    const audioURL = await synthesizeSpeech();
    if (audioURL) {
      const audioElement = new Audio(audioURL);
      audioElement.play();
    }
  };

  return (
    <div>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={playAudio}>Synthesize and Play</button>
    </div>
  );
};

export default TextToSpeechComponent;
