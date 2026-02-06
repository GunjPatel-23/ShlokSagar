#!/usr/bin/env python3
"""
start_servers.py

Starts three dev servers concurrently:
- backend (backend-shloksagar) on PORT=3000
- public frontend (public-shloksagar) on PORT=8080
- admin dashboard (admin-shloksagar) on PORT=3001

Usage:
    python start_servers.py

The script streams stdout/stderr from each process and shuts them down cleanly on Ctrl+C.
"""
import os
import subprocess
import threading
import signal
import sys
import shutil
from typing import Dict, List

ROOT = os.path.dirname(__file__)


def kill_port(port: int):
    """Kill any process using the specified port on Windows"""
    try:
        # Get process ID using port
        result = subprocess.run(
            f"powershell -Command \"Get-NetTCPConnection -LocalPort {port} -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess\"",
            capture_output=True,
            text=True,
            shell=True
        )
        if result.stdout.strip():
            pids = result.stdout.strip().split('\n')
            for pid in pids:
                pid = pid.strip()
                if pid:
                    subprocess.run(f"taskkill /F /PID {pid}", shell=True, capture_output=True)
                    print(f"Killed process {pid} on port {port}")
    except Exception as e:
        pass  # Port not in use
SERVERS = [
    {
        "name": "backend",
        "cwd": os.path.join(ROOT, "backend-shloksagar"),
        "cmd": ["npm", "run", "dev"],
        "env": {"PORT": "3000"},
    },
    {
        "name": "public",
        "cwd": os.path.join(ROOT, "public-shloksagar"),
        "cmd": ["npm", "run", "dev"],
        "env": {"PORT": "8080"},
    },
    {
        "name": "admin",
        "cwd": os.path.join(ROOT, "admin-shloksagar"),
        "cmd": ["npm", "run", "dev"],
        "env": {"PORT": "3001"},
    },
]

PROCESS_LIST: List[subprocess.Popen] = []
THREADS: List[threading.Thread] = []


def stream_output(proc: subprocess.Popen, prefix: str):
    try:
        if proc.stdout is None:
            return
        for line in iter(proc.stdout.readline, ""):
            if not line:
                break
            sys.stdout.write(f"[{prefix}] {line}")
    except Exception:
        pass


def start_server(server: Dict):
    env = os.environ.copy()
    env.update(server.get("env", {}))

    # Start process
    # Use a shell command string for better Windows compatibility
    cmd_str = " ".join(server["cmd"]) if isinstance(server.get("cmd"), (list, tuple)) else server.get("cmd")
    try:
        proc = subprocess.Popen(
            cmd_str,
            cwd=server["cwd"],
            env=env,
            stdout=subprocess.PIPE,
            stderr=subprocess.STDOUT,
            text=True,
            bufsize=1,
            shell=True,
        )
    except FileNotFoundError as e:
        print(f"Failed to start {server['name']}: {e}")
        return
    PROCESS_LIST.append(proc)

    t = threading.Thread(target=stream_output, args=(proc, server["name"]), daemon=True)
    t.start()
    THREADS.append(t)
    print(f"Started {server['name']} (pid={proc.pid}) in {server['cwd']}")


def shutdown(signum=None, frame=None):
    print("Shutting down servers...")
    for p in PROCESS_LIST:
        try:
            p.terminate()
        except Exception:
            pass
    # Give processes a moment, then kill if still alive
    for p in PROCESS_LIST:
        try:
            p.wait(timeout=5)
        except Exception:
            try:
                p.kill()
            except Exception:
                pass
    print("All servers stopped. Goodbye.")
    sys.exit(0)


def main():
    # Kill lingering processes on required ports
    print("Checking for lingering processes...")
    kill_port(3000)  # Backend
    kill_port(3001)  # Admin
    
    # Validate directories
    for s in SERVERS:
        if not os.path.isdir(s["cwd"]):
            print(f"Error: directory not found: {s['cwd']}")
            return

    # Clear Next.js cache for admin
    admin_next_cache = os.path.join(ROOT, "admin-shloksagar", ".next")
    if os.path.exists(admin_next_cache):
        print(f"Clearing Next.js cache: {admin_next_cache}")
        try:
            shutil.rmtree(admin_next_cache)
        except Exception as e:
            print(f"Warning: Could not clear cache: {e}")

    # Setup signal handlers
    signal.signal(signal.SIGINT, shutdown)
    signal.signal(signal.SIGTERM, shutdown)

    # Start servers
    for s in SERVERS:
        start_server(s)

    # Wait on processes
    try:
        while True:
            alive = any((p.poll() is None) for p in PROCESS_LIST)
            if not alive:
                print("One or more servers exited. Shutting down remaining processes.")
                shutdown()
            # sleep in small increments
            signal.pause()
    except AttributeError:
        # Windows: signal.pause may not be available, fallback to loop
        try:
            import time
            while True:
                alive = any((p.poll() is None) for p in PROCESS_LIST)
                if not alive:
                    print("One or more servers exited. Shutting down remaining processes.")
                    shutdown()
                time.sleep(1)
        except KeyboardInterrupt:
            shutdown()


if __name__ == "__main__":
    main()
