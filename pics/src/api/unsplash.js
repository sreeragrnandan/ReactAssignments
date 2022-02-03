import axios from "axios";
export default axios.create({
  baseURL: "https://api.unsplash.com",
  headers: {
    Authorization: "Client-ID olTqFjPgZiWZtVmhnh8R3VxsGAd8o-hTnthy0nvHqls",
  },
});
