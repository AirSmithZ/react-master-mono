import axios from 'axios';

const inst = axios.create();

inst.interceptors.response.use((resp) => resp.data);

const COMMON_URL = `http://203.208.167.150:3010/api`;

export interface LisOpts {
    url: String;
    startNum: number;
    pageSize: number
}

export const apiGet = (opts: LisOpts) => {
    return inst<any, any>({
        method: 'get',
        url: `${COMMON_URL}/${opts.url}?pageNum=${opts.startNum}&pageSize=${opts.pageSize}`
    })
}
