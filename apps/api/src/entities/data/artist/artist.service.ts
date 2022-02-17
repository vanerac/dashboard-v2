import { Album, Artist, Playlist, Track } from '../../../../../../packages/services';

export class ArtistService {
    static async getArtistById($accessToken: string, $artistId: string): Promise<Artist> {
        throw new Error('Method not implemented.');
    }

    // get user followed artists
    static async getFollowedArtists($accessToken: string): Promise<Artist[]> {
        throw new Error('Method not implemented.');
    }
    // follow artist
    static async followArtist($accessToken: string, $artistId: string): Promise<Artist> {
        throw new Error('Method not implemented.');
    }

    // unfollow artist
    static async unfollowArtist($accessToken: string, $artistId: string): Promise<Artist> {
        throw new Error('Method not implemented.');
    }
    // get artist albums
    static async getArtistAlbums($accessToken: string, $artistId: string): Promise<Artist> {
        throw new Error('Method not implemented.');
    }
    // get artist top tracks
    static async getArtistTopTracks($accessToken: string, $artistId: string): Promise<Artist> {
        throw new Error('Method not implemented.');
    }
    // get artist related artists
    static async getArtistRelatedArtists($accessToken: string, $artistId: string): Promise<Artist> {
        throw new Error('Method not implemented.');
    }
    // get artist playlists
    static async getArtistPlaylists($accessToken: string, $artistId: string): Promise<Artist> {
        throw new Error('Method not implemented.');
    }
}

export class SpotifyArtistService implements ArtistService {
    static async getArtistById(accessToken: string, artistId: string): Promise<Artist> {
        const url = `https://api.spotify.com/v1/artists/${artistId}`;
        const headers = {
            Authorization: `Bearer ${accessToken}`,
        };
        const response = await fetch(url, { headers });
        const json = await response.json();
        // parse artist to type Artist
        const parsed: Artist = {
            id: json.id,
            name: json.name,
            image: json.images[0].url,
            followers: json.followers,
            external_urls: json.external_urls,
        };
        return parsed;
    }

    // get user followed artists
    static async getFollowedArtists(accessToken: string): Promise<Artist[]> {
        const url = `https://api.spotify.com/v1/me/following?type=artist`;
        const headers = {
            Authorization: `Bearer ${accessToken}`,
        };
        const response = await fetch(url, { headers });
        const json = await response.json();
        const artists: Artist[] = json.artists.items.map((artist: any) => {
            return {
                id: artist.id,
                name: artist.name,
                image: artist.images[0].url,
                followers: artist.followers,
                external_urls: artist.external_urls,
                provider: 'spotify',
            };
        });
        return artists;
    }
    // follow artist
    static async followArtist(accessToken: string, artistId: string): Promise<Artist> {
        const url = `https://api.spotify.com/v1/me/following?type=artist`;
        const headers = {
            Authorization: `Bearer ${accessToken}`,
        };
        const response = await fetch(url, {
            method: 'PUT',
            headers,
            body: JSON.stringify({
                ids: [artistId],
            }),
        });
        const json = await response.json();
        const artist: Artist = {
            id: json.artists.items[0].id,
            name: json.artists.items[0].name,
            image: json.artists.items[0].images[0].url,
            followers: json.artists.items[0].followers,
            external_urls: json.artists.items[0].external_urls,
            provider: 'spotify',
        };
        return artist;
    }

    // unfollow artist
    static async unfollowArtist(accessToken: string, artistId: string): Promise<Artist> {
        const url = `https://api.spotify.com/v1/me/following?type=artist`;
        const headers = {
            Authorization: `Bearer ${accessToken}`,
        };
        const response = await fetch(url, {
            method: 'DELETE',
            headers,
            body: JSON.stringify({
                ids: [artistId],
            }),
        });
        const json = await response.json();
        const artist: Artist = {
            id: json.artists.items[0].id,
            name: json.artists.items[0].name,
            image: json.artists.items[0].images[0].url,
            followers: json.artists.items[0].followers,
            external_urls: json.artists.items[0].external_urls,
            provider: 'spotify',
        };
        return artist;
    }

