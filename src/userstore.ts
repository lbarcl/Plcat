import { writable } from 'svelte/store';

export default writable({
    id: "id",
    name: "name",
    image: "url",
    access_token: "access",
    playlist_count: 0,
    sellection: ""
});