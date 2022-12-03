<script lang="ts">
  import { goto } from "$app/navigation";
    import user from "../userstore";

    function exit() {
        window.localStorage.clear();
        goto("/");
        user.set({
            id: "id",
            name: "name",
            image: "url",
            access_token: "access",
            playlist_count: 0,
            sellection: ""
        });

    }
</script>

<div class="box has-background-grey-darker mx-4">
    <nav class="navbar has-background-grey-darker has-text-white">
        <div class="navbar-brand">
            <figure class="image is-64x64">
                <!-- svelte-ignore a11y-img-redundant-alt -->
                <img class="is-rounded is-fullwidth" src={$user.image} alt="User profile picture">
            </figure>
            <div class="navbar-item">
                <a href={"https://open.spotify.com/user/" + $user.id}><p class="is-size-4" ><strong class="has-text-white">{$user.name}</strong></p></a>
            </div>
        </div>

        <div class="navbar-item">
            <p class="has-text-grey-light">{$user.playlist_count} Playlists</p>
        </div>

        <div class="navbar-end">
            <div class="navbar-item">
                <button class="button is-danger is-light" on:click={exit}>Exit</button>
            </div>
        </div>
    </nav>
</div>