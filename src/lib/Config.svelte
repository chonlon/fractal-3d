<script>
	import { onMount } from 'svelte';
	import { config } from './data.ts';

	export let updateApiConfig;

	let configStr = '';

	function updateConfig() {
		let updated_config = JSON.parse(configStr);
		if (updated_config) {
			updateApiConfig(updated_config);
		}
	}

	onMount(() => {
		configStr = JSON.stringify(config, null, 2);
		console.log(configStr);
		console.log(config);
	});
</script>

<div class="config">
	<textarea class="config-editor" bind:value={configStr} />

	<button on:click={updateConfig}>Update config</button>
	<p> 阅读<a href="https://ever-xyz.feishu.cn/wiki/wikcnRVP7vU4eG91LGu99xSAVfg#XQWqdm0esoO8Y8xW6BBcfe3bnfd">更多</a>关于 Fracal 3D 配置的内容 </p>
</div>

<style>
	.config {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
	}
	.config-editor {
		height: 40vh;
		width: 80vw;
	}
</style>
