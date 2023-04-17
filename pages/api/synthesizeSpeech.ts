import type { NextApiRequest, NextApiResponse } from "next";

import { synthesizeSpeech } from "./googleTTS";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { text } = req.query;

  if (typeof text !== "string") {
    res.status(400).json({ message: "Invalid text parameter" });
    return;
  }

  try {
    const audioSrc = await synthesizeSpeech(text);
    res.status(200).json({ audioSrc });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to synthesize speech" });
  }
};

export default handler;
