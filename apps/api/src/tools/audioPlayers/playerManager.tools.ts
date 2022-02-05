export interface Track {
    provider: string;
    id: string;
    title: string;
    artist: string;
    album: string;
    duration: number;
    cover: string;
    url: string;
}

export default class PlayerManager {
    /* Notes:
     * The playermanger is responsible for managing the audio players.
     * It is responsible for creating, destroying, and updating the audio players.
     */
    constructor() {
        // Todo Set audio context
    }
}
