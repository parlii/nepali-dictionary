import { TextToSpeechClient } from "@google-cloud/text-to-speech";

const client = new TextToSpeechClient({
  keyFilename: "/Users/parlirizal/parli/nepali-dictionary/google_key.json",
});

const synthesizeSpeech = async (text: string) => {
  const request = {
    input: { text },
    voice: { languageCode: "ne-NP", ssmlGender: "NEUTRAL" },
    audioConfig: { audioEncoding: "MP3" },
  };

  const [response] = await client.synthesizeSpeech(request);
  const audioContent = response.audioContent as Buffer;
  return `data:audio/mp3;base64,${audioContent.toString("base64")}`;
};

export { synthesizeSpeech };
