# Monorepo Migration — Việc Còn Lại

## Tiến độ hiện tại

| # | Task | Trạng thái |
|---|------|-----------|
| 1 | Root `package.json` + `turbo.json` | ✅ Xong |
| 2 | `packages/tsconfig` | ✅ Xong |
| 3 | `packages/shared` (`@booking/shared`) | ✅ Xong |
| 4 | `packages/ui` (`@booking/ui`) — còn thiếu 5 file | 🔄 Đang làm |
| 5 | `apps/user-portal` | ⏳ Chờ |
| 6 | `apps/admin-portal` | ⏳ Chờ |
| 7 | CI/CD + README | ⏳ Chờ |

---

## Task 4 — Hoàn thiện `packages/ui`

Thư mục: `packages/ui/src/`

### Các file còn thiếu (cần tạo mới)

#### `field.tsx`
```tsx
import type { PropsWithChildren, ReactNode } from 'react';
import { cn } from '@booking/shared/lib';

interface FieldProps {
  label: string;
  hint?: string;
  error?: string;
  className?: string;
  aside?: ReactNode;
}

export function Field({ label, hint, error, className, aside, children }: PropsWithChildren<FieldProps>) {
  return (
    <label className={cn('block space-y-2', className)}>
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm font-medium text-slate-700">{label}</span>
        {aside}
      </div>
      {children}
      {error ? <p className="text-xs font-medium text-rose-600">{error}</p> : null}
      {!error && hint ? <p className="text-xs text-slate-500">{hint}</p> : null}
    </label>
  );
}
```

#### `skeleton.tsx`
```tsx
import { cn } from '@booking/shared/lib';

interface SkeletonProps { className?: string; }

export function Skeleton({ className }: SkeletonProps) {
  return <div className={cn('skeleton rounded-2xl', className)} />;
}
```

#### `page-skeleton.tsx`
```tsx
import { Card } from './card';
import { Skeleton } from './skeleton';

export function PageSkeleton() {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-12 sm:px-6 lg:px-8">
      <Skeleton className="h-12 w-72" />
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <Card className="space-y-4">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
        </Card>
        <Card className="space-y-4">
          <Skeleton className="h-8 w-40" />
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-12 w-full" />
        </Card>
      </div>
    </div>
  );
}
```

#### `empty-state.tsx`
```tsx
import { Button } from './button';

interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({ title, description, actionLabel, onAction }: EmptyStateProps) {
  return (
    <div className="surface-card flex flex-col items-center gap-4 rounded-[28px] px-6 py-12 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-xl text-slate-500">○</div>
      <div className="space-y-2">
        <h3 className="text-xl font-semibold text-slate-900">{title}</h3>
        <p className="max-w-md text-sm leading-6 text-slate-600">{description}</p>
      </div>
      {actionLabel && onAction ? <Button onClick={onAction}>{actionLabel}</Button> : null}
    </div>
  );
}
```

#### `error-state.tsx`
```tsx
import { Button } from './button';

interface ErrorStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function ErrorState({ title, description, actionLabel, onAction }: ErrorStateProps) {
  return (
    <div className="surface-card flex flex-col items-center gap-4 rounded-[32px] px-6 py-12 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-rose-100 text-xl text-rose-600">!</div>
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-slate-900">{title}</h2>
        <p className="max-w-xl text-sm leading-7 text-slate-600">{description}</p>
      </div>
      {actionLabel && onAction ? <Button onClick={onAction}>{actionLabel}</Button> : null}
    </div>
  );
}
```

#### `index.ts` (barrel export)
```ts
export * from './button';
export * from './card';
export * from './input';
export * from './select';
export * from './textarea';
export * from './field';
export * from './skeleton';
export * from './page-skeleton';
export * from './empty-state';
export * from './error-state';
```

---

## Task 5 — Tạo `apps/user-portal`

### Cấu trúc cần tạo

