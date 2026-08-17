# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

An estate/property management app ("estate-app"): a React + TypeScript frontend and a FastAPI backend. Firebase Auth handles login on the frontend, ID tokens are verified on the backend, Firestore is the database, and Backblaze B2 (S3-compatible) stores property/room images. UI copy and comments are in Japanese.

## Commands

### Frontend (repo root)
- `npm run dev` — start Vite dev server (expects backend at `http://127.0.0.1:8000`)
- `npm run build` — type-check (`tsc -b`) then build with Vite
- `npm run lint` — ESLint
- `npm run preview` — preview the production build

There is no frontend test runner configured.

### Backend (`backend/`)
- Python venv already exists at `backend/.venv`. Activate it before running backend commands: `source backend/.venv/bin/activate`
- Install deps: `pip install -r backend/requirements.txt`
- Run the API from `backend/`: `uvicorn app.main:app --reload` (serves on port 8000, matching the frontend's hardcoded API base URL)

There is no backend test suite configured.

## Architecture

### Frontend (`src/`)
- **Routing**: `src/App.tsx` defines all routes using `react-router-dom`, with path constants centralized in `src/routes/rouets.ts` (`ROUTES`, `REGISTER_NAV`, `PROPERTY_NAV`). Routes are nested: `/register` has building/room/owner sub-routes, `/property` has a list view and a `:id` detail layout with room/tenant sub-routes.
- **Auth**: `src/contexts/AuthContext.tsx` wraps Firebase Auth (`src/lib/firebase.ts`) in a React context (`user`, `loading`, `login`, `logout`). `src/componets/requireAuth/RequireAuth.tsx` gates the authenticated route tree in `App.tsx`, redirecting to `/login` when unauthenticated.
- **API calls**: `src/api/authFetch.ts` is the standard wrapper for calling the backend — it grabs the Firebase ID token off `auth.currentUser`, attaches it as a `Bearer` header, and throws on missing user / 401. All API modules under `src/api/` (e.g. `getProperties/`, `getRooms/`) call the backend through `authFetch` and hardcode the base URL `http://127.0.0.1:8000` per-file (no shared config/env var for this yet — follow the existing per-file pattern unless asked to refactor it).
- **Feature/page split**: `src/pages/` holds route-level page components (one directory per page/flow, e.g. `registerPage/buildingRegisterPage/`, `roomDetailPage/`). `src/features/properties/components/` holds reusable, non-route-specific components (property cards, room list/detail, search input) used across pages. Shared chrome (header, sidebar, layout, dialogs) lives under `src/componets/` (note: intentionally spelled without the second "n").
- Note the `src/componets/` directory name is a pre-existing typo (should be "components") — match it exactly when adding files there rather than introducing a second, correctly-spelled directory.

### Backend (`backend/app/`)
Layered structure per feature, consistently: **router → schema → service**.
- `main.py` wires up FastAPI, CORS (only `http://localhost:5173` is allowed), Firebase Admin init, and mounts routers from `app/routers/properties/`.
- `routers/properties/` — FastAPI route handlers (e.g. `room.py`, `buildingRegister.py`, `ownerRegister.py`, `getProperties/`, `getRooms/`). Handlers parse/validate input (often `multipart/form-data` with a JSON `payload` field plus `files: list[UploadFile]`), call into `service/`, and wrap business errors as `HTTPException`. They authenticate via `Depends(get_current_user)`.
- `schemas/` — Pydantic models (`RoomData`/`RoomCreateRequest`, `property.py`, `owner.py`) used to validate the JSON `payload` sent alongside file uploads.
- `service/` — business logic: Firestore reads/writes (via `core/firebase_admin.get_firebase_client()`) and image uploads (via `core/backblaze.get_b2_client()` + `service/*_image_service.py`, which stores objects at keys like `rooms/{room_id}/{uuid4()}.{ext}`).
- `dependencies/auth.py` — `get_current_user` verifies the Firebase `Bearer` ID token via `firebase_admin.auth.verify_id_token` and returns `{uid, email}`.
- `core/firebase_admin.py` — lazily initializes the Firebase Admin app using the service account JSON at `backend/secrets/estate-project-ca51b-firebase-adminsdk-fbsvc-fb866b857e.json` (gitignored) and exposes a Firestore client.
- `core/backblaze.py` — builds a boto3 S3 client pointed at Backblaze B2 using `B2_ENDPOINT_URL`, `B2_KEY_ID`, `B2_APPLICATION_KEY` env vars.
- Firestore is the system of record; document IDs are generated via `collection(...).document()` before write, and that ID is threaded through to image upload keys.

### Environment
- Frontend env vars (`.env`, gitignored): `VITE_FIREBASE_API_KEY`, `VITE_FIREBASE_APP_ID`, `VITE_FIREBASE_AUTH_DOMAIN`, `VITE_FIREBASE_MESSAGING_SENDER_ID`, `VITE_FIREBASE_PROJECT_ID`, `VITE_FIREBASE_STORAGE_BUCKET`.
- Backend env vars (loaded via `dotenv` in `main.py`): `B2_ENDPOINT_URL`, `B2_KEY_ID`, `B2_APPLICATION_KEY`, `B2_BUCKET_NAME`.
- The Firebase Admin service account JSON and the `backend/secrets/` credentials directory are gitignored — never commit or print their contents.

## 開発ルール

このプロジェクトでは既存の設計・責務分離（フロントは `pages`／`features`／`componets`／`api`／`hooks`、バックエンドは router → schema → service）を最優先する。新しいコードを書くときは以下を守ること。

### 既存コードの再利用を優先する
- 新しい処理を書く前に、必ず既存コードを検索し、同じ・類似の処理がすでにないか確認する（例: `src/api/`配下のAPI呼び出し、`src/componets/`の共通コンポーネント、`backend/app/service/`のビジネスロジックなど）。
- 既存の関数・コンポーネント・hooks・services・utilsで再利用できる場合は、同じ処理を新規に作らずそれを再利用する。
- 同じ責務の処理を複数箇所に重複実装しない（例: 画像アップロード処理は `service/*_image_service.py` に、認証付きfetchは `src/api/authFetch.ts` に集約されている。同等の処理を別ファイルに書き直さない）。
- 新しいファイルを作成する前に、既存ファイルで対応できないか確認する。対応できない場合のみ新規ファイルを作成する。

### 責務分離を守る
- 1つのファイルに複数の責務を詰め込まない。フロントエンドでは UI（`pages`/`features`/`componets`）・状態管理（`contexts`/hooks）・API通信（`src/api/`）・汎用処理（`src/lib`, mixin等）を分離し、バックエンドでは router（入出力・認証）・schema（バリデーション）・service（Firestore/Backblaze等のビジネスロジック）を分離する、既存の層構造を踏襲する。
- ファイルが肥大化する場合は、責務ごとに適切な既存ディレクトリ（`componets`/`features`/`service`/`schemas`など）へ分離する。既存の命名規則・フォルダ構成（例: `componets`という綴りを含む）に合わせ、独自の新しい構成ルールを持ち込まない。
- UI・状態管理・API通信・ビジネスロジック・汎用処理は、それぞれ適切な層に分離する（フロントエンド: UI=`pages`/`features`/`componets`、状態管理=`contexts`/hooks、API通信=`src/api`、汎用処理=`src/lib`・mixin。バックエンド: 入出力・認証=router、バリデーション=schema、ビジネスロジック=service）。1つの層に複数の関心事を混在させない。
- 命名規則・フォルダ構成だけでなく、既存の設計パターン（router→schema→service、Context+hooksによる状態管理など）も既存コードを優先し、新しいパターンを個人の判断で持ち込まない。

### スコープと状態管理
- グローバル変数は原則として使用しない。
- 状態やデータは可能な限り適切なスコープ（コンポーネントのローカルstate、`AuthContext`のような既存Context、hooksなど）に閉じ込め、必要以上に外へ露出させない。

### 変更方針の説明
- 既存の設計パターン（例: router→schema→serviceの分離、`authFetch`経由でのAPI通信、`ROUTES`/`REGISTER_NAV`等のルート定数の使い方）と異なる実装を行う場合は、その理由を説明する。
- 大規模な変更（複数ファイルにまたがる変更、既存の層構造やディレクトリ構成を変えるような変更）を行う前に、変更対象と変更方針を説明してから着手する。
- 依頼されていない不要なリファクタリングや、既存コードの変更を勝手に行わない。

### 既存コード変更時の設計意図の尊重
- 既存コードを変更する場合は、まずその実装がなぜそうなっているか（変更前の設計意図）を確認する。単に動作させることだけを目的にせず、既存の設計思想（router→schema→serviceの分離、Context+hooksによる状態管理など）を維持した変更を行う。

### コーディング前のチェックリスト
- コードを書き始める前に、次の3点を必ず確認する。
  1. 既存処理の再利用: 同じ・類似の処理がすでにないか、再利用できないか。
  2. 責務分離: これから書く処理がUI／状態管理／API通信／ビジネスロジック／汎用処理のどの層に属し、他の層と混在していないか。
  3. 変更範囲: 依頼された範囲を超えていないか、既存コードへの不要な変更を含んでいないか。

### セキュリティ
- Firebaseのサービスアカウント鍵、`B2_KEY_ID`/`B2_APPLICATION_KEY`などのAPIキー・秘密鍵・認証情報・IDトークンを、コードやログ出力（`print`/`console.log`等）に含めない。

### 実装後の確認
- 実装後は、可能な範囲で以下を実行し、問題がないことを確認する。
  - フロントエンド: `npm run lint`、`npm run build`
  - バックエンド: `backend/.venv`を有効化した上でのimport/起動確認など（テストスイートは現状未整備）
