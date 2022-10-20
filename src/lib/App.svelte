<script lang="ts">

    import {onMount} from "svelte";

    let logo = '';
    let config = '';
    let selected = '';

</script>

<header>
    <div class="corner">
        <a href="">
            <img src={logo} alt="Fracal 3D"/>
        </a>
    </div>

    <nav>
        <ul>
            <li class:active={selected === 'Basic'}>
                <button on:click={() => {
                    selected = 'Basic'
                }}>
                    Basic
                </button>
            </li>
            <li class:active={selected === 'Files'}>
                <button on:click={() => {
                    selected = 'Files'
                    console.log('Files')
                }}>
                    Files
                </button>
            </li>
        </ul>
    </nav>
</header>

<div>

</div>


<style>
    header {
        display: flex;
        justify-content: space-between;
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
        height: 100%;
    }

    li.active::before {
        --size: 6px;
        content: '';
        width: 0;
        height: 0;
        position: absolute;
        top: 0;
        left: calc(50% - var(--size));
        border: var(--size) solid transparent;
        border-top: var(--size) solid var(--background);
    }

    nav a {
        display: flex;
        height: 100%;
        align-items: center;
        padding: 0 0.5rem;
        font-weight: 700;
        font-size: 0.8rem;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        text-decoration: none;
        transition: color 0.2s linear;
    }

    a:hover {
        color: var(--color-theme-1);
    }
</style>
