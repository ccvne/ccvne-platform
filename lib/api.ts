import axios from "axios"

const api = axios.create({
  baseURL: "https://api.ap-pdf.club"
});

export default api