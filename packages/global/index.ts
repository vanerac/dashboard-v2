import {ApiClient, OpenAPIConfig} from "../services";

export let Client = new ApiClient();


export const updateClientConfig = (config?: Partial<OpenAPIConfig>) => {
    Client = new ApiClient(config);
}

Object.freeze(Client);
