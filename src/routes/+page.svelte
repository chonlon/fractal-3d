<script lang="ts">

    import {onMount} from "svelte";

    let logo = '';
    let config = '';
    let selected = '';

</script>

<div class="App">
    <header>
        <script src='https://cdn.everxyz.com/everapi/stable/everapi@v4.1.8.js'/>
        <div class="corner">
            <a href="">
                <img src={logo} alt="Fracal 3D"/>
            </a>
        </div>

        <nav>
            <svg viewBox="0 0 2 3" aria-hidden="true">
                <path d="M0,0 L1,2 C1.5,3 1.5,3 2,3 L2,0 Z"/>
            </svg>
            <ul>
                <li class:active-tab={selected === 'Basic'}>
                    <button class="tab-btn" on:click={() => {
                    selected = 'Basic'
                }}>
                        Basic
                    </button>
                </li>
                <li class:active-tab={selected === 'Files'}>
                    <button class="tab-btn" on:click={() => {
                    selected = 'Files'
                    console.log('Files')
                }}>
                        Files
                    </button>
                </li>
                <svg viewBox="0 0 2 3" aria-hidden="true">
                    <path d="M0,0 L0,3 C0.5,3 0.5,3 1,2 L2,0 Z"/>
                </svg>
            </ul>
        </nav>
        <div>
            <p>示例</p>
        </div>
    </header>

    <div class="content">
        <div class="api">
            <ever-3d id="api"/>
        </div>

        {#if selected === 'Basic'}
        <p>Basic</p>
        {:else if selected === 'Files'}
        <p>Files</p>
        {:else}
        <p>Basic</p>
        {/if}
    </div>

</div>


<style>
    header {
        display: flex;
        justify-content: space-between;
    }

    /**
    * 顶部导航栏添加亚克力效果以及阴影
    */
    header {
        background: #fff;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        border-radius: 10px;
        padding: 0 20px;
        height: 60px;
        align-items: center;
    }


    .App {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
    }

    .corner {
        width: 3em;
        height: 3em;
    }

    .corner a {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
    }

    .corner img {
        width: 2em;
        height: 2em;
        object-fit: contain;
    }

    nav {
        display: flex;
        justify-content: center;
        --background: rgba(255, 255, 255, 0.7);
    }

    svg {
        width: 2em;
        height: 3em;
        display: block;
    }

    path {
        fill: var(--background);
    }

    ul {
        position: relative;
        padding: 0;
        margin: 0;
        height: 3em;
        display: flex;
        justify-content: center;
        align-items: center;
        list-style: none;
        background: var(--background);
        background-size: contain;
    }

    li {
        position: relative;
        height: 80%;
        margin: 0 3px;
    }

    li.active-tab::after {
        --size: 6px;
        content: '';
        width: 0;
        height: 0;
        position: absolute;
        bottom: 0;
        left: calc(50% - var(--size));
        border: var(--size) solid transparent;
        border-bottom-color: #C465FA50;
    }


    /* make tab button no border and add hover style */
    .tab-btn {
        border: none;
        background: none;
        cursor: pointer;
        height: 100%;
    }

    /* hover styles with background */
    .tab-btn:hover {
        background: rgba(62, 35, 35, 0.1);
        border-radius: 0.25rem;
    }

    .tab-btn:focus {
        outline: none;
    }

    .tab-btn:active {
        background: rgba(0, 0, 0, 0.2);
    }

    .tab-btn:disabled {
        color: gray;
    }

    .tab-btn:disabled:hover {
        background: none;
    }

    .active-tab {
        background: #3D83FF50;
        border-radius: 0.25rem;

    }

    .content {
        margin-top: 5px;
    }

    .api {
        margin-bottom: 5px;
    }

</style>
