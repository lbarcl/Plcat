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

    return pls;

    function formatPlaylist(pl: any): formatedPlaylist {
        console.log(pl);
        return {
            id: pl.id,
            title: pl.name,
            image: pl.images[0]?.url,
            tracks: pl.tracks.total,
            public: pl.public
        }
    }
}

export interface formatedPlaylist {
    id: string,
    title: string,
    image: string,
    tracks: number,
    public: boolean
}