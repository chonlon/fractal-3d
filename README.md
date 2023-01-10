# Fractal 3d Demo

这个仓库是一个关于如何使用 Fractal 3d 的示例。


## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.


# 使用帮助

## 运行
首先安装依赖： `npm install` (or `pnpm install` or `yarn`)，
然后启动开发服务器：

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## 一些说明

页面入口是 `src/routes/+page.svelte`；在这里你可以看到如何初始化以及使用 Fractal 3d api。

启动后，你在页面会看到 3 个 tab：
- ‘功能’ 对应 `src/lib/Basic.svelte`
- ‘文件’ 对应 `src/lib/File.svelte`
- ‘配置’ 对应 `src/lib/Config.svelte`
