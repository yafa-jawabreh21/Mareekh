# Mareekh Contractors — Plain HTML/CSS/JS + Python Backend (No Docker/Vite/React)

## Quick Start

### 1) Backend (Python)
```bash
cd backend
python -m venv .venv
# Windows: .venv\Scripts\pip install -r requirements.txt
# Linux/Mac: .venv/bin/pip install -r requirements.txt

# Run the API
# Windows: .venv\Scripts\uvicorn main:app --host 0.0.0.0 --port 8000 --reload
# Linux/Mac: .venv/bin/uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

### 2) Frontend
- Option A (الأبسط): افتح `frontend/index.html` مباشرة في المتصفح، وسيطلب الـ API من `http://localhost:8000/api`.
- Option B: شغّل خادماً بسيطاً من `frontend`:
```bash
# من داخل مجلد frontend
python -m http.server 5173
# ثم افتح http://localhost:5173
```

### ضبط عنوان الـ API
- عدّل الملف: `frontend/config.js`
- القيمة الافتراضية:
```js
window.APP_CONFIG = { API_BASE: "http://localhost:8000/api" };
```

---

## هيكل المجلدات
- **frontend/**: HTML + CSS + JS بدون أي أدوات بناء
- **backend/**: FastAPI خفيفة مع بيانات تجريبية
- **run_all.sh / run_all.bat**: سكربتات تجهيز وتشغيل سريعة (اختيارية)

> هذا قالب تشغيلي مؤسسي، سهل للنشر على أي خادم رخيص أو جهاز محلي.
