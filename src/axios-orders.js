 import axios from 'axios';


 const instance = axios.create({
     baseURL:'https://react-my-burger-517fb-default-rtdb.firebaseio.com/'
 })

 export default instance;