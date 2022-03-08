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
            params: {
                access_token: token,
            },
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return {
            id: response.data.id,
            name: response.data.title,
            description: response.data.description,
            image: response.data.picture_xl,
            tracks: [],
            provider: 'deezer',
        };
    }
    static override async getPlaylists(token: string): Promise<Playlist[] | unknown> {
        const response = await axios.get(`https://api.deezer.com/user/me/playlists`, {
            params: {
                access_token: token,
            },
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data.data.map((item: any) => {
            return {
                id: item.id,
                name: item.title,
                description: item.description,
                image: item.picture_xl,
                tracks: [],
                provider: 'deezer',
            };
        });
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
                params: {
                    access_token: token,
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );
        return {
            id: response.data.id,
            name: response.data.title,
            description: response.data.description,
            image: response.data.picture_xl,
            tracks: [],
            provider: 'deezer',
        };
    }

    static override async updatePlaylist(token: string, playlist: Playlist): Promise<Playlist | unknown> {
        const response = await axios.put(
            `https://api.deezer.com/playlist/${playlist.id}`,
            {
                title: playlist.name,
                description: playlist.description,
            },
            {
                params: {
                    access_token: token,
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );
        return {
            id: response.data.id,
            name: response.data.title,
            description: response.data.description,
            image: response.data.picture_xl,
            tracks: [],
            provider: 'deezer',
        };
    }

    // Todo: map this to type
    static override async deletePlaylist(token: string, id: string): Promise<void | unknown> {
        await axios.delete(`https://api.deezer.com/playlist/${id}`, {
            params: {
                access_token: token,
            },
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return;
    }
    static override async getPlaylistTracks(token: string, id: string): Promise<Track[] | unknown> {
        const response = await axios.get(`https://api.deezer.com/playlist/${id}/tracks`, {
            params: {
                access_token: token,
            },
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data.data.map((item: any) => {
            return {
                id: item.id,
                name: item.title,
                artist: item.artist.name,
                album: item.album.title,
                duration: item.duration,
                provider: 'deezer',
            };
        });
    }

    // unsave playlist to favorites
    static override async unsavePlaylist(token: string, id: string): Promise<void | unknown> {
        await axios.delete(`https://api.deezer.com/user/me/playlists/${id}/followers`, {
            params: {
                access_token: token,
            },
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
                params: {
                    access_token: token,
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );
        return;
    }
}

export class ApplePlaylistService extends PlaylistService {
    // Make queries to Apple Music API
    static async getPlaylist(token: string, id: string): Promise<Playlist> {
        // get playlist by id
        const response = await axios.get(`https://api.music.apple.com/v1/catalog/us/playlists/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return {
            id: response.data.data.attributes.id,
            name: response.data.data.attributes.name,
            description: response.data.data.attributes.description,
            image: response.data.data.attributes.artwork.url,
            provider: 'apple',
            tracks: [],
        };
    }
    static async getPlaylists(token: string): Promise<Playlist[]> {
        // get user playlists
        const response = await axios.get(`https://api.music.apple.com/v1/me/library/playlists`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data.data.map((playlist: any) => {
            return {
                id: playlist.id,
                name: playlist.attributes.name,
                description: playlist.attributes.description,
                image: playlist.attributes.artwork.url,
                provider: 'apple',
                tracks: [],
            };
        });
    }
    static async createPlaylist(token: string, playlist: Playlist): Promise<Playlist> {
        // create playlist
        const response = await axios.post(
            'https://api.music.apple.com/v1/me/library/playlists',
            {
                name: playlist.name,
                description: playlist.description,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );
        return {
            id: response.data.data.attributes.id,
            name: response.data.data.attributes.name,
            description: response.data.data.attributes.description,
            image: response.data.data.attributes.artwork.url,
            provider: 'apple',
            tracks: [],
        };
    }
    static async updatePlaylist(token: string, playlist: Playlist): Promise<Playlist> {
        // update playlist
        const response = await axios.put(
            `https://api.music.apple.com/v1/me/library/playlists/${playlist.id}`,
            {
                name: playlist.name,
                description: playlist.description,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );
        return {
            id: response.data.data.attributes.id,
            name: response.data.data.attributes.name,
            description: response.data.data.attributes.description,
            image: response.data.data.attributes.artwork.url,
            provider: 'apple',
            tracks: [],
        };
    }
    static async deletePlaylist(token: string, id: string): Promise<void> {
        // delete playlist
        await axios.delete(`https://api.music.apple.com/v1/me/library/playlists/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return;
    }
    static async getPlaylistTracks(token: string, id: string): Promise<Track[]> {
        // get playlist tracks
        const response = await axios.get(`https://api.music.apple.com/v1/me/library/playlists/${id}/tracks`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data.data.map((track: any) => {
            return {
                id: track.id,
                name: track.attributes.name,
                artist: track.attributes.artistName,
                album: track.attributes.albumName,
                image: track.attributes.artwork.url,
                provider: 'apple',
            };
        });
    }

    // unsave playlist to favorites
    static async unsavePlaylist(token: string, id: string): Promise<void> {
        // unsave playlist
        await axios.delete(`https://api.music.apple.com/v1/me/library/playlists/${id}/relationships/favorites`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return;
    }

    // Save playlist to favorites
    static async savePlaylist(token: string, id: string): Promise<void> {
        // save playlist
        await axios.post(
            `https://api.music.apple.com/v1/me/library/playlists/${id}/relationships/favorites`,
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
        const response = await axios.get(`https://www.googleapis.com/youtube/v3/playlists?part=snippet&id=${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return {
            id: response.data.items[0].id,
            name: response.data.items[0].snippet.title,
            description: response.data.items[0].snippet.description,
            image: response.data.items[0].snippet.thumbnails.default.url,
            provider: 'youtube',
            tracks: [],
        };
    }
    static override async getPlaylists(token: string): Promise<Playlist[] | unknown> {
        const response = await axios.get(`https://www.googleapis.com/youtube/v3/playlists?part=snippet&mine=true`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data.items.map((playlist: any) => {
            return {
                id: playlist.id,
                name: playlist.snippet.title,
                description: playlist.snippet.description,
                image: playlist.snippet.thumbnails.default.url,
                provider: 'youtube',
                tracks: [],
            };
        });
    }
    static override async createPlaylist(token: string, playlist: Playlist): Promise<Playlist | unknown> {
        const response = await axios.post(
            `https://www.googleapis.com/youtube/v3/playlists?part=snippet`,
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
        return {
            id: response.data.id,
            name: response.data.snippet.title,
            description: response.data.snippet.description,
            image: response.data.snippet.thumbnails.default.url,
            provider: 'youtube',
            tracks: [],
        };
    }

    static override async updatePlaylist(token: string, playlist: Playlist): Promise<Playlist | unknown> {
        const response = await axios.put(
            `https://www.googleapis.com/youtube/v3/playlists?part=snippet`,
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
        return {
            id: response.data.id,
            name: response.data.snippet.title,
            description: response.data.snippet.description,
            image: response.data.snippet.thumbnails.default.url,
            provider: 'youtube',
            tracks: [],
        };
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
        const response = await axios.get(
            `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );

        return response.data.items.map((item: any) => {
            return {
                id: item.snippet.resourceId.videoId,
                name: item.snippet.title,
                artist: item.snippet.channelTitle,
                album: item.snippet.channelTitle,
                image:
                    item.snippet.thumbnails?.default?.url ||
                    `https://img.youtube.com/vi/${item.snippet.resourceId.videoId}/default.jpg`,
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
