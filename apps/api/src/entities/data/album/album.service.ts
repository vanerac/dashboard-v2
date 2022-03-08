import { Album } from '../../../../../../packages/services';
import axios from 'axios';

export default class AlbumService {
    static async getSavedAlbums($accessToken: string): Promise<Album[]> {
        throw new Error('Method not implemented.');
    }

    static async getById($accessToken: string, $id: string): Promise<Album> {
        throw new Error('Method not implemented.');
    }

    static async save($accessToken: string, $id: string) {
        throw new Error('Method not implemented.');
    }

    static async unsave($accessToken: string, $id: string) {
        throw new Error('Method not implemented.');
    }
}

export class SpotifyAlbumService extends AlbumService {
    static async getSavedAlbums(accessToken: string): Promise<Album[]> {
        const response = await axios.get(`https://api.spotify.com/v1/me/albums`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        return response.data.items.map((item: any) => {
            console.log(item);
            return {
                id: item.album.id,
                name: item.album.name,
                artist: item.album.artists[0].name,
                image: item.album.images[0].url,
                uri: item.uri,
            };
        });
    }

    static async getById(accessToken: string, id: string): Promise<Album> {
        const response = await axios.get(`https://api.spotify.com/v1/albums/${id}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        return {
            id: response.data.id,
            name: response.data.name,
            artist: response.data.artists[0].name,
            image: response.data.images[0].url,
        };
    }

    static async save(accessToken: string, id: string) {
        await axios.put(
            `https://api.spotify.com/v1/me/albums/${id}`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            },
        );
    }

    static async unsave(accessToken: string, id: string) {
        await axios.delete(`https://api.spotify.com/v1/me/albums/${id}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
    }
}

export class DeezerAlbumService extends AlbumService {
    static async getSavedAlbums(accessToken: string): Promise<Album[]> {
        const response = await axios.get(`https://api.deezer.com/user/me/albums`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        return response.data.data.map((item: any) => ({
            id: item.id,
            name: item.title,
            artist: item.artist.name,
            image: item.cover_big,
        }));
    }

    static async getById(accessToken: string, id: string): Promise<Album> {
        const response = await axios.get(`https://api.deezer.com/album/${id}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        return {
            id: response.data.id,
            name: response.data.title,
            artist: response.data.artist.name,
            image: response.data.cover_big,
        };
    }

    static async save(accessToken: string, id: string) {
        await axios.put(
            `https://api.deezer.com/user/me/albums/${id}`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            },
        );
    }

    static async unsave(accessToken: string, id: string) {
        await axios.delete(`https://api.deezer.com/user/me/albums/${id}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
    }
}
