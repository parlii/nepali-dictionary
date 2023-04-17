import React, { useEffect, useState } from "react";
import { faSearch, faVolumeUp } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TextToSpeechComponent from "./TextToSpeech";
import { debounce } from "lodash";

const Dictionary = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [audioSrc, setAudioSrc] = useState("");
  const [loading, setLoading] = useState(false);

  const debouncedSearch = debounce(async (searchTerm: string) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/dictionary?term=${searchTerm}`);
      const data = await response.json();
      setLoading(false);

      if (data && data.translation) {
        setResult(`${searchTerm} - ${data.translation}`);
        setAudioSrc(data.audioSrc);
      } else {
        setResult("Word not found");
        setAudioSrc("");
      }
    } catch (error) {
      console.error("Error searching dictionary:", error);
      setLoading(false);
      setResult("Error searching dictionary");
      setAudioSrc("");
    }
  }, 500);

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value;
    setInput(searchTerm);
    debouncedSearch(searchTerm);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      debouncedSearch.cancel();
      const searchTerm = input.trim();
      if (searchTerm) {
        debouncedSearch(searchTerm);
      }
    }
  };

  const handlePlayAudio = () => {
    if (audioSrc) {
      TextToSpeechComponent.playAudio(audioSrc);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="flex items-center justify-center">
        <input
          type="text"
          value={input}
          onChange={handleInput}
          onKeyPress={handleKeyPress}
          className="border border-gray-300 rounded-xl px-4 py-2 w-1/2 focus:outline-none focus:ring focus:border-blue-300 pl-10"
          placeholder="Type a word and press Enter"
        />
        <div className="-ml-10">
          <FontAwesomeIcon icon={faSearch} />
        </div>
      </div>
      <div className="mt-4 flex items-center">
        <span>{loading ? "Loading..." : result}</span>
        {audioSrc && (
          <button onClick={handlePlayAudio} className="ml-2">
            <FontAwesomeIcon icon={faVolumeUp} />
          </button>
        )}
      </div>
    </div>
  );
};

export default Dictionary;
