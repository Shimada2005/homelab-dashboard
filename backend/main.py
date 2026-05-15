from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import psutil
import time
import platform
import socket

prev_read = 0
prev_write = 0

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_local_ip():
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)

    try:
        s.connect(("8.8.8.8", 80))
        ip = s.getsockname()[0]
    except:
        ip = "Unavailable"
    finally:
        s.close()

    return ip

@app.get("/status")
def get_status():
    
    network = psutil.net_io_counters()
    
    global prev_read, prev_write

    disk_io = psutil.disk_io_counters()

    read_now = disk_io.read_bytes
    write_now = disk_io.write_bytes

    read_speed = read_now - prev_read
    write_speed = write_now - prev_write

    prev_read = read_now
    prev_write = write_now
    
    return {
        "cpu": psutil.cpu_percent(),
        "memory": psutil.virtual_memory().percent,
        "disk": psutil.disk_usage("C:\\").percent,
        "uptime": time.time() - psutil.boot_time(),
        "os": platform.system(),
        "hostname": socket.gethostname(),
        "local_ip": get_local_ip(),
        
        "bytes_sent": network.bytes_sent,
        "bytes_recv": network.bytes_recv,
        
        "disk_read": round(read_speed / 1024 / 1024, 2),
        "disk_write": round(write_speed / 1024 / 1024, 2),
        
        #dummyData
        "docker_status": "Offline"
    }
    