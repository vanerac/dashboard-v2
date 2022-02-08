import { Request, Response } from 'express';
import { SearchService, SpotifySearchService } from '../search/search.service';
import { Providers } from '../../../tools/types';

const servicesList: {
    [provider: string]: SearchService;
} = {
    [Providers.SPOTIFY]: SpotifySearchService,
};
export default class SearchController {
    // Service search
    static async serviceSearch(req: Request, res: Response) {
        if (!req.session.local.service) {
            return res.status(400).json({
                error: 'No service selected',
            });
        }
        const { service } = req.session.local.service;
        const serviceInstance: SearchService = servicesList[service];
        if (!serviceInstance) {
            return res.status(400).json({
                error: 'Service not found',
            });
        }
        // @ts-ignore todo: fix this
        const fn = serviceInstance.search;
        const searchResults = await fn(req.session.local.service.accessToken, req.query.q);
        return res.json(searchResults);
    }

    // // Global search
    // static async globalSearch(req: Request, res: Response) {
    //     // Search through all the users services
    //     //
    // }
}