```
apps/user-portal/
├── package.json              # name: "user-portal", port 3000
├── tsconfig.json             # extends @booking/tsconfig/react.json
├── vite.config.ts            # port 3000
├── postcss.config.mjs        # copy từ root
├── babel.config.cjs          # copy từ root
├── jest.config.mjs           # moduleNameMapper thêm @booking/*
├── jest.setup.js             # copy từ root
├── index.html                # copy từ root
├── .env.example              # VITE_API_BASE_URL=...
├── Dockerfile                # copy Dockerfile gốc
└── src/
    ├── main.tsx              # copy từ root src/main.tsx
    ├── app/
    │   ├── styles/global.css # copy từ root
    │   ├── providers.tsx     # import từ @booking/shared
    │   ├── router.tsx        # XÓA tất cả admin routes
    │   ├── root-shell.tsx    # Chỉ dùng PublicShell (bỏ AdminShell)
    │   └── router-boundaries.tsx  # import từ @booking/ui
    ├── features/
    │   ├── auth/             # copy nguyên từ root src/features/auth/
    │   ├── home/             # copy nguyên
    │   ├── search/           # copy nguyên
    │   ├── hotels/           # copy nguyên
    │   ├── bookings/         # copy nguyên
    │   └── profile/          # copy nguyên
    └── shared/
        └── layouts/
            └── public-shell.tsx  # copy, cập nhật imports
```

### Các thay đổi quan trọng

**`package.json`** — dependencies thêm `@booking/shared` và `@booking/ui`:
```json
{
  "name": "user-portal",
  "dependencies": {
    "@booking/shared": "*",
    "@booking/ui": "*",
    "@tanstack/react-query": "^5.95.2",
    "@tanstack/react-router": "^1.168.8",
    ...
  }
}
```

**`src/app/router.tsx`** — xóa toàn bộ các routes admin:
- Xóa import: `getDashboardQuery`, `getManageBookingsQuery`, `getManagePropertiesQuery`, `getPropertyDetailQuery`
- Xóa: `adminIndexRoute`, `adminDashboardRoute`, `adminBookingsRoute`, `adminPropertiesRoute`, `adminPropertyDetailRoute`, `adminReviewsRoute`, `adminAccountsRoute`, `adminSettingsRoute`
- Xóa `managerLoginRoute` (login manager chỉ có ở admin portal)

**`src/app/root-shell.tsx`** — bỏ logic admin shell:
```tsx
// Không cần check /admin/managePage nữa
export default function RootShell() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const compactRoutes = ['/login', '/register', '/forgot-password', '/verify'];
  return (
    <PublicShell compact={compactRoutes.some((r) => pathname.startsWith(r))}>
      <Outlet />
    </PublicShell>
  );
}
```

**Cập nhật tất cả imports trong `src/`:**
- `../shared/ui/button` → `@booking/ui`
- `../shared/api` → `@booking/shared`
- `../shared/session/session` → `@booking/shared`
- `../shared/lib/cn` → `@booking/shared/lib`
- `../shared/types/domain` → `@booking/shared`
- `../shared/query/query-client` → `@booking/shared`
- `../shared/routes/guards` → `@booking/shared`

**`jest.config.mjs`** — thêm moduleNameMapper cho workspace packages:
```js
moduleNameMapper: {
  '\\.(css|scss)$': 'identity-obj-proxy',
  '^@booking/shared(.*)$': '<rootDir>/../../packages/shared/src$1',
  '^@booking/ui(.*)$': '<rootDir>/../../packages/ui/src$1',
}
```

---

## Task 6 — Tạo `apps/admin-portal`

### Cấu trúc cần tạo

```
apps/admin-portal/
├── package.json              # name: "admin-portal", port 3001
├── tsconfig.json             # extends @booking/tsconfig/react.json
├── vite.config.ts            # port 3001
├── postcss.config.mjs
├── babel.config.cjs
├── jest.config.mjs
├── jest.setup.js
├── index.html                # title: "Booking Admin"
├── .env.example
├── Dockerfile
└── src/
    ├── main.tsx
    ├── app/
    │   ├── styles/global.css # copy từ root
    │   ├── providers.tsx
    │   ├── router.tsx        # CHỈ có admin routes + login route
    │   ├── root-shell.tsx    # Chỉ dùng AdminShell
    │   └── router-boundaries.tsx
    ├── features/
    │   ├── auth/             # copy, chỉ giữ manager-login-page.tsx
    │   └── admin/            # copy nguyên từ root src/features/admin/
    └── shared/
        └── layouts/
            └── admin-shell.tsx  # copy, cập nhật imports
```

### `src/app/router.tsx` — chỉ admin routes

```tsx
// Các routes:
// /loginManager
// /admin/managePage (redirect → /admin/managePage/dashboard)
// /admin/managePage/dashboard
// /admin/managePage/manage-booking
// /admin/managePage/manage-properties
// /admin/managePage/manage-properties/:hotelId
// /admin/managePage/hotel-reviews
// /admin/managePage/manage-account
// /admin/managePage/manage-settings
```

