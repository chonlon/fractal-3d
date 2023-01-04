<script lang="ts">
	import { onMount } from 'svelte';

	export let toggleApiAnno3D: (toggle: boolean) => void;
	export let printApiAnno3D: () => void;
	export let setApiTheme: (light: boolean) => void;
	export let takeApiPhoto: () => string;
	export let setApiLanguage: (lang: string) => void;
	export let printMeasureList: () => void;

	export let instance: any;

	let anno3d = false;
	let lightTheme = false;
	let printMeasures = false;
	let printAnno = false;

	let screenURL = '';

	function measurePrint(data: any) {
		if (printMeasures) {
			console.log(data);
		}
	}

	function annoPrint(data: any) {
		if (printAnno) {
			console.log(data);
		}
	}

	$: {
		// 这里是 svelte 的变量监听
		// 此处的作用是，当 外面传入的 instance 有效或者变化时，重新绑定事件
		if (instance) {
			instance.on('rendered', () => {
				console.log('rendered');
			});
			instance.on('addMeasure', measurePrint);
			instance.on('removeMeasure', measurePrint);
			instance.on('updateMeasure', measurePrint);

			instance.on('addAnnotation', annoPrint);
			instance.on('removeAnnotation', annoPrint);
			instance.on('updateAnnotation', annoPrint);
			instance.on('clickAnnotation', annoPrint);
			instance.on('closeAnnotation', annoPrint);

			window.ins = instance;
		}
	}
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
	<button
		on:click={() => {
			printMeasures = !printMeasures;
		}}
	>
		开/关测量事件打印
	</button>
	<button
		on:click={() => {
			printAnno = !printAnno;
		}}
	>
		开/关标注事件打印
	</button>
	<button
		on:click={() => {
			printMeasureList();
		}}
	>
		打印所有测量
	</button>

	<img src={screenURL} alt="" style="width: 300px" />
</div>
