const config = {
	lang: 'zh',
	width: '100%',
	height: '100%',
	scale: 1,
	renderMode: 'flat',
	sceneType: 'default',
	viewType: 'evercraft',
	highlightedOnClick: true,
	zoomAble: true,
	progressVisible: true,
	preserveDrawingBuffer: true,
	toolbar: {
		enabled: true,
		tree: true,
		section: true,
		explode: true,
		measure: {
			enabled: true,
			properties: {
				boundary: true,
				thick: true,
				length: true,
				distance: true,
				radius: true,
				angle: true,
				entity: true
			}
		},
		view: true,
		render: true,
		projection: true,
		fullscreen: true,
		theme: true,
		compass: true
	},
	cache: {
		enabled: true,
		key: 'url',
		database: 'EverApi3D'
	},
	logo: {
		enabled: false,
		width: '80px',
		height: 'auto',
		src: '',
		href: 'https://evercraft.co'
	},
	customStyle: {
		backgroundColor: undefined,
		backgroundOpacity: undefined
	},
	customText: {
		zh: {
			menu: {
				single: '单独显示',
				all: '全部显示',
				hide: '隐藏部件',
				center: '视图居中',
				opacity: {
					enable: '透明显示',
					disable: '取消透明'
				}
			},
			toolbar: {
				tree: {
					label: '结构树'
				},
				section: {
					label: '剖切',
					title: '剖切面'
				},
				explode: {
					label: '爆炸',
					title: '爆炸'
				},
				measure: {
					label: '测量',
					title: '测量',
					properties: {
						boundary: '包围盒',
						thick: '壁厚',
						length: '棱边长度',
						distance: '距离',
						radius: '直径/半径',
						angle: '平面夹角',
						entity: '体积/表面积',
						unit: '单位'
					}
				},
				boundary: {
					label: '边界'
				},
				view: {
					label: '视图',
					title: '切换视图',
					properties: {
						front: '前视图',
						rear: '后视图',
						left: '左视图',
						right: '右视图',
						top: '上视图',
						bottom: '下视图',
						isometric: '轴测图'
					}
				},
				render: {
					label: '渲染',
					properties: {
						wireframe: '线框',
						flat: '着色',
						flatlines: '线框着色'
					}
				},
				projection: {
					label: '投影',
					properties: {
						orthogonal: '正交投影',
						perspective: '透视投影'
					}
				}
			}
		}
	}
};

class File {
	private _path: string;
	private _uuid: string;

	constructor(path: string) {
		this._path = path;
		this._uuid = '';
	}

	private _loadCacheUuid(): string {
		// 在我们这个例子中，我们将 uuid 保存在浏览器的localStorage中，所以我们需要从localStorage中读取
		return localStorage.getItem(this._path) as string;
	}

	private _saveCacheUuid(): void {
		// 在我们这个例子中，我们将 uuid 保存在浏览器的localStorage中
		// 这里简单起见，我们直接使用文件的路径作为key
		localStorage.setItem(this._path, this._uuid);
	}

	get uuid(): string {
		return this._uuid;
	}

	set uuid(value: string) {
		this._uuid = value;
	}

	public checkUuid(): boolean {
		return this._uuid !== '';
	}

	get path(): string {
		return this._path;
	}
}

const files = [
	new File('src/lib/data.ts'),
	new File('src/lib/data.ts'),
	new File('src/lib/data.ts')
];

export { config, files };
