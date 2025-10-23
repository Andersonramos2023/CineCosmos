
import axios from 'axios'

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  headers: {
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxY2RjNWUwYzU1YTNjMDJkMDQ2YmNkMTJlYWI3YTM0OSIsIm5iZiI6MTc1OTUxMjk5MC4yNiwic3ViIjoiNjhlMDA5OWVmZjlkOTllNGNlMTg5MTM4Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.LJTzN7Qih5GOupppGmYJyady3AnjQP42wcIA3XdL2pc'
  },
});

export default api;
