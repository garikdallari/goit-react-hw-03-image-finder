import axios from "axios";

const KEY = "22496813-a3fbe39786787c712b168fbe4";
axios.defaults.baseURL = "https://pixabay.com/api/";

export const fetchGallery = async (value, page) => {
  const { data } = await axios.get(
    `?q=${value}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
  return data.hits;
};
