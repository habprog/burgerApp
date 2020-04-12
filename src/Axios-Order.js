import axios from 'axios';

const instance = axios.create({
    baseURL:'https://my-burger-app-6c205.firebaseio.com/',
    // responseType: "json",
    // withCredentials: true,
    // transformRequest: [(data) => JSON.stringify(data.data)],
	
    // baseURL:'https://jsonplaceholder.typicode.com/'


});


// axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'

export default instance;