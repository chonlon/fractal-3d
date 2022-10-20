const config = {

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
    new File('src/lib/data.ts'),
];

export { config, files };

