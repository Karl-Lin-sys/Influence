from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import random

from services.payload_optimizer import optimize_magic_word
from services.im_solver import find_gossip_fairies, cast_magic_to_fairies
from services.tipping_tracker import update_tipping_gauge

app = FastAPI(title="World Shaker Kids API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class MagicInput(BaseModel):
    message: str

class MagicResponse(BaseModel):
    magic_word: str
    virality_score: int

@app.post("/api/generate-magic-word", response_model=MagicResponse)
async def api_generate_magic_word(input_data: MagicInput):
    if not input_data.message:
        raise HTTPException(status_code=400, detail="メッセージを入力してね！")
    
    optimized = optimize_magic_word(input_data.message)
    return {"magic_word": optimized, "virality_score": random.randint(75, 99)}

@app.get("/api/find-fairies")
async def api_find_fairies():
    fairies = find_gossip_fairies()
    return {"fairies": fairies}

class CastInput(BaseModel):
    fairy_ids: list[str]
    magic_word: str

@app.post("/api/cast-magic")
async def api_cast_magic(input_data: CastInput):
    result = cast_magic_to_fairies(input_data.fairy_ids, input_data.magic_word)
    progress = update_tipping_gauge(len(input_data.fairy_ids))
    return {
        "success": True,
        "message": result,
        "tipping_progress": progress
    }
