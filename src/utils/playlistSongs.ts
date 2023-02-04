import sendGet from "./sendGet";

export default async function (plid: string, token: string): Promise<Array<string>> {
    if (plid === 'saved') {
        var rs = await sendGet(`https://api.spotify.com/v1/me/tracks?fields=next,items(uri)&limit=50`, token);
    } else {
        var rs = await sendGet(`https://api.spotify.com/v1/playlists/${plid}/tracks?fields=next,items(track(uri))&limit=50`, token);
    }
    var next = rs?.next;
    var s = rs.items

    while(next) {
        rs = await sendGet(next, token);
        next = rs?.next;
        s = s.concat(rs.items);
    }

    return s.map((val: any) => {
        return val.track?.uri;
    });
}