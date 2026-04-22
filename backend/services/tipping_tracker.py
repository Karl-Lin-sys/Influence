import random

# グローバル状態で進行度をモック管理
current_progress = 0.0

def update_tipping_gauge(num_fairies_cast: int) -> float:
    # 実際には情報拡散後の25%クリティカルマスへの到達度をシミュレート
    global current_progress
    # 1匹あたり2%〜5%進むとする
    gain = (num_fairies_cast * random.uniform(3.0, 6.0))
    current_progress += gain
    if current_progress > 100.0:
        current_progress = 100.0
    return current_progress
