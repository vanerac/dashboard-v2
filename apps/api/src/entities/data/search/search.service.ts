import { Album, Artist, Playlist, SearchResult, Track } from '../../../../../../packages/services';

export abstract class SearchService {
    static async search($accessToken: string, $query: string): Promise<SearchResult | unknown> {
        throw new Error('Method not implemented.');
    }
}

export class SpotifySearchService extends SearchService {
    static async search(accessToken: string, query: string): Promise<SearchResult> {
        const response = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=track`);
        const data = await response.json();
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
        const albums = data.albums.map(
            (album: { id: any; name: any; artists: { name: any }[]; images: { url: any }[]; uri: any }) =>
                ({
                    id: album.id,
                    name: album.name,
                    artist: album.artists[0].name,
                    image: album.images[0].url,
                    provider: 'spotify',
                } as Album),
        );
        const artists = data.artists.map(
            (artist: { id: any; name: any; images: { url: any }[] }) =>
                ({
                    id: artist.id,
                    name: artist.name,
                    image: artist.images[0].url,
                    provider: 'spotify',
                } as Artist),
        );
        const playlists = data.playlists.map(
            (playlist: { id: any; name: any; images: { url: any }[] }) =>
                ({
                    id: playlist.id,
                    name: playlist.name,
                    image: playlist.images[0].url,
                    provider: 'spotify',
                } as Playlist),
        );
        return [...tracks, ...albums, ...artists, ...playlists];
    }
}

// Youtube service
export class GoogleSearchService extends SearchService {
    static async search(accessToken: string, query: string): Promise<SearchResult> {
        const response = await fetch(
            `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&type=video&key=${process.env.GOOGLE_API_KEY}`,
        );
        const data = await response.json();
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
