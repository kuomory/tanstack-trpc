# TanStack x tRPC

monorepoでSPAのWebアプリケーションを作成するテンプレート

## はじめかた

1. GitLabでこのテンプレートを使用してプロジェクトを作成
2. WSL上にclone
3. WSLに接続したVSCodeからcloneしたプロジェクトを開く
4. コンテナーで再度開く
5. データ初期化コマンド `pnpm api db:reset` を実行
6. `pnpm dev` で実行

## 概要

- 全般
  - 言語
    - [TypeScript](https://www.typescriptlang.org/)
  - パッケージマネージャー
    - [pnpm](https://pnpm.io/ja/)
  - RPCフレームワーク
    - [tRPC](https://trpc.io/)
  - バリデーション
    - [zod](https://zod.dev/)
- フロントエンド
  - 描画タイプ
    - SPA (Single Page Application)
  - フレームワーク
    - [React](https://ja.react.dev/)
  - ビルドツール
    - [Vite](https://ja.vitejs.dev/)
  - ライブラリ
    - ルーティング
      - [TanStack Router](https://tanstack.com/router/latest)
    - API通信の状態管理とキャッシュ
      - [TanStack Query](https://tanstack.com/query/latest)
    - フォーム管理
      - [TanStack Form](https://tanstack.com/form/latest)
    - CSSフレームワーク
      - [Mantine](https://mantine.dev/)
- バックエンド
  - フレームワーク
    - [Fastify](https://fastify.dev/)
  - ORM
    - [Prisma](https://www.prisma.io/)
  - 開発サーバー
    - [tsx](https://tsx.is/)
