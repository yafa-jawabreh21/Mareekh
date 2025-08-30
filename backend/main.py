from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
import pathlib, json

app = FastAPI(title="Mareekh Contractors API", version="1.0")

# CORS: السماح لأي مصدر (لتطوير/اختبار)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# المجلدات
BASE_DIR = pathlib.Path(__file__).parent
FRONTEND_DIR = BASE_DIR.parent / "frontend"
DATA_DIR = BASE_DIR / "data"

# دالة تحميل ملفات JSON
def load_json(name: str):
    p = DATA_DIR / name
    if p.exists():
        return json.loads(p.read_text(encoding="utf-8"))
    return {"error": f"{name} not found"}

# Serve index.html على /
@app.get("/")
def root():
    index_file = FRONTEND_DIR / "index.html"
    if index_file.exists():
        return FileResponse(index_file)
    return {"error": "index.html not found in frontend folder"}

# Mount ملفات ثابتة
app.mount("/assets", StaticFiles(directory=FRONTEND_DIR / "assets"), name="assets")
app.mount("/frontend", StaticFiles(directory=FRONTEND_DIR), name="frontend_root")

# API Routes
@app.get("/api/health")
def health():
    return {"ok": True, "service": "mareekh-contractors", "version": "1.0"}

@app.get("/api/projects")
def projects():
    return JSONResponse(load_json("projects.json"))

@app.get("/api/boq")
def boq():
    return JSONResponse(load_json("boq.json"))

@app.get("/api/evm")
def evm():
    return JSONResponse(load_json("evm.json"))

@app.get("/api/procurements")
def procurements():
    return JSONResponse(load_json("procurements.json"))
