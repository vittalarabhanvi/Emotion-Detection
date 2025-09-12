#!/usr/bin/env bash
set -euo pipefail

# === CONFIG ===
FILE_ID="17f1Q2OT6MFxMiTiSWlYRwDY25OceEjeF"   # Google Drive file id from your link
DEST="models/large_model.bin"                # where the file will be saved
GITIGNORE=".gitignore"
README="README.md"
MARKER="<!-- MODEL-DOWNLOAD-NOTE -->"
# ==============

echo "→ Preparing to download model to: $DEST"

mkdir -p "$(dirname "$DEST")"

# install gdown if missing
if ! command -v gdown >/dev/null 2>&1; then
  echo "→ gdown not found — installing with pip (user)"
  if command -v pip3 >/dev/null 2>&1; then
    pip3 install --user gdown
  elif command -v pip >/dev/null 2>&1; then
    pip install --user gdown
  else
    echo "ERROR: pip not found. Please install pip or gdown and re-run this script."
    exit 1
  fi
  export PATH="$HOME/.local/bin:$PATH"
fi

echo "→ Downloading from Google Drive (file id: $FILE_ID) ..."
gdown --id "$FILE_ID" -O "$DEST"
echo "✓ Download finished: $DEST"

# update .gitignore (idempotent)
if [ ! -f "$GITIGNORE" ] || ! grep -q "/models/" "$GITIGNORE" 2>/dev/null; then
  echo "→ Adding models/ ignore entries to $GITIGNORE"
  cat >> "$GITIGNORE" <<'EOF'

# ignore large model files
/models/
/*.bin
*.pt
*.ckpt
EOF
  echo "✓ Updated $GITIGNORE"
else
  echo "→ $GITIGNORE already contains models/ entry — skipping"
fi

# append README note (idempotent)
if [ ! -f "$README" ]; then
  echo "→ $README not found — creating it"
  echo "# Project" > "$README"
fi

if ! grep -q "$MARKER" "$README" 2>/dev/null; then
  echo "→ Appending model-download note to $README"
  cat >> "$README" <<EOF

$MARKER
> **Note:** The large model file was removed from the repository ( > 1 GB ).  
> You can download it separately by running:
>
> ```bash
> chmod +x scripts/download_and_setup_model.sh
> ./scripts/download_and_setup_model.sh
> ```
>
> Manual link (Google Drive): https://drive.google.com/file/d/17f1Q2OT6MFxMiTiSWlYRwDY25OceEjeF/view
EOF
  echo "✓ README updated"
else
  echo "→ README already contains model-download note — skipping"
fi

echo
echo "Suggested git commit message:"
echo "  chore: remove large model file (>1GB) and add download instructions + script"
echo
echo "All done. If you plan to share the repo publicly, ensure the Drive file is set to 'Anyone with the link' or move it to a public hosting location."
