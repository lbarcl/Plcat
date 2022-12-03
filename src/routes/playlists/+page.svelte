<script lang="ts">
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";

    import user from "../../userstore";
    import Header from "../../components/header.svelte";
    import Playlist from "../../components/playlist.svelte";

    import mePlaylists from "../../utils/mePlaylists";
    import type {formatedPlaylist} from "../../utils/mePlaylists";

    let playlists: Array<formatedPlaylist> = [];
    let sellected: string = "";

    let plholderWidth = 0;
    let limit = plholderWidth / 8

    onMount(async () => {
        if ($user.access_token == "access") return goto('/');
        playlists = await mePlaylists($user.access_token);
        $user.playlist_count = playlists.length;
    })

    function sellect(e: any) {
        const det = e.detail;

        if (det.toggle == true) {
            sellected += ` ${det.id},`;
        } else {
            sellected = sellected.replace(det.id + ',', '')
        }

        $user.sellection = sellected
    }
</script>

<style>
    div.container {
        margin-top: 2%;
        width: 60%;
        justify-content: center;
        justify-items: center;
    }

    div.plholder {
        overflow-y: scroll;
        max-height: 800px;
        min-height: 500px;
    }

    
</style>

<svelte:head>
    <title>Plcat | {$user.name} - Playlists</title>
</svelte:head>

<div class="container">
    <Header />
    <div class="box has-background-grey-darker has-text-white mx-4">
        <div class="plholder" bind:clientWidth={plholderWidth}>
            {#each playlists as pl}
            <Playlist {pl} {limit} on:toggled={sellect} />
            {/each}
        </div>
        <button class="button is-success is-light mt-3 mb-0" on:click={() => {
            if (sellected.length > 4)
                goto('/playlists/generate')
            else alert("Please sellect playlists")
        }}>Create</button>
    </div>
</div>