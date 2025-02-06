# メモアプリケーション - Breeze Note

このリポジトリは、Udemyの講座で使用するメモアプリケーションのソースコードです。React、TypeScript、Firebase を使用したモダンなWebアプリケーションの開発方法を学ぶことができます。

## 必要な環境

以下のソフトウェアをインストールする必要があります：

1. **Node.js (バージョン 18.0.0 以上)**
   - インストール方法：
     - Windows: [Node.js公式サイト](https://nodejs.org/)からインストーラーをダウンロードしてインストール
     - Mac: Homebrewを使用してインストール: `brew install node`
     - [Node Version Manager (nvm)](https://github.com/nvm-sh/nvm)を使用してインストールすることも推奨します

2. **Git**
   - インストール方法：
     - Windows: [Git for Windows](https://gitforwindows.org/)からインストーラーをダウンロード
     - Mac: `brew install git`

3. **コードエディタ**
   - 推奨: [Visual Studio Code](https://code.visualstudio.com/)
   - 必要な拡張機能:
     - ESLint
     - Prettier
     - TypeScript and JavaScript Language Features

## プロジェクトのセットアップ

1. **リポジトリのクローン**
   ```bash
   git clone https://github.com/gakushiai/memo-flutter-breeze
   cd memo-flutter-breeze
   ```

2. **依存関係のインストール**
   ```bash
   npm install
   ```

3. **環境変数の設定**
   - `.env.example` ファイルを `.env` にコピーして、必要な環境変数を設定
   ```bash
   cp .env.example .env
   ```
   - Firebaseの設定値を `.env` ファイルに記入
   ```
   VITE_FIREBASE_API_KEY=your-api-key
   VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain
   VITE_FIREBASE_PROJECT_ID=your-project-id
   VITE_FIREBASE_STORAGE_BUCKET=your-storage-bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
   VITE_FIREBASE_APP_ID=your-app-id
   ```

4. **開発サーバーの起動**
   ```bash
   npm run dev
   ```
   - ブラウザで `http://localhost:XXXX` を開くと、アプリケーションが表示されます
   XXXXはポート番号です。ターミナル上で指定されます。

## 主な機能

- ユーザー認証（サインアップ/ログイン）
- メモの作成、編集、削除
- リアルタイムデータ同期
- レスポンシブデザイン

## 使用している主な技術

- **フロントエンド**
  - React 18
  - TypeScript
  - Tailwind CSS
  - shadcn/ui

- **バックエンド/インフラ**
  - Firebase Authentication
  - Cloud Firestore
  - Vite (開発環境)

## デプロイ方法（Netlify）

1. **Netlifyアカウントの作成**
   - [Netlify](https://www.netlify.com/)にアクセスし、アカウントを作成
   - GitHubアカウントでサインアップすることを推奨

2. **プロジェクトのデプロイ**
   - Netlifyダッシュボードから「Add new site」→「Import an existing project」を選択
   - GitHubリポジトリと連携
   - 以下のビルド設定を行う：
     - Build command: `npm run build`
     - Publish directory: `dist`
     - Node version: `18`

3. **環境変数の設定**
   - Netlifyダッシュボードで「Site settings」→「Environment variables」を選択
   - 以下の環境変数を追加（`.env`ファイルと同じ値）：
     ```
     VITE_FIREBASE_API_KEY
     VITE_FIREBASE_AUTH_DOMAIN
     VITE_FIREBASE_PROJECT_ID
     VITE_FIREBASE_STORAGE_BUCKET
     VITE_FIREBASE_MESSAGING_SENDER_ID
     VITE_FIREBASE_APP_ID
     ```

4. **デプロイの確認**
   - 自動的にデプロイが開始されます
   - デプロイが完了すると、`https://your-site-name.netlify.app`のURLでアクセス可能
   - GitHubリポジトリにプッシュするたびに自動的にデプロイされます

## トラブルシューティング

1. **`npm install` でエラーが発生する場合**
   - Node.jsのバージョンが18.0.0以上であることを確認
   ```bash
   node -v
   ```
   - パッケージマネージャーのキャッシュをクリア
   ```bash
   npm cache clean --force
   ```

2. **開発サーバーが起動しない場合**
   - ポートXXXXが他のプロセスで使用されていないか確認
   - すべての依存関係が正しくインストールされているか確認

3. **Firebaseの接続エラー**
   - `.env` ファイルの設定値が正しいか確認
   - Firebaseコンソールで該当するプロジェクトの設定を確認
   - Netlifyの環境変数が正しく設定されているか確認

4. **Netlifyデプロイのエラー**
   - ビルドログを確認（「Deploys」タブから確認可能）
   - Node.jsバージョンが18以上に設定されているか確認
   - 環境変数が正しく設定されているか確認
   - デプロイ設定（ビルドコマンドやパブリッシュディレクトリ）が正しいか確認

## サポート

質問や問題がある場合は、以下の方法でサポートを受けることができます：

1. Udemyのコースページでの質問
2. このリポジトリのIssuesセクション

## ライセンス

このプロジェクトはMITライセンスの下で公開されています。
