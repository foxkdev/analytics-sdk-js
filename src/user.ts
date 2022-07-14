import { v4 as uuidv4 } from 'uuid';

export default class User {
    anonymousId: string;
    uid: string;
    sessionStart: Date;
    email: string;
    properties: object;
    constructor() {
        this.anonymousId = uuidv4();
        this.uid = null;
        this.sessionStart = new Date();
        this.email = null;
        this.properties = null;
        this.getFromSessionStorage();
    }


    identify({uid, email, properties}: {uid: string, email: string, properties: object}){
        this.uid = uid;
        this.email = email || null;
        this.properties = properties || null;
        this.setSessionStorage();
    }
    getFromSessionStorage(){
        const user = JSON.parse(localStorage.getItem('x-analytics-user'));
        if(user){
            this.anonymousId = user.anonymousId;
            this.uid = user.uId;
            this.sessionStart = user.sessionStart;
            this.email = user.email;
            this.properties = user.properties;
        } else {
            this.setSessionStorage();
        }
    }
    setSessionStorage() {
        localStorage.setItem('x-analytics-user', JSON.stringify(this.toJSON()));
    }
    clearStorage(){
        localStorage.removeItem('x-analytics-user');
        this.uid = null;
        this.email = null;
        this.properties = null;
    }
    toJSON(){
        return {
            anonymousId: this.anonymousId,
            uId: this.uid,
            sessionStart: this.sessionStart,
            email: this.email,
            properties: this.properties,
        }
    }
}