import axios from 'axios';

export interface Track {
    id: string;
    name: string;
    artist: string;
    album: string;
    duration: number;
    image: string;
    provider: string;
}

export interface Playlist {
    id: string;
    name: string;
    description: string;
    image: string;
    tracks: Track[];
    provider: string;
}

export abstract class PlaylistService {
    static async getPlaylist($token: string, $id: string): Promise<Playlist | unknown> {
        throw new Error('Method not implemented.');
    }
    static async getPlaylists($token: string): Promise<Playlist[] | unknown> {
        throw new Error('Method not implemented.');
    }
    static async createPlaylist($token: string, $playlist: Playlist): Promise<Playlist | unknown> {
        throw new Error('Method not implemented.');
    }
    static async updatePlaylist($token: string, $playlist: Playlist): Promise<Playlist | unknown> {
        throw new Error('Method not implemented.');
    }
    static async deletePlaylist($token: string, $id: string): Promise<void | unknown> {
        throw new Error('Method not implemented.');
    }
    static async getPlaylistTracks($token: string, $id: string): Promise<Track[] | unknown> {
        throw new Error('Method not implemented.');
    }

    // unsave playlist to favorites
    static async unsavePlaylist($token: string, $id: string): Promise<void | unknown> {
        throw new Error('Method not implemented.');
    }

    // Save playlist to favorites
    static async savePlaylist($token: string, $id: string): Promise<void | unknown> {
        throw new Error('Method not implemented.');
    }
}

