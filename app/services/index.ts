import axios from "axios";
const charURL = process.env.NEXT_PUBLIC_DATA_API;

const fetchChars = async (page: number) => {
  const apiURL = `${charURL}/people?page=${page}`;

  try {
    const result: any = await axios.get(apiURL);

    return result;
  } catch (error) {
    return error;
  }
};

const fetchHomeWorldInfo = async (apiURL: string) => {
  try {
    const result: any = await axios.get(apiURL);
    return result;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export { fetchChars, fetchHomeWorldInfo };
