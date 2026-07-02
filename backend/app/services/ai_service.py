import json
from openai import AsyncOpenAI
from app.config import settings

_client: AsyncOpenAI | None = None


def get_client() -> AsyncOpenAI:
    global _client
    if _client is None:
        _client = AsyncOpenAI(
            api_key=settings.deepseek_api_key,
            base_url=settings.deepseek_base_url,
        )
    return _client


EVALUATOR_SYSTEM = """You are an expert English and AI prompt coach.
Evaluate the learner's AI prompt based on the provided rubric.
Respond ONLY with valid JSON matching this exact shape:
{
  "score": <integer 0-100>,
  "feedback": "<one sentence overall feedback>",
  "what_worked": "<one sentence on strengths>",
  "to_improve": "<one sentence on what to improve>"
}"""


async def evaluate_prompt(
    user_answer: str,
    instruction: str,
    context: str,
    rubric: str,
    sample_answer: str,
) -> dict:
    client = get_client()
    user_msg = f"""Task: {instruction}

Situation: {context}

Rubric: {rubric}

Sample answer for reference: {sample_answer}

Learner's prompt:
{user_answer}

Evaluate and respond with JSON only."""

    response = await client.chat.completions.create(
        model=settings.deepseek_model,
        messages=[
            {"role": "system", "content": EVALUATOR_SYSTEM},
            {"role": "user", "content": user_msg},
        ],
        max_tokens=300,
        temperature=0.3,
        response_format={"type": "json_object"},
    )

    raw = response.choices[0].message.content or "{}"
    return json.loads(raw)
