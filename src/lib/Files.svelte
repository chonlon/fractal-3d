<script lang="ts">
    export let apiOpenFile: (url: string) => void;
    let files = [];
    import {onMount} from "svelte";

    function uploadFile() {

    }

    function openFile(url) {
        // url can be absolute or relative

    }


    onMount(() => {
        files = [];

    });
</script>

<div>
    <input
            type="file"
            id="file"
            onchange="uploadFile"
    />

    {#each files as file}
        <button class="file_button" on:click={() => openFile(file) }>
            {file.path}
        </button>
    {/each}

</div>