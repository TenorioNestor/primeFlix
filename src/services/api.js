import axios from 'axios';

//BASE DA API:https://api.themoviedb.org/3
//URL API: /movie/now_playing?api_key=9366380882b42a35fb1084fb18b44e27

const api =axios.create({
    baseURL:'https://api.themoviedb.org/3'
});

export default api;
