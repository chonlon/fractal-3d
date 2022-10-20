<script lang="ts">
	export let toggleApiAnno3D: (toggle: boolean) => void;
	export let printApiAnno3D: () => void;
	export let setApiTheme: (light: boolean) => void;
	export let takeApiPhoto: () => string;
	export let setApiLanguage: (lang: string) => void;

	let anno3d = false;
	let lightTheme = false;

	let screenURL = '';
</script>

<div>
	<button
		on:click={() => {
			anno3d = !anno3d;
			toggleApiAnno3D(anno3d);
		}}
	>
		{anno3d ? '关闭' : '打开'}3D 标注
	</button>

	<button on:click={printApiAnno3D}>打印 3D 标注</button>
	<button
		on:click={() => {
			setApiTheme(lightTheme);
			lightTheme = !lightTheme;
		}}>切换主题</button
	>
	<button
		on:click={() => {
			screenURL = takeApiPhoto();
			console.log(screenURL);
		}}>截图</button
	>
	<button
		on:click={() => {
			setApiLanguage('en');
		}}
		>设置英文
	</button>
	<button
		on:click={() => {
			setApiLanguage('zh');
		}}
		>设置中文
	</button>

	<img src={screenURL} alt="" style="width: 300px" />
</div>
