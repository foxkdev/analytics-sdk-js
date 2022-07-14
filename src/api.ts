import axios from "axios";

export default class ApiClient {
    baseURL: string;
    token: string;
    constructor(url: string, token: string) {
        this.baseURL = url;
        this.token = token;
    }
    async get(path: string, params?: any): Promise<any> {
        return this.request('GET', path, params);
    }
    async post(path: string, body: any): Promise<any> {
        return this.request('POST', path, body);
    }
    async request(method: string, url: string, body?: any): Promise<any> {
        
        const response = await axios.request({
            url,
            method,
            data: body,
            baseURL: this.baseURL,
            headers: {
                'x-token': this.token,
                'content-type': 'application/json'
            }
        })
        return response;
    }
}