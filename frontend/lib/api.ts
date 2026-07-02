const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export async function evaluatePrompt(
  userAnswer: string,
  exerciseContent: {
    instruction: string;
    context: string;
    rubric: string;
    sample_answer: string;
  }
) {
  const res = await fetch(`${API_URL}/api/v1/ai/evaluate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user_answer: userAnswer, exercise: exerciseContent }),
  });
  if (!res.ok) throw new Error("AI evaluation failed");
  return res.json();
}
