<script lang="ts">
    import user from "../userstore";
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
    </nav>
</div>