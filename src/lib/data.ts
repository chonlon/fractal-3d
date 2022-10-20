import axios from 'axios';

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

class FracalFile {
	private _name: string;
	private _uuid: string;
	private _url: string;
	private _status: string;

	get url(): string {
		return this._url;
	}

	get status(): string {
		return this._status;
	}

	constructor(name: string) {
		this._name = name;
		this._uuid = '';
		this._url = '';
		this._status = '';
	}

	static fromJSON(json: any): FracalFile {
		const file = new FracalFile(json._name);
		file._uuid = json._uuid;
		file._url = json._url;
		file._status = json._status;
		return file;
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

	get name(): string {
		return this._name;
	}

	async uploadFile(file: File, onProgress: (progress: number) => void) {
		const formData = new FormData();
		formData.append('file', file);
		try {
			// 调用 uploadFile 方法，将包装好的 formData 上传到服务器
			const { data } = await axios.post('https://api.evercraft.co/3d/v1/file/upload', formData, {
				onUploadProgress(e) {
					const { loaded, total } = e;
					if (total) {
						onProgress((loaded / total) * 100);
					}
				}
			});

			const { filename, uuid } = data.data;
			this._uuid = uuid;
		} catch (error) {
			console.error(error);
		}
	}

	async pollingFileStatus() {
		// 使用 uploadFile 返回的 uuid 查询该文件的转换状态
		const { data } = await axios.get('https://api.evercraft.co/3d/v1/file', {
			params: { key: this._uuid }
		});

		const { status, url } = data;
		console.log(data);

		if (status === 'succeed') {
			this._url = `https://evercraft.co${url}`;
			this._status = 'succeed';
		} else if (status === 'pending' || status === 'running') {
			this._status = 'pending';
		} else {
			this._status = 'failed';
		}

		return this._status;
	}
}

export { config, FracalFile };
