import axios from '../../src/index';
import { AxiosError } from '../helpers/error';

axios({
    method: 'get',
    url: '/error/get'
}).then(res => {
    console.log(res)
}).catch((e: AxiosError) => {
    console.log(e.message)
})

setTimeout(() => {
    axios({
        method: 'get',
        url: '/error/get'
    }).then(res => {
        console.log(res)
    }).catch((e: AxiosError) => {
        console.log(e.message)
    })
}, 5000);

axios({
    method: 'get',
    url: '/error/timeout',
    timeout: 2000
}).then(res => {
    console.log(res)
}).catch((e: AxiosError) => {
    console.log(e.message)
    console.log(e.code)
})
