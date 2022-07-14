
import ApiClient from './api';
import { clone } from './libs/clone';

import {pageDefaults} from './pageDefaults';
import User from './user';
export default class Analytics {
    httpClient: ApiClient;
    user: User;
    constructor({host, token}: {host: string, token: string}) {
        this.httpClient = new ApiClient(host, token);
        this.user = new User();

    }
    track(eventName: string, properties?: any): void {

    }
    identify(userId: string, props?: any): void {
        this.user.identify({
            uid: userId,
            email: props?.email,
            properties: props?.properties,
        })
    }

    page(properties?: any): void {
        properties = clone(properties) || {};
        const props = {
            type: 'page_view',
            name: document.title,
            content: {
                value: 1,
            },
            host: pageDefaults(),
            user: this.user.toJSON(),
            properties,
        }
        this.httpClient.post('/metrics', props)
    }

    logout(): void {
        this.user.clearStorage();
    }
}