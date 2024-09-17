import axios from "axios";
import { ENV_VARS } from "../../config/envVars.js";


// popüler filmler için bu kısım kullanılır 
export const fetchFromTMDB = async (url) => {   //parametre bir url olur
  const options = {         //option seçeneği bilgiler
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: "Bearer " + ENV_VARS.TMDB_API_KEY,
    },
  };
  const response = await axios.get(url, options);   //axios ile get metodunda url ile content verilir

  if (response.status !== 200) {
    throw new Error("Failed to fetch  data from TMDB" + response.statusText);
  }

  return response.data;
};
