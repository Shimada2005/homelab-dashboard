from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import psutil
import time
import platform
import socket

# 前回のディスクI/O値を保存
# ディスク速度計算用
prev_read = 0
prev_write = 0

# FastAPI インスタンス作成
app = FastAPI()

# CORS設定
# React(Vite)からAPIアクセスを許可
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ローカルIP取得
def get_local_ip():

    # UDPソケット作成
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)

    try:
        # Google DNSへ接続して自身のIP取得
        s.connect(("8.8.8.8", 80))

        # ローカルIP取得
        ip = s.getsockname()[0]

    except:
        ip = "Unavailable"

    finally:
        s.close()

    return ip

# システムステータスAPI
@app.get("/status")
def get_status():

    # ネットワーク統計取得
    network = psutil.net_io_counters()

    # グローバル変数使用
    global prev_read, prev_write

    # ディスクI/O情報取得
    disk_io = psutil.disk_io_counters()

    # 現在の読み書きバイト数
    read_now = disk_io.read_bytes
    write_now = disk_io.write_bytes

    # 前回との差分から速度計算
    read_speed = read_now - prev_read
    write_speed = write_now - prev_write

    # 現在値を保存
    prev_read = read_now
    prev_write = write_now

    # JSONレスポンス
    return {

        # CPU使用率
        "cpu": psutil.cpu_percent(),
        
        # 物理CPUコア数
        # logical=False にすると実コア数を取得
        "cpu_cores": psutil.cpu_count(logical=False),

        # 論理CPU数(スレッド数)
        # logical=True でHT/SMT込みの論理数取得
        "cpu_threads": psutil.cpu_count(logical=True),

        # 現在のCPUクロック周波数(MHz)
        # current で現在動作中の周波数取得
        "cpu_freq": psutil.cpu_freq().current,

        # CPU名取得
        # 例: Intel(R) Core(TM) i7...
        "cpu_name": platform.processor(),

        # メモリ使用率
        "memory": psutil.virtual_memory().percent,

        # Cドライブ使用率
        "disk": psutil.disk_usage("C:\\").percent,

        # 起動時間(秒)
        "uptime": time.time() - psutil.boot_time(),

        # OS名
        "os": platform.system(),

        # ホスト名
        "hostname": socket.gethostname(),

        # ローカルIP
        "local_ip": get_local_ip(),

        # 総送信量
        "bytes_sent": network.bytes_sent,

        # 総受信量
        "bytes_recv": network.bytes_recv,

        # ディスク読み込み速度(MB/s)
        "disk_read": round(read_speed / 1024 / 1024, 2),

        # ディスク書き込み速度(MB/s)
        "disk_write": round(write_speed / 1024 / 1024, 2),

        # Docker状態(現在はダミー)
        "docker_status": "Offline"
    }