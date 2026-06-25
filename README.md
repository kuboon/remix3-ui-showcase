# Remix 3 UI Showcase

`https://github.com/remix-run/remix/tree/main/template` の構成をベースにした、Remix 3 の theme / UI component ショーケースです。

## Features

- Remix 3 template shape (`app/actions`, `app/middleware`, `app/ui`, `server.ts`)
- light / dark theme token showcase
- button, badge, card, input, select, table などの UI component showcase
- GitHub Actions で typecheck / test / build
- GitHub Pages 向けの静的ビルド (`build/`, `404.html` を含む)

## Commands

```sh
npm install
npm run dev
npm run typecheck
npm test
npm run build
```

## GitHub Pages

GitHub Pages 用の base path は `PUBLIC_BASE_PATH` で切り替えます。

- local: 未設定 (`/`)
- GitHub Actions: `/${repository-name}`
