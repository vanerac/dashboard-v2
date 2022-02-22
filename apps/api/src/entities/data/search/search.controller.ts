import { NextFunction, Request, Response } from 'express';
import {
    DeezerSearchService,
    GoogleSearchService,
    SearchService,
    SpotifySearchService,
} from '../search/search.service';
import { Providers } from '../../../tools/types';

const servicesList: {
    [provider: string]: SearchService;
} = {
    [Providers.SPOTIFY]: SpotifySearchService,
    [Providers.DEEZER]: DeezerSearchService,
    [Providers.GOOGLE]: GoogleSearchService,
};
export default class SearchController {
    // Service search
    static async serviceSearch(req: Request, res: Response, next: NextFunction) {
        try {
            if (!req.session.service) {
                return res.status(400).json({
                    error: 'No service selected',
                });
            }
            const { provider, accessToken } = req.session.service;
            const serviceInstance: SearchService = servicesList[provider];
            if (!serviceInstance) {
                return res.status(400).json({
                    error: 'Service not found',
                });
            }
            // @ts-ignore todo: fix this
            const fn = serviceInstance.search;
            const searchResults = await fn(accessToken, req.query.q);
            return res.json(searchResults);
        } catch (error) {
            next(error);
        }
    }

    // // Global search
    // static async globalSearch(req: Request, res: Response) {
    //     // Search through all the users services
    //     //
    // }
}
