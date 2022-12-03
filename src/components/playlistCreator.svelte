<script lang="ts">
    import user from "../userstore";
    import sendPost from "../utils/sendPost";
    import playlistSongs from "../utils/playlistSongs";
  import { goto } from "$app/navigation";

    let sellection: string = $user.sellection;
    let onprocess = false;
    let isPrivate: any;
    let title: String;
    let description: String;

    async function createPlaylist() {
        if (!title) alert('There must be title');
        
        onprocess = true;
        // Converting sellections from string to array
        const s = sellection.split(',').map((val) => {
            return val.trim();
        })

        var songs: any = [];
        // Getting songs from sellected playlists
        for (let i = 0; i < s.length; i++) {
            if (s[i] == '' || s[i] == undefined || s[i] == null) continue;
            songs = songs.concat((await playlistSongs(s[i], $user.access_token)));
        }

        // Removing the duplicate songs
        songs = Array.from(new Set(songs));

        // Shuffiling the songs
        var currentIndex = songs.length

        while (0 != currentIndex) {
            var randomIndex = Math.floor(Math.random() * currentIndex)
            currentIndex -= 1

            let temp = songs[currentIndex]
            songs[currentIndex] = songs[randomIndex]
            songs[randomIndex] = temp
        }

        var tempSongs = [];
        for (let i = 0; i < songs.length; i++) { 
            if (!songs[i] || songs[i] == "" || songs[i] == undefined || songs[i] == null) continue;
            tempSongs.push(songs[i]);
        }

        songs = tempSongs;

        const nsongs: Array<Array<String>> = [];
        for (let i = 0; i < songs.length; i++) { 
            if (i % 100 == 0) nsongs.push(songs.slice(i, i+100));
        }

        // Creating playlist
       const rs = await sendPost(`https://api.spotify.com/v1/users/${$user.id}/playlists`, $user.access_token, {
            name: title,
            public: !isPrivate,
            description
        })

        for (let i = 0; i < nsongs.length; i++) {
            await sendPost(`https://api.spotify.com/v1/playlists/${rs.id}/tracks`, $user.access_token, {
                "uris": nsongs[i],
                "position": 0
            })
        }
        
        onprocess = false;
        title = "";
        description = "";
        isPrivate = false;
        goto('/playlists');
    }

    
</script>


<div class="box has-background-grey-darker has-text-white mx-4">
    <div class="field">
        <label class="label has-text-white" for="name">Name</label>
        <div class="control">
            <input bind:value={title} id="name" class="input" type="text" placeholder="Playlist name">
        </div>
    </div>
    <div class="field">
        <label class="label has-text-white" for="description">Description</label>
        <div class="control">
            <textarea bind:value={description} class="textarea" id="description" placeholder="Playlist description"></textarea>
        </div>
    </div>
    <div class="field">
        <div class="control">
            <label class="checkbox">
                <input bind:checked={isPrivate} type="checkbox">
                Make it private
            </label>
        </div>
    </div>

    <button class={ "button is-light is-primary" + ((onprocess == true) ? "is-loading" : "")} on:click={createPlaylist}>Create</button>
</div>
