import sendRequest from "./sendGet";

export default async function (token: string): Promise<Array<formatedPlaylist>> {
    var pls: Array<formatedPlaylist> = [];
    var rs = await sendRequest('https://api.spotify.com/v1/me/playlists', token);
    var next = rs?.next;
    pls = pls.concat(rs.items.map(formatPlaylist));

    while(!next) { 
        rs = await sendRequest(next, token);
        next = rs?.next;
        pls = pls.concat(rs.items.map(formatPlaylist));
    }

    var rs = await sendRequest('https://api.spotify.com/v1/me/tracks', token);
    pls.unshift({
        id: 'saved',
        title: 'Saved Tracks',
        image: 'https://t.scdn.co/images/3099b3803ad9496896c43f22fe9be8c4.png',
        tracks: rs.total,
        public: false
    })

    return pls;

}

function formatPlaylist(pl: any): formatedPlaylist {
    return {
        id: pl.id,
        title: pl.name,
        image: pl.images[0]?.url,
        tracks: pl.tracks.total,
        public: pl.public
    }
}

export interface formatedPlaylist {
    id: string,
    title: string,
    image: string,
    tracks: number,
    public: boolean
}