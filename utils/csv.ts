import Papa from "papaparse";

const parseCsv = async (url: string) => {
  const response = await fetch(url);
  const csvText = await response.text();

  return new Promise<string[][]>((resolve, reject) => {
    Papa.parse(csvText, {
      complete: (results) => {
        resolve(results.data as string[][]);
      },
      error: (err) => {
        reject(err);
      },
    });
  });
};

export { parseCsv };
