import axios from "axios";
const charURL = process.env.NEXT_PUBLIC_DATA_API;

const fetchChars = async (page: number) => {
  const apiURL = `${charURL}/people?page=${page}`;

  try {
    const result = await axios.get(apiURL);
    return result;
  } catch (error) {
    throw new Error("Error fetching characters: " + error);
  }
};

const fetchHomeWorldInfo = async (apiURL: string) => {
  try {
    const result = await axios.get(apiURL);
    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching details: " + error);
  }
};

export { fetchChars, fetchHomeWorldInfo };
