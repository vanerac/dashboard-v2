import { Album, Artist, Playlist, SearchResult, Track } from '../../../../../../packages/services';
import axios from 'axios';

export abstract class SearchService {
    static async search($accessToken: string, $query: string): Promise<SearchResult | unknown> {
        throw new Error('Method not implemented.');
    }
}

export class SpotifySearchService extends SearchService {
    static async search(accessToken: string, query: string): Promise<SearchResult> {
        if (!query || query.length < 3) {
            return [];
        }
        const url = `https://api.spotify.com/v1/search?q=${query}&type=track,artist,album,playlist`;
        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        const { data } = response;
        const tracks = data.tracks.items.map(
            (track: {
                id: any;
                name: any;
                artists: { name: any }[];
                album: { name: any; images: { url: any }[] };
                duration_ms: any;
            }) =>
                ({
                    id: track.id,
                    name: track.name,
                    artist: track.artists[0].name,
                    album: track.album.name,
                    image: track.album.images[0].url,
                    duration: track.duration_ms,
                    provider: 'spotify',
                } as Track),
        );
        // const albums = data.albums.map(
        //     (album: { id: any; name: any; artists: { name: any }[]; images: { url: any }[]; uri: any }) =>
        //         ({
        //             id: album.id,
        //             name: album.name,
        //             artist: album.artists[0].name,
        //             image: album.images[0].url,
        //             provider: 'spotify',
        //         } as Album),
        // );
        // const artists = data.artists.map(
        //     (artist: { id: any; name: any; images: { url: any }[] }) =>
        //         ({
        //             id: artist.id,
        //             name: artist.name,
        //             image: artist.images[0].url,
        //             provider: 'spotify',
        //         } as Artist),
        // );
        // const playlists = data.playlists.map(
        //     (playlist: { id: any; name: any; images: { url: any }[] }) =>
        //         ({
        //             id: playlist.id,
        //             name: playlist.name,
        //             image: playlist.images[0].url,
        //             provider: 'spotify',
        //         } as Playlist),
        // );
        return [...tracks];
    }
}

export class AppleSearchService extends SearchService {
    static async search(accessToken: string, query: string): Promise<SearchResult> {
        const response = await fetch(`https://api.music.apple.com/v1/catalog/us/search?term=${query}`);
        const data = await response.json();
        const tracks = data.results.songs.map(
            (track: any) =>
                ({
                    id: track.id,
                    name: track.name,
                    artist: track.artistName,
                    album: track.albumName,
                    image: track.artwork[0].url,
                    duration: track.durationMillis,
                    provider: 'apple',
                } as Track),
        );
        const albums = data.results.albums.map(
            (album: any) =>
                ({
                    id: album.id,
                    name: album.name,
                    artist: album.artistName,
                    image: album.artwork[0].url,
                    provider: 'apple',
                } as Album),
        );
        const artists = data.results.artists.map(
            (artist: { id: any; name: any; artwork: { url: any }[] }) =>
                ({
                    id: artist.id,
                    name: artist.name,
                    image: artist.artwork[0].url,
                    provider: 'apple',
                } as Artist),
        );
        const playlists = data.results.playlists.map(
            (playlist: { id: any; name: any; artwork: { url: any }[] }) =>
                ({
                    id: playlist.id,
                    name: playlist.name,
                    image: playlist.artwork[0].url,
                    provider: 'apple',
                } as Playlist),
        );
        return [...tracks, ...albums, ...artists, ...playlists];
    }
}

export class DeezerSearchService extends SearchService {
    static async search(accessToken: string, query: string): Promise<SearchResult> {
        const url = `https://api.deezer.com/search?q=${query}&limit=50`;
        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        const { data } = response;
        if (data.error) {
            return [];
        }
        console.log(data);
        const tracks = data.data.map(
            (track: {
                id: any;
                title: any;
                artist: { name: any };
                album: { title: any; cover_big: any };
                duration: number;
            }) =>
                ({
                    id: track.id,
                    name: track.title,
                    artist: track.artist.name,
                    album: track.album.title,
                    image: track.album.cover_big,
                    duration: track.duration,
                    provider: 'deezer',
                } as Track),
        );
        const albums = data.data.map(
            (album: { id: any; title: any; artist: { name: any }; cover_big: any }) =>
                ({
                    id: album.id,
                    name: album.title,
                    artist: album.artist.name,
                    image: album.cover_big,
                    provider: 'deezer',
                } as Album),
        );
        const artists = data.data.map(
            (artist: { id: any; name: any; picture_big: any }) =>
                ({
                    id: artist.id,
                    name: artist.name,
                    image: artist.picture_big,
                    provider: 'deezer',
                } as Artist),
        );
        const playlists = data.data.map(
            (playlist: { id: any; title: any; picture_big: any }) =>
                ({
                    id: playlist.id,
                    name: playlist.title,
                    image: playlist.picture_big,
                    provider: 'deezer',
                } as Playlist),
        );
        return [...tracks, ...albums, ...artists, ...playlists];
    }
}

// Youtube service
export class GoogleSearchService extends SearchService {
    static async search(accessToken: string, query: string): Promise<SearchResult> {
        const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&type=video&key=${accessToken}`;
        const response = await axios.get(url);
        const { data } = response;
        const videos = data.items.map(
            (video: { id: any; snippet: { title: any; description: any; thumbnails: { url: any } } }) =>
                ({
                    id: video.id.videoId,
                    name: video.snippet.title,
                    artist: video.snippet.description,
                    image: video.snippet.thumbnails.url,
                    provider: 'youtube',
                } as Track),
        );
        return videos;
    }
}
