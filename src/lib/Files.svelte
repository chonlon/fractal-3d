<script lang="ts">
	import { FractalFile } from './data';

	export let apiOpenFile: (file: { filename: string; url: string }) => void;

	let files: FractalFile[] = [];
	import { onMount } from 'svelte';

	async function uploadFile(e: Event) {
		const target = e.target as HTMLInputElement;
		if (!target.files) return;
		// 这里只上传第一个文件
		const file = target.files[0];
		let fractal_file = new FractalFile(file.name);
		files = [...files, fractal_file];
		saveFiles();
		await fractal_file.uploadFile(file, (progress) => {
			console.log('uploading: ', progress, '%');
		});
		let timer = setInterval(async () => {
			let status = await fractal_file.pollingFileStatus();
			if (status !== 'pending' && status !== 'running') {
				clearInterval(timer);
			}
			files = [...files];
			saveFiles();
		}, 2000);
	}

	function openFile(file: { name: string; url: string }) {
		let _file = { filename: file.name, url: file.url };
		apiOpenFile(_file);
	}

	onMount(() => {
		// get files from local storage
		let saved_files = localStorage.getItem('files');
		if (saved_files) {
			let _files = JSON.parse(saved_files);
			// map to FractalFile array
			files = _files.map((f: any) => FractalFile.fromJSON(f));
		}
	});

	function saveFiles() {
		localStorage.setItem('files', JSON.stringify(files));
	}
</script>

<div>
	<button class="upload">
		<input type="file" id="file" style="display: none" on:change={(e) => {uploadFile(e)}} />
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
