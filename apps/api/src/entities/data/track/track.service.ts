import { Album, Artist, Track } from '../../../../../../packages/services';
import axios from 'axios';

export class TrackService {
    static async getById($accessToken: string, $trackId: string): Promise<Track> {
        throw new Error('Method not implemented.');
    }

    // get album
    static async getAlbum($accessToken: string, $trackId: string): Promise<Album> {
        throw new Error('Method not implemented.');
    }

    // get artists
    static async getArtists($accessToken: string, $trackId: string): Promise<Artist> {
        throw new Error('Method not implemented.');
    }

    // like
    static async like($accessToken: string, $trackId: string): Promise<void> {
        throw new Error('Method not implemented.');
    }

    // unlike
    static async unlike($accessToken: string, $trackId: string): Promise<void> {
        throw new Error('Method not implemented.');
    }

    // add to playlist
    static async addToPlaylist($accessToken: string, $trackId: string, $playlistId: string): Promise<void> {
        throw new Error('Method not implemented.');
    }

    // remove from playlist
    static async removeFromPlaylist($accessToken: string, $trackId: string, $playlistId: string): Promise<void> {
        throw new Error('Method not implemented.');
    }
}

export class SpotifyTrackService extends TrackService {
    static async getById(accessToken: string, trackId: string): Promise<Track> {
        // make request to spotify api
        // return track
        const url = `https://api.spotify.com/v1/tracks/${trackId}`;
        const headers = {
            Authorization: `Bearer ${accessToken}`,
        };
        const response = await axios.get(url, { headers });
        // map response to track type
        return {
            image: response.data.album.images[0].url,
            playable: true,
            type: 'track',
            id: response.data.id,
            name: response.data.name,
            artist: response.data.artist[0].name,
            album: response.data.album.name,
            duration: response.data.duration_ms,
            provider: 'spotify',
            uri: response.data.uri,
        };
    }

    static async getAlbum(accessToken: string, trackId: string): Promise<Album> {
        // make request to spotify api
        // return album
        const url = `https://api.spotify.com/v1/tracks/${trackId}`;
        const headers = {
            Authorization: `Bearer ${accessToken}`,
        };
        const response = await axios.get(url, { headers });
        // map response to album type
        return {
            id: response.data.album.id,
            name: response.data.album.name,
            artist: response.data.album.artist[0].name,
            provider: 'spotify',
        };
    }

    static async getArtists(accessToken: string, trackId: string): Promise<Artist> {
        // make request to spotify api
        // return artist
        const url = `https://api.spotify.com/v1/tracks/${trackId}`;
        const headers = {
            Authorization: `Bearer ${accessToken}`,
        };
        const response = await axios.get(url, { headers });
        // map response to artist type
        return {
            external_urls: response.data.album.artist[0].external_urls,
            followers: response.data.album.artist[0].followers,
            image: response.data.album.artist[0].images[0].url,
            type: 'track',
            id: response.data.album.artist[0].id,
            name: response.data.album.artist[0].name,
            provider: 'spotify',
        };
    }

    static async like(accessToken: string, trackId: string): Promise<void> {
        // make request to spotify api
        // return nothing
        const url = `https://api.spotify.com/v1/me/tracks?ids=${trackId}`;
        const headers = {
            Authorization: `Bearer ${accessToken}`,
        };
        await axios.put(url, {}, { headers });
    }

    static async unlike(accessToken: string, trackId: string): Promise<void> {
        // make request to spotify api
        // return nothing
        const url = `https://api.spotify.com/v1/me/tracks?ids=${trackId}`;
        const headers = {
            Authorization: `Bearer ${accessToken}`,
        };
        await axios.delete(url, { headers });
    }

    static async addToPlaylist(accessToken: string, trackId: string, playlistId: string): Promise<void> {
        // make request to spotify api
        // return nothing
        const url = `https://api.spotify.com/v1/playlists/${playlistId}/tracks?uris=spotify:track:${trackId}`;
        const headers = {
            Authorization: `Bearer ${accessToken}`,
        };
        await axios.post(url, {}, { headers });
    }

    static async removeFromPlaylist(accessToken: string, trackId: string, playlistId: string): Promise<void> {
        // make request to spotify api
        // return nothing
        const url = `https://api.spotify.com/v1/playlists/${playlistId}/tracks?uris=spotify:track:${trackId}`;
        const headers = {
            Authorization: `Bearer ${accessToken}`,
        };
        await axios.delete(url, { headers });
    }
}

export class AppleTrackService extends TrackService {
    static async getTrack(accessToken: string, trackId: string): Promise<Track> {
        // make request to apple music api
        // return track
        const url = `https://api.music.apple.com/v1/catalog/us/songs/${trackId}`;
        const headers = {
            Authorization: `Bearer ${accessToken}`,
        };
        const response = await axios.get(url, { headers });
        // map response to track type
        return {
            image: response.data.attributes.artwork.url,
            playable: true,
            type: 'track',
            id: response.data.id,
            name: response.data.attributes.name,
            artist: response.data.attributes.artistName,
            album: response.data.attributes.albumName,
            duration: response.data.attributes.durationInMillis,
            provider: 'apple',
            uri: response.data.attributes.url,
        };
    }

