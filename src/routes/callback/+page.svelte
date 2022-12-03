<script lang="ts">
    import { goto } from '$app/navigation';
    import {onMount} from "svelte";
    import user from "../../userstore";

    export let data;
    
    onMount(async () => {
        const response = await fetch('https://api.spotify.com/v1/me', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + data.access_token
            }
        })

        const userData = await response.json();

        user.set({
            id: userData.id,
            name: userData.display_name,
            access_token: data.access_token,
            image: userData.images[0].url
        });
        
        window.localStorage.setItem("access_token", data.access_token);
        window.localStorage.setItem("expires_date", (Date.now() + 3550 * 1000).toString() );
        goto('/playlists');
    })

</script>