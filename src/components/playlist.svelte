<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    export let pl: fpl;
    export let limit: number;

    let mouseOn = false;
    let toggle = false;
    let dispatcher = createEventDispatcher();

    interface fpl {
        id: string,
        title: string,
        image: string,
        tracks: number,
        public: boolean
    }
</script>

<style>
    button.level {
        width: 100%;
        background-color: hsl(0, 0%, 23%);
        border-color: transparent;
        border-radius: 6px;
        transition: ease .2;
    }

    button.level:hover {
        height: 146px;
        font-size: large;
    }

    button.toggled {
        background-color: hsl(0, 0%, 80%);
    }
</style>

<button class={toggle == true ? "level toggled" : "level"} on:click={() => {toggle = !toggle; dispatcher('toggled', {id: pl.id, toggle})}} on:mouseenter={() => mouseOn = true} on:mouseleave={() => mouseOn = false}>
    <div class="level-left">
        <div class="level-item">
            <figure class={mouseOn == true ? "image is-1by1 is-128x128" : "image is-1by1 is-64x64"}>
                <!-- svelte-ignore a11y-img-redundant-alt -->
                <img style="border-radius: 6px;" class="is-fullwidth " src={pl.image != undefined ? pl.image : "https://bulma.io/images/placeholders/128x128.png"} alt={pl.title + "'s image"}>
            </figure>
        </div>
        <div class="level-item">
            <p class="has-text-white is-size-5">{(pl.title.length > limit) ? pl.title.slice(0, limit - 3) + '...' : pl.title}</p>
        </div>
        <div class="level-item">
            <p class="has-text-grey-light is-size-8">{pl.tracks} songs</p>
        </div>
    </div>
</button>