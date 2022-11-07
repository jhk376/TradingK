import axios from 'axios'

const TOKEN = "cdjmpkiad3ictn8k5b5gcdjmpkiad3ictn8k5b60"

export default axios.create({
    baseURL: "https://finnhub.io/api/v1" ,
    params:{
        token:TOKEN
    }
})