    // get artist albums
    static async getArtistAlbums(accessToken: string, artistId: string): Promise<Album[]> {
        const url = `https://api.spotify.com/v1/artists/${artistId}/albums`;
        const headers = {
            Authorization: `Bearer ${accessToken}`,
        };
        const response = await fetch(url, { headers });
        const json = await response.json();
        const albums: Album[] = json.items.map((album: any) => {
            return {
                id: album.id,
                name: album.name,
                image: album.images[0].url,
                release_date: album.release_date,
                external_urls: album.external_urls,
                provider: 'spotify',
            };
        });
        return albums;
    }
    // get artist top tracks
    static async getArtistTopTracks(accessToken: string, artistId: string): Promise<Track[]> {
        const url = `https://api.spotify.com/v1/artists/${artistId}/top-tracks?country=US`;
        const headers = {
            Authorization: `Bearer ${accessToken}`,
        };
        const response = await fetch(url, { headers });
        const json = await response.json();
        const tracks: Track[] = json.tracks.map((track: any) => {
            return {
                id: track.id,
                name: track.name,
                image: track.album.images[0].url,
                external_urls: track.external_urls,
                provider: 'spotify',
            };
        });
        return tracks;
    }
    // get artist related artists
    static async getArtistRelatedArtists(accessToken: string, artistId: string): Promise<Artist[]> {
        const url = `https://api.spotify.com/v1/artists/${artistId}/related-artists`;
        const headers = {
            Authorization: `Bearer ${accessToken}`,
        };
        const response = await fetch(url, { headers });
        const json = await response.json();
        const artists: Artist[] = json.artists.map((artist: any) => {
            return {
                id: artist.id,
                name: artist.name,
                image: artist.images[0].url,
                followers: artist.followers,
                external_urls: artist.external_urls,
                provider: 'spotify',
            };
        });
        return artists;
    }
    // get artist playlists
    static async getArtistPlaylists(accessToken: string, artistId: string): Promise<Playlist[]> {
        const url = `https://api.spotify.com/v1/artists/${artistId}/playlists`;
        const headers = {
            Authorization: `Bearer ${accessToken}`,
        };
        const response = await fetch(url, { headers });
        const json = await response.json();
        const playlists: Playlist[] = json.items.map((playlist: any) => {
            return {
                id: playlist.id,
                name: playlist.name,
                image: playlist.images[0].url,
                external_urls: playlist.external_urls,
                provider: 'spotify',
            };
        });
        return playlists;
    }
}

export class DeezerArtistService implements ArtistService {
    // get artist
    static async getArtist(accessToken: string, artistId: string): Promise<Artist> {
        const url = `https://api.deezer.com/artist/${artistId}`;
        const headers = {
            Authorization: `Bearer ${accessToken}`,
        };
        const response = await fetch(url, { headers });
        const json = await response.json();
        const artist: Artist = {
            id: json.id,
            name: json.name,
            image: json.picture_xl,
            followers: json.nb_fan,
            external_urls: json.link,
            provider: 'deezer',
        };
        return artist;
    }

    // get artist albums
    static async getArtistAlbums(accessToken: string, artistId: string): Promise<Album[]> {
        const url = `https://api.deezer.com/artist/${artistId}/albums`;
        const headers = {
            Authorization: `Bearer ${accessToken}`,
        };
        const response = await fetch(url, { headers });
        const json = await response.json();
        const albums: Album[] = json.data.map((album: any) => {
            return {
                id: album.id,
                name: album.title,
                image: album.cover_xl,
                release_date: album.release_date,
                external_urls: album.link,
                provider: 'deezer',
            };
        });
        return albums;
    }
    // get artist top tracks
    static async getArtistTopTracks(accessToken: string, artistId: string): Promise<Track[]> {
        const url = `https://api.deezer.com/artist/${artistId}/top?limit=50`;
        const headers = {
            Authorization: `Bearer ${accessToken}`,
        };
        const response = await fetch(url, { headers });
        const json = await response.json();
        const tracks: Track[] = json.data.map((track: any) => {
            return {
                id: track.id,
                name: track.title,
                image: track.album.cover_xl,
                external_urls: track.link,
                provider: 'deezer',
            };
        });
        return tracks;
    }
    // get artist related artists
    static async getArtistRelatedArtists(accessToken: string, artistId: string): Promise<Artist[]> {
        const url = `https://api.deezer.com/artist/${artistId}/related`;
        const headers = {
            Authorization: `Bearer ${accessToken}`,
        };
        const response = await fetch(url, { headers });
        const json = await response.json();
        const artists: Artist[] = json.data.map((artist: any) => {
            return {
                id: artist.id,
                name: artist.name,
                image: artist.picture_xl,
                followers: artist.nb_fan,
                external_urls: artist.link,
                provider: 'deezer',
            };
        });
        return artists;
    }
    // get artist playlists
    static async getArtistPlaylists(accessToken: string, artistId: string): Promise<Playlist[]> {
        const url = `https://api.deezer.com/artist/${artistId}/playlists`;
        const headers = {
            Authorization: `Bearer ${accessToken}`,
        };
        const response = await fetch(url, { headers });
        const json = await response.json();
        const playlists: Playlist[] = json.data.map((playlist: any) => {
            return {
                id: playlist.id,
                name: playlist.title,
                image: playlist.picture_xl,
                external_urls: playlist.link,
                provider: 'deezer',
            };
        });
        return playlists;
    }
}