export class SpotifyPlaylistService extends PlaylistService {
    // Make queries to Spotify API
    // Todo: map this to type
    static override async getPlaylist(token: string, id: string): Promise<Playlist | unknown> {
        const response = await axios.get(`https://api.spotify.com/v1/playlists/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return {
            id: response.data.id,
            name: response.data.name,
            description: response.data.description,
            image: response.data.images[0].url,
            tracks: [],
            provider: 'spotify',
        };
    }
    // Todo: map this to type
    static override async getPlaylists(token: string): Promise<Playlist[] | undefined> {
        try {
            console.log('Getting playlists', token);
            const response = await axios.get(`https://api.spotify.com/v1/me/playlists`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            return Promise.all(
                response.data.items.map(async (item: any) => {
                    return {
                        id: item.id,
                        name: item.name,
                        description: item.description,
                        image: item.images[0].url,
                        tracks: [],
                        provider: 'spotify',
                    };
                }),
            );
        } catch (error: any) {
            console.log(error.response.data);
        }
    }
    // Todo: map this to type
    static override async createPlaylist(token: string, playlist: Playlist): Promise<Playlist | unknown> {
        const response = await axios.post(
            `https://api.spotify.com/v1/users/${playlist.provider}/playlists`,
            {
                name: playlist.name,
                description: playlist.description,
                public: true,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );
        return response.data;
    }
    // Todo: map this to type
    static override async updatePlaylist(token: string, playlist: Playlist): Promise<Playlist | unknown> {
        const response = await axios.put(
            `https://api.spotify.com/v1/playlists/${playlist.id}`,
            {
                name: playlist.name,
                description: playlist.description,
                public: true,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );
        return response.data;
    }
    // Todo: map this to type
    static override async deletePlaylist(token: string, id: string): Promise<void | unknown> {
        await axios.delete(`https://api.spotify.com/v1/playlists/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return;
    }
    // Todo: map this to type
    static override async getPlaylistTracks(token: string, id: string): Promise<Track[] | unknown> {
        const response = await axios.get(`https://api.spotify.com/v1/playlists/${id}/tracks`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data.items
            .filter(({ track: v }: any) => !!v)
            .map(({ track: item }: any) => {
                // console.log(item);

                return {
                    id: item.id,
                    name: item.name,
                    artist: item.artists[0].name,
                    album: item.album.name,
                    duration: item.duration_ms,
                    image: item.album.images[0].url,
                    provider: 'spotify',
                };
            });
    }

    // unsave playlist to favorites
    static override async unsavePlaylist(token: string, id: string): Promise<void | unknown> {
        await axios.delete(`https://api.spotify.com/v1/playlists/${id}/followers`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return;
    }

    // Save playlist to favorites
    static override async savePlaylist(token: string, id: string): Promise<void | unknown> {
        await axios.put(
            `https://api.spotify.com/v1/playlists/${id}/followers`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );
        return;
    }
}

export class DeezerPlaylistService extends PlaylistService {
    // Make queries to Deezer API
    // Todo: map this to type
    static override async getPlaylist(token: string, id: string): Promise<Playlist | unknown> {
        const response = await axios.get(`https://api.deezer.com/playlist/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    }
    // Todo: map this to type
    static override async getPlaylists(token: string): Promise<Playlist[] | unknown> {
        const response = await axios.get(`https://api.deezer.com/user/me/playlists`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data.data;
    }
    // Todo: map this to type
    static override async createPlaylist(token: string, playlist: Playlist): Promise<Playlist | unknown> {
        const response = await axios.post(
            `https://api.deezer.com/user/me/playlists`,
            {
                title: playlist.name,
                description: playlist.description,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );
        return response.data;
    }

    static override async updatePlaylist(token: string, playlist: Playlist): Promise<Playlist | unknown> {
        const response = await axios.put(
            `https://api.deezer.com/playlist/${playlist.id}`,
            {
                title: playlist.name,
                description: playlist.description,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );
        return response.data;
    }

    // Todo: map this to type
    static override async deletePlaylist(token: string, id: string): Promise<void | unknown> {
        await axios.delete(`https://api.deezer.com/playlist/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return;
    }
    static override async getPlaylistTracks(token: string, id: string): Promise<Track[] | unknown> {
        const response = await axios.get(`https://api.deezer.com/playlist/${id}/tracks`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data.data;
    }

    // unsave playlist to favorites
    static override async unsavePlaylist(token: string, id: string): Promise<void | unknown> {
        await axios.delete(`https://api.deezer.com/user/me/playlists/${id}/followers`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return;
    }

    // Save playlist to favorites
    static override async savePlaylist(token: string, id: string): Promise<void | unknown> {
        await axios.put(
            `https://api.deezer.com/user/me/playlists/${id}/followers`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );
        return;
    }
}

// Youtube
export class GooglePlaylistService extends PlaylistService {
    // Make queries to Youtube API
    static override async getPlaylist(token: string, id: string): Promise<Playlist | unknown> {
        const response = await axios.get(`https://www.googleapis.com/youtube/v3/playlists?id=${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data.items[0];
    }
    static override async getPlaylists(token: string): Promise<Playlist[] | unknown> {
        const response = await axios.get(`https://www.googleapis.com/youtube/v3/playlists?mine=true`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data.items;
    }
    static override async createPlaylist(token: string, playlist: Playlist): Promise<Playlist | unknown> {
        const response = await axios.post(
            `https://www.googleapis.com/youtube/v3/playlists`,
            {
                snippet: {
                    title: playlist.name,
                    description: playlist.description,
                },
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );
        return response.data;
    }

    static override async updatePlaylist(token: string, playlist: Playlist): Promise<Playlist | unknown> {
        const response = await axios.put(
            `https://www.googleapis.com/youtube/v3/playlists`,
            {
                id: playlist.id,
                snippet: {
                    title: playlist.name,
                    description: playlist.description,
                },
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );
        return response.data;
    }

    static override async deletePlaylist(token: string, id: string): Promise<void | unknown> {
        await axios.delete(`https://www.googleapis.com/youtube/v3/playlists?id=${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return;
    }

    static override async getPlaylistTracks(token: string, id: string): Promise<Track[] | unknown> {
        const response = await axios.get(`https://www.googleapis.com/youtube/v3/playlistItems?playlistId=${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data.items.map((item: any) => {
            return {
                id: item.snippet.resourceId.videoId,
                name: item.snippet.title,
                artist: item.snippet.channelTitle,
                album: item.snippet.channelTitle,
                duration: item.contentDetails.duration,
                image: item.snippet.thumbnails.default.url,
            };
        });
    }

    // save playlist to favorites
    static override async savePlaylist(token: string, id: string): Promise<void | unknown> {
        await axios.post(
            `https://www.googleapis.com/youtube/v3/playlists?id=${id}`,
            {
                snippet: {
                    title: 'Favorites',
                    description: 'Favorites',
                },
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );
        return;
    }

    // unsave playliust from favorites
    static override async unsavePlaylist(token: string, id: string): Promise<void | unknown> {
        await axios.delete(`https://www.googleapis.com/youtube/v3/playlists?id=${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return;
    }
}