    static async getAlbum(accessToken: string, trackId: string): Promise<Album> {
        // make request to apple music api
        // return album
        const url = `https://api.music.apple.com/v1/catalog/us/songs/${trackId}`;
        const headers = {
            Authorization: `Bearer ${accessToken}`,
        };
        const response = await axios.get(url, { headers });
        // map response to album type
        return {
            id: response.data.relationships.albums.data[0].id,
            name: response.data.attributes.albumName,
            artist: response.data.attributes.artistName,
            provider: 'apple',
        };
    }

    static async getArtists(accessToken: string, trackId: string): Promise<Artist> {
        // make request to apple music api
        // return artist
        const url = `https://api.music.apple.com/v1/catalog/us/songs/${trackId}`;
        const headers = {
            Authorization: `Bearer ${accessToken}`,
        };
        const response = await axios.get(url, { headers });
        // map response to artist type
        return {
            external_urls: response.data.attributes.artistUrl,
            followers: response.data.attributes.artistId,
            image: response.data.attributes.artwork.url,
            type: 'artist',
            id: response.data.relationships.artists.data[0].id,
            name: response.data.attributes.artistName,
            provider: 'apple',
        };
    }

    static async getAlbums(accessToken: string, trackId: string): Promise<Album> {
        // make request to apple music api
        // return album
        const url = `https://api.music.apple.com/v1/catalog/us/songs/${trackId}`;
        const headers = {
            Authorization: `Bearer ${accessToken}`,
        };
        const response = await axios.get(url, { headers });
        // map response to album type
        return {
            id: response.data.relationships.albums.data[0].id,
            name: response.data.attributes.albumName,
            artist: response.data.attributes.artistName,
            provider: 'apple',
        };
    }

    // like
    static async like(accessToken: string, trackId: string): Promise<void> {
        // make request to apple music api
        // return nothing
        const url = `https://api.music.apple.com/v1/me/library/songs/${trackId}`;
        const headers = {
            Authorization: `Bearer ${accessToken}`,
        };
        await axios.put(url, {}, { headers });
    }

    // unlike
    static async unlike(accessToken: string, trackId: string): Promise<void> {
        // make request to apple music api
        // return nothing
        const url = `https://api.music.apple.com/v1/me/library/songs/${trackId}`;
        const headers = {
            Authorization: `Bearer ${accessToken}`,
        };
        await axios.delete(url, { headers });
    }

    // add to playlist
    static async addToPlaylist(accessToken: string, trackId: string, playlistId: string): Promise<void> {
        // make request to apple music api
        // return nothing
        const url = `https://api.music.apple.com/v1/me/library/playlists/${playlistId}/tracks`;
        const headers = {
            Authorization: `Bearer ${accessToken}`,
        };
        await axios.post(url, { data: { id: trackId } }, { headers });
    }

    // remove from playlist
    static async removeFromPlaylist(accessToken: string, trackId: string, playlistId: string): Promise<void> {
        // make request to apple music api
        // return nothing
        const url = `https://api.music.apple.com/v1/me/library/playlists/${playlistId}/tracks/${trackId}`;
        const headers = {
            Authorization: `Bearer ${accessToken}`,
        };
        await axios.delete(url, { headers });
    }
}

