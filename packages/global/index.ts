import {ApiClient, OpenAPIConfig} from "../services";

/*
* @deprecated
* */
export let Client = new ApiClient();

/*
* @deprecated
* */
export const updateClientConfig = (config?: Partial<OpenAPIConfig>) => {
  Client = new ApiClient(config);
};

Object.freeze(Client);
