import { error, redirect } from '@sveltejs/kit';
 
const client_id = "59727afbb3de43098e2e1e4a47ae736b";
const redirect_uri = 'https://spoticat.tk/callback';
const spotify_uri = "https://accounts.spotify.com/authorize";
const scope = "ugc-image-upload playlist-read-private playlist-read-collaborative playlist-modify-private playlist-modify-public user-library-read";

/** @type {import('./$types').RequestHandler} */
export function GET({ url }) { 
    const redirect_url = `${spotify_uri}?response_type=token&redirect_uri=${redirect_uri}&client_id=${client_id}&show_dialog=true&scope=${scope}`;
    return Response.redirect(redirect_url);
}
