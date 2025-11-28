# GAS -> Vercel Auto Sync & Proxy

Repo ini:
- menyimpan `config/gas_url.txt`
- otomatis update `GAS_URL` environment di Vercel (via GitHub Actions)
- menyediakan proxy serverless di `/api/gas` untuk meneruskan request ke GAS

## Cara pakai (singkat)
1. Isi `config/gas_url.txt` dengan URL GAS (sudah diisi).
2. Push repo ke GitHub.
3. Atur GitHub Secrets:
   - `VERCEL_TOKEN` (wajib) — create token di Vercel Account -> Tokens
   - `VERCEL_PROJECT` (opsional) — project id `prj_...` (jika ingin override default)
   - `VERCEL_DEPLOY_HOOK` (opsional) — URL deploy hook untuk trigger redeploy
4. Hubungkan repo ke Vercel (New Project → From Git → pilih repo). Setelah terhubung, setiap push → Vercel akan deploy.
5. Untuk sinkron GAS otomatis: update `config/gas_url.txt` → push → Actions akan update Vercel env (dan memicu deploy jika hook diset).

## Endpoint proxy
Setelah deploy, kamu bisa panggil:
`https://<your-vercel-domain>/api/gas`

## Troubleshoot singkat
- 404 dari Vercel API pada workflow → cek `VERCEL_PROJECT` & `VERCEL_TOKEN` (token harus dibuat oleh akun yang punya akses ke project).
- Env baru berlaku pada deployment baru → pakai deploy hook atau trigger deploy manual.
