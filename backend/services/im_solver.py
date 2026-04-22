import random
import uuid

def find_gossip_fairies(num=6):
    # 実際にはここにGCNやNDD_AGCNIMアルゴリズムが入る
    # 構造的空隙（ブリッジノード）や拡散中心性が高いノードを探す
    names = ["キラキラ", "モフモフ", "ピカピカ", "ツヤツヤ", "フワフワ", "ドキドキ", "ワクワク", "ニコニコ", "トコトコ", "ポカポカ"]
    fairies = []
    for _ in range(num):
        fairies.append({
            "id": str(uuid.uuid4())[:8],
            "name": f"{random.choice(names)}妖精",
            "centrality_score": random.randint(80, 100),
            "bridge_capacity": random.randint(50, 100),
            "avatar_color": f"hsl({random.randint(0, 360)}, 80%, 75%)"
        })
    return fairies

def cast_magic_to_fairies(fairy_ids, magic_word):
    # プラットフォームの「共起検出」をトリガーするための同時送信シミュレーション
    return f"{len(fairy_ids)}匹の妖精が魔法を世界中に広めました！"