export class YoutubeTrackService extends TrackService {
    static async getById(accessToken: string, trackId: string): Promise<Track> {
        // make request to youtube api
        // return track
        const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${trackId}&key=${process.env.YOUTUBE_API_KEY}`;
        const response = await axios.get(url);
        // map response to track type
        return {
            image: response.data.items[0].snippet.thumbnails.default.url,
            playable: true,
            type: 'track',
            id: response.data.items[0].id,
            name: response.data.items[0].snippet.title,
            artist: response.data.items[0].snippet.channelTitle,
            album: response.data.items[0].snippet.channelTitle,
            duration: response.data.items[0].contentDetails.duration,
            provider: 'youtube',
            uri: `https://www.youtube.com/watch?v=${response.data.items[0].id}`,
        };
    }

    static async getAlbum(accessToken: string, trackId: string): Promise<Album> {
        // make request to youtube api
        // return album
        const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${trackId}&key=${process.env.YOUTUBE_API_KEY}`;
        const response = await axios.get(url);
        // map response to album type
        return {
            id: response.data.items[0].snippet.channelId,
            name: response.data.items[0].snippet.channelTitle,
            artist: response.data.items[0].snippet.channelTitle,
            provider: 'youtube',
        };
    }

    static async getArtists(accessToken: string, trackId: string): Promise<Artist> {
        // make request to youtube api
        // return artist
        const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${trackId}&key=${process.env.YOUTUBE_API_KEY}`;
        const response = await axios.get(url);
        // map response to artist type
        return {
            external_urls: response.data.items[0].snippet.channelId,
            followers: 0,
            image: response.data.items[0].snippet.thumbnails.default.url,
            type: 'artist',
            id: response.data.items[0].snippet.channelId,
            name: response.data.items[0].snippet.channelTitle,
            provider: 'youtube',
        };
    }

    static async like(accessToken: string, trackId: string): Promise<void> {
        // make request to youtube api
        // return nothing
        const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${trackId}&key=${process.env.YOUTUBE_API_KEY}`;
        const headers = {
            Authorization: `Bearer ${accessToken}`,
        };
        await axios.put(url, {}, { headers });
    }

    static async unlike(accessToken: string, trackId: string): Promise<void> {
        // make request to youtube api
        // return nothing
        const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${trackId}&key=${process.env.YOUTUBE_API_KEY}`;
        const headers = {
            Authorization: `Bearer ${accessToken}`,
        };
        await axios.delete(url, { headers });
    }

    static async addToPlaylist(accessToken: string, trackId: string, playlistId: string): Promise<void> {
        // make request to youtube api
        // return nothing
        const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${process.env.YOUTUBE_API_KEY}&playlistId=${playlistId}&snippet=%7B%22playlistId%22%3A%22${playlistId}%22%2C%22resourceId%22%3A%7B%22kind%22%3A%22youtube%3Avideo%22%2C%22videoId%22%3A%22${trackId}%22%7D%7D`;
        const headers = {
            Authorization: `Bearer ${accessToken}`,
        };
        await axios.post(url, {}, { headers });
    }

    static async removeFromPlaylist(accessToken: string, trackId: string, playlistId: string): Promise<void> {
        // make request to youtube api
        // return nothing
        const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${process.env.YOUTUBE_API_KEY}&playlistId=${playlistId}&snippet=%7B%22playlistId%22%3A%22${playlistId}%22%2C%22resourceId%22%3A%7B%22kind%22%3A%22youtube%3Avideo%22%2C%22videoId%22%3A%22${trackId}%22%7D%7D`;
        const headers = {
            Authorization: `Bearer ${accessToken}`,
        };
        await axios.delete(url, { headers });
    }
}

export class DeezerTrackService extends TrackService {
    static async getTrack(accessToken: string, trackId: string): Promise<Track> {
        // make request to deezer api
        // return track
        const url = `https://api.deezer.com/track/${trackId}`;
        const response = await axios.get(url);
        // map response to track type
        return {
            image: response.data.album.cover_big,
            playable: false,
            type: 'track',
            id: response.data.id,
            name: response.data.title,
            artist: response.data.artist.name,
            album: response.data.album.title,
            duration: response.data.duration,
            provider: 'deezer',
            uri: response.data.preview,
        };
    }

    static async getAlbum(accessToken: string, trackId: string): Promise<Album> {
        // make request to deezer api
        // return album
        const url = `https://api.deezer.com/track/${trackId}`;
        const response = await axios.get(url);
        // map response to album type
        return {
            id: response.data.album.id,
            name: response.data.album.title,
            artist: response.data.artist.name,
            provider: 'deezer',
        };
    }

    static async getArtists(accessToken: string, trackId: string): Promise<Artist> {
        // make request to deezer api
        // return artist
        const url = `https://api.deezer.com/track/${trackId}`;
        const response = await axios.get(url);
        // map response to artist type
        return {
            id: response.data.artist.id,
            name: response.data.artist.name,
            provider: 'deezer',
            external_urls: response.data.artist.link,
            followers: response.data.artist.nb_fan,
            image: response.data.artist.picture_big,
            type: 'artist',
        };
    }

    static async like(accessToken: string, trackId: string): Promise<void> {
        // make request to deezer api
        // return nothing
        const url = `https://api.deezer.com/user/me/tracks`;
        const headers = {
            Authorization: `Bearer ${accessToken}`,
        };
        await axios.post(
            url,
            {
                id: trackId,
            },
            { headers },
        );
    }

    static async unlike(accessToken: string, trackId: string): Promise<void> {
        // make request to deezer api
        // return nothing
        const url = `https://api.deezer.com/user/me/tracks/${trackId}`;
        const headers = {
            Authorization: `Bearer ${accessToken}`,
        };
        await axios.delete(url, { headers });
    }

    static async addToPlaylist(accessToken: string, trackId: string, playlistId: string): Promise<void> {
        // make request to deezer api
        // return nothing
        const url = `https://api.deezer.com/playlist/${playlistId}/tracks`;
        const headers = {
            Authorization: `Bearer ${accessToken}`,
        };
        await axios.post(
            url,
            {
                id: trackId,
            },
            { headers },
        );
    }

    static async removeFromPlaylist(accessToken: string, trackId: string, playlistId: string): Promise<void> {
        // make request to deezer api
        // return nothing
        const url = `https://api.deezer.com/playlist/${playlistId}/tracks/${trackId}`;
        const headers = {
            Authorization: `Bearer ${accessToken}`,
        };
        await axios.delete(url, { headers });
    }
}
