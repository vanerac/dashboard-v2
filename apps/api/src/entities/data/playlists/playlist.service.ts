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
}

export class SpotifyPlaylistService extends PlaylistService {
    // Make queries to Spotify API
    static override async getPlaylist(token: string, id: string): Promise<Playlist | unknown> {
        const response = await axios.get(`https://api.spotify.com/v1/playlists/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    }
    static override async getPlaylists(token: string): Promise<Playlist[] | unknown> {
        const response = await axios.get(`https://api.spotify.com/v1/me/playlists`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data.items;
    }
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
    static override async deletePlaylist(token: string, id: string): Promise<void | unknown> {
        await axios.delete(`https://api.spotify.com/v1/playlists/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return;
    }
    static override async getPlaylistTracks(token: string, id: string): Promise<Track[] | unknown> {
        const response = await axios.get(`https://api.spotify.com/v1/playlists/${id}/tracks`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data.items;
    }
}
