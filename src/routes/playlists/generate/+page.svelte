<script lang="ts">
    import PlaylistCreator from "../../../components/playlistCreator.svelte";
    import Header from "../../../components/header.svelte";
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
    <Header />
    <PlaylistCreator />
</div>