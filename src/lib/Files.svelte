<script lang="ts">
	import { FracalFile } from './data';

	export let apiOpenFile: (file: { filename: string; url: string }) => void;

	let files: FracalFile[] = [];
	import { onMount } from 'svelte';

	async function uploadFile(e) {
		console.log(e);
		const file = e.target.files[0];
		let fracal_file = new FracalFile(file.name);
		files = [...files, fracal_file];
		saveFiles();
		await fracal_file.uploadFile(file, (progress) => {
			console.log('uploading: ', progress, '%');
		});
		let timer = setInterval(async () => {
			let status = await fracal_file.pollingFileStatus();
			if (status !== 'pending' && status !== 'running') {
				clearInterval(timer);
			}
			files = [...files];
			saveFiles();
		}, 2000);
	}

	function openFile(file) {
		let _file = { filename: file.name, url: file.url };
		apiOpenFile(_file);
	}

	onMount(() => {
		// get files from local storage
		let saved_files = localStorage.getItem('files');
		if (saved_files) {
			let _files = JSON.parse(saved_files);
			// map to FracalFile array
			files = _files.map((f) => FracalFile.fromJSON(f));
		}
	});

	function saveFiles() {
		localStorage.setItem('files', JSON.stringify(files));
	}
</script>

<div>
	<button class="upload">
		<input type="file" id="file" style="display: none" on:change={uploadFile} />
		<label for="file">Upload file</label>
	</button>

	<div class="buttons">
		<p>历史文件</p>

		{#each files as file}
			<button
				class="file_button"
				on:click={() => openFile(file)}
				disabled={file.status !== 'succeed'}
			>
				{file.name}
			</button>
		{/each}
	</div>
</div>

<style>
	.buttons {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
	}

	.file_button {
		margin: 5px;
	}
</style>
