"""
Cross-Platform Launcher for Yojana Sahayak.
Runs both the FastAPI backend and Next.js frontend concurrently.
"""

import sys
import os
import subprocess
import time
import signal

def run_both():
    base_dir = os.path.dirname(os.path.abspath(__file__))
    backend_dir = os.path.join(base_dir, "backend")
    frontend_dir = os.path.join(base_dir, "frontend")

    python_executable = os.path.join(backend_dir, "venv", "Scripts", "python.exe") if sys.platform == "win32" else os.path.join(backend_dir, "venv", "bin", "python")
    uvicorn_executable = os.path.join(backend_dir, "venv", "Scripts", "uvicorn.exe") if sys.platform == "win32" else os.path.join(backend_dir, "venv", "bin", "uvicorn")

    print("==========================================================")
    print("  Launching Yojana Sahayak (योजना सहायक)")
    print("==========================================================")

    # 1. Launch FastAPI Backend
    print("\n[1/2] Starting FastAPI Backend on http://127.0.0.1:8000 ...")
    backend_env = os.environ.copy()
    backend_env["PYTHONPATH"] = backend_dir
    backend_proc = subprocess.Popen(
        [uvicorn_executable, "app.main:app", "--host", "127.0.0.1", "--port", "8000"],
        cwd=backend_dir,
        env=backend_env
    )

    time.sleep(2)

    # 2. Launch Next.js Frontend
    print("[2/2] Starting Next.js Frontend on http://localhost:3000 ...")
    npm_cmd = "npm.cmd" if sys.platform == "win32" else "npm"
    frontend_proc = subprocess.Popen(
        [npm_cmd, "run", "dev"],
        cwd=frontend_dir
    )

    print("\n[SUCCESS] Yojana Sahayak is actively running!")
    print("  -> Frontend: http://localhost:3000")
    print("  -> Backend Swagger API: http://127.0.0.1:8000/docs")
    print("Press Ctrl+C to terminate both servers.\n")

    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        print("\nStopping Yojana Sahayak servers...")
        backend_proc.terminate()
        frontend_proc.terminate()
        print("Shutdown complete.")

if __name__ == "__main__":
    run_both()
