import {ApiClient, OpenAPIConfig} from "../services";

const defaultConfig: Partial<OpenAPIConfig> = {
    WITH_CREDENTIALS: true,
    CREDENTIALS: "include"
}
export let Client = new ApiClient(defaultConfig);


export const updateClientConfig = (config?: Partial<OpenAPIConfig>) => {
    const newConfig = {...config, ...defaultConfig};
    Client = new ApiClient(newConfig);
}

Object.freeze(Client);
