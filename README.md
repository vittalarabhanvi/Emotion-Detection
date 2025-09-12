# Emotion Detection

A short description of your project — what it does and why it exists.

---

<!-- MODEL-DOWNLOAD-NOTE -->
> **Note:** A large model file (> 1 GB) was removed from this repository to keep the Git history small and the repo fast to clone.
> The model can be downloaded separately. See **Download the model** below.

---

## Getting started

Install dependencies and run the development server:

```bash
# install deps (example — replace with your package manager)
npm install

# run dev server
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev


Open [http://localhost:3000](http://localhost:3000) in your browser.

You can start editing the page at `app/page.tsx` — the app auto-reloads.

---

## Download the model

The model file is **not** stored in the repo. You can download it into `models/` using the included script:

```bash
# make the script executable (once)
chmod +x scripts/download_and_setup_model.sh

# run the script (downloads file to models/large_model.bin)
./scripts/download_and_setup_model.sh
```

Manual Google Drive link (ensure the file is shared appropriately):
`https://drive.google.com/file/d/17f1Q2OT6MFxMiTiSWlYRwDY25OceEjeF/view`

---

## Where to put the model

Place the downloaded model at:

```
models/large_model.bin
```

---

## Prevent accidental commits

Add the following (already recommended) entries to `.gitignore` to avoid committing large model files:

```
# ignore large model files
/models/
/*.bin
*.pt
*.ckpt
```

---

## Alternatives / recommendations

If you want a more robust workflow for large models consider:

* **Git LFS** — version large files while keeping Git history small.
* **Cloud storage** — upload to S3, Google Cloud Storage, Azure Blob and fetch from CI/CD or at runtime.
* **Hugging Face Hub** — good option for machine-learning models and public releases.
* Provide the model as a separate GitHub Release asset or a signed download.

---

## Suggested commit message

```
chore: remove large model file (>1GB) and add download instructions + script
```

---

## Learn more

* Next.js docs: [https://nextjs.org/docs](https://nextjs.org/docs)
* Deploy on Vercel: [https://vercel.com/new](https://vercel.com/new)

---
