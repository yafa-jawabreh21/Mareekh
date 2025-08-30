#!/usr/bin/env bash
set -e
cd "$(dirname "$0")"
echo "[1/3] Creating venv..."
python -m venv backend/.venv
echo "[2/3] Installing backend deps..."
backend/.venv/bin/pip install -r backend/requirements.txt
echo "[3/3] Starting backend on http://0.0.0.0:8000 ..."
backend/.venv/bin/uvicorn main:app --host 0.0.0.0 --port 8000 --reload
