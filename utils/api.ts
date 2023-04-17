import axios from 'axios';

const getDefinition = async (word: string) => {
  const language = /^[a-zA-Z\s]+$/.test(word) ? 'en' : 'ne';
  try {
    const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/${language}/${encodeURIComponent(word)}`);
    return response.data;
  } catch (error) {
    return null;
  }
};

export { getDefinition };