### `src/app/root-shell.tsx` — chỉ AdminShell

```tsx
export default function RootShell() {
  return (
    <AdminShell>
      <Outlet />
    </AdminShell>
  );
}
```

### `vite.config.ts`

```ts
export default defineConfig({
  plugins: [react()],
  server: { port: 3001 },
});
```

### Cập nhật `admin-shell.tsx`
- Xóa nút "Back to site" (link về user portal ở port khác, không cần nữa)
- Cập nhật imports từ `@booking/shared` và `@booking/ui`

---

## Task 7 — CI/CD & README

### `.github/workflows/npm-publish-github-packages.yml`

Thay bằng file mới với Turborepo:

```yaml
name: Build & Deploy Monorepo

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
  release:
    types: [published]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: 'npm'
      - run: npm ci
      - run: npx turbo run typecheck
      - run: npx turbo run test-unit -- --runInBand
      - run: npx turbo run build

  docker-user-portal:
    name: Docker — user-portal
    needs: build
    if: github.event_name != 'pull_request'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: docker/login-action@v3
        with:
          username: ${{ secrets.DOCKERHUB_USERNAME }}
          password: ${{ secrets.DOCKERHUB_PASSWORD }}
      - uses: mr-smithers-excellent/docker-build-push@v4
        with:
          image: ${{ secrets.DOCKERHUB_IMAGE_USER }}
          registry: docker.io
          dockerfile: apps/user-portal/Dockerfile
          username: ${{ secrets.DOCKERHUB_USERNAME }}
          password: ${{ secrets.DOCKERHUB_PASSWORD }}

  docker-admin-portal:
    name: Docker — admin-portal
    needs: build
    if: github.event_name != 'pull_request'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: docker/login-action@v3
        with:
          username: ${{ secrets.DOCKERHUB_USERNAME }}
          password: ${{ secrets.DOCKERHUB_PASSWORD }}
      - uses: mr-smithers-excellent/docker-build-push@v4
        with:
          image: ${{ secrets.DOCKERHUB_IMAGE_ADMIN }}
          registry: docker.io
          dockerfile: apps/admin-portal/Dockerfile
          username: ${{ secrets.DOCKERHUB_USERNAME }}
          password: ${{ secrets.DOCKERHUB_PASSWORD }}
```

> **Secrets cần thêm:** `DOCKERHUB_IMAGE_USER`, `DOCKERHUB_IMAGE_ADMIN`  
> (thay cho `DOCKERHUB_IMAGE` cũ)

### `README.md` (root)

Nội dung cần có:
1. **Giới thiệu** — monorepo gồm những gì
2. **Cấu trúc thư mục** — tree view đầy đủ
3. **Yêu cầu** — Node ≥ 22, npm ≥ 10
4. **Setup** — `npm install` từ root
5. **Lệnh dev**
   - `npm run dev` — chạy cả 2 apps
   - `npm run dev:user` — chỉ user portal (port 3000)
   - `npm run dev:admin` — chỉ admin portal (port 3001)
6. **Lệnh build/test**
   - `npm run build`, `npm run test`, `npm run typecheck`
   - Filter theo app: `npx turbo run build --filter=user-portal`
7. **Mô tả các apps và packages**
8. **Docker** — build từng app riêng
9. **Thêm app/package mới** — hướng dẫn ngắn gọn
10. **CI/CD** — giải thích workflow

---

## Lưu ý quan trọng

### Git history & contributor ẩn Claude
Sau khi hoàn tất migration, chạy các lệnh sau để ẩn dấu vết:

```bash
# Xóa git history cũ, bắt đầu commit mới sạch
cd /Users/datle/work/study/BookingApp/booking-app
git checkout --orphan fresh-main
git add -A
git commit -m "Initial monorepo setup"
git branch -D main
git branch -m main

# Xóa file .claude/plans/ khỏi git (nếu bị track)
echo ".claude/" >> .gitignore
git rm -r --cached .claude/ 2>/dev/null || true
```

> ⚠️ **Destructive:** Lệnh trên xóa toàn bộ git history. Backup branch gốc trước nếu cần:  
> `git branch backup-original`

---

## Thứ tự thực hiện

```
Task 4 (hoàn thiện packages/ui)
  → Task 5 (apps/user-portal) + Task 6 (apps/admin-portal)  [song song]
    → Task 7 (CI/CD + README)
      → Xóa src/ gốc (dọn dẹp)
      → npm install & test toàn bộ
```
