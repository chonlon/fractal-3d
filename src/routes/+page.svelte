<script lang="ts">
	import Basic from '../lib/Basic.svelte';
	import Config from '../lib/Config.svelte';
	import Files from '../lib/Files.svelte';

	import { onMount } from 'svelte';
	import { config } from '../lib/data';

	let logo = 'favicon.png';
	let doc_logo = 'doc.png';

	let selected = 'Basic';
	let api_instance = null;
	onMount(() => {
		// 注意 id 需要和 html 中的 id 一致
		api_instance = window.EverAPI.getInstanceById('api');
		if (!api_instance) {
			console.error('获取 api 实例失败');
		}
		window.api_instance = api_instance;

		// 此处的 appid 与 appkey 需要填入你在 fractal 3d 申请得到的
		// 下面的 appid 与 appkey 只在 localhost 可用
		window.EverAPI.login('6103ec4a2189', 'cc239b39cd09383aba9b1310db8cf334');

		api_instance.config(config);
	});
</script>

<div class="App">
	<header>
		<script src="https://cdn.everxyz.com/everapi/stable/everapi@v4.2.5.js"></script>
		<div class="corner">
			<a href="https://fractal3d.everxyz.com/">
				<img src={logo} alt="Fractal 3D" />
			</a>
		</div>

		<nav>
			<ul>
				<li class:active-tab={selected === 'Basic'}>
					<button
						class="tab-btn"
						on:click={() => {
							selected = 'Basic';
						}}
					>
						功能
					</button>
				</li>
				<li class:active-tab={selected === 'Files'}>
					<button
						class="tab-btn"
						on:click={() => {
							selected = 'Files';
						}}
					>
						文件
					</button>
				</li>
				<li class:active-tab={selected === 'Configs'}>
					<button
						class="tab-btn"
						on:click={() => {
							selected = 'Configs';
						}}
					>
						配置
					</button>
				</li>
			</ul>
		</nav>
		<div>
			<a
				href="https://ever-xyz.feishu.cn/wiki/wikcnf3cKXdQGqiIiC3Ld7NS5Ud"
			>
				<img src={doc_logo} alt="文档" width="20px" height="20px" />
			</a>
		</div>
	</header>
	<div class="content">
		<div class="api">
			<ever-3d id="api" filename="init.stp" url="asset.e3dx" />
		</div>

		{#if selected === 'Basic'}
			<Basic
				bind:instance={api_instance}
				toggleApiAnno3D={(anno) => {
					if (api_instance.startAnno3D) {
						api_instance.startAnno3D(anno);
					}
				}}
				printApiAnno3D={() => {
					console.log(api_instance?.getAnno3DPins());
				}}
				setApiTheme={(light) => {
					api_instance?.changeTheme(light ? 'light' : 'dark');
				}}
				takeApiPhoto={() => {
					return api_instance?.takePhoto();
				}}
				setApiLanguage={(lang) => {
					api_instance?.changeLanguage(lang);
				}}
				printMeasureList={() => {
					console.log(api_instance?.getMeasureList());
				}}
			/>
		{:else if selected === 'Files'}
			<Files
				apiOpenFile={(file) => {
					api_instance?.openFiles([file]);
				}}
			/>
		{:else}
			<Config
				updateApiConfig={(updated_config) => {
					api_instance?.config(updated_config);
				}}
			/>
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
		border-bottom-color: #c465fa50;
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
		background: #3d83ff50;
		border-radius: 0.25rem;
	}

	.content {
		margin-top: 5px;
	}

	.api {
		height: 65vh;
		width: calc(65vh * 1.5);
		margin-bottom: 5px;
	}

	/* add some styles to beautify push buttons */
</style>
