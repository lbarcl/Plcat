<script lang="ts">
    import Login from "../components/login.svelte";
    import {onMount} from "svelte";
    import user from "../userstore";
    import { goto } from "$app/navigation";

    let itHas = false;

    onMount(async () => {
        var expireDate: string | number | null = window.localStorage.getItem("expires_date");
        if (expireDate == null) return;
        expireDate = parseInt(expireDate);

        if (expireDate > Date.now()) {
            itHas = true;
            const response = await fetch('https://api.spotify.com/v1/me', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + window.localStorage.getItem("access_token")
                }
            })

            const userData = await response.json();

            //@ts-ignore
            user.set({
                id: userData.id,
                name: userData.display_name,
                access_token: window.localStorage.getItem("access_token"),
                image: userData.images[0].url
            });

            if ($user.access_token != null) {
                goto('/playlists');
            } else {
                itHas = false;
            }
        }
    })

</script>

<style>
    div.container {
        margin-top: 2%;
        width: 60%;
        justify-content: center;
        justify-items: center;
    }
</style>

<div class="container">
    {#if !itHas}
    <Login />
    {:else}
    <div class="box">
        Oh so you did connect before we are redirecting, please wait...
    </div>
    {/if}
</div>
