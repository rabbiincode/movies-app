import axios from 'axios';

const request = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    //api_key: 'process.env.REACT_APP_API_KEY',
    api_key: 'abb710499b8746c04d8c83045535443b'
  }
})

export default request;