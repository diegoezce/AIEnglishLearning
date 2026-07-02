from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.services.ai_service import evaluate_prompt

router = APIRouter(prefix="/api/v1/ai", tags=["ai"])


class ExerciseContext(BaseModel):
    instruction: str
    context: str
    rubric: str
    sample_answer: str


class EvaluateRequest(BaseModel):
    user_answer: str
    exercise: ExerciseContext


class EvaluateResponse(BaseModel):
    score: int
    feedback: str
    what_worked: str
    to_improve: str


@router.post("/evaluate", response_model=EvaluateResponse)
async def evaluate(req: EvaluateRequest):
    if not req.user_answer.strip():
        raise HTTPException(status_code=400, detail="Answer cannot be empty")
    try:
        result = await evaluate_prompt(
            user_answer=req.user_answer,
            instruction=req.exercise.instruction,
            context=req.exercise.context,
            rubric=req.exercise.rubric,
            sample_answer=req.exercise.sample_answer,
        )
        return EvaluateResponse(**result)
    except Exception as e:
        raise HTTPException(status_code=502, detail=f"AI evaluation failed: {str(e)}")
