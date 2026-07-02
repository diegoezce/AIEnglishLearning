import { Lesson } from "@/types";

export const DEMO_LESSON: Lesson = {
  id: "demo",
  title: "Writing Effective AI Prompts",
  description: "Learn the anatomy of a great AI prompt and practice writing your own.",
  xp_reward: 10,
  exercises: [
    {
      id: "ex-1",
      position: 0,
      exercise_type: "vocabulary",
      requires_ai: false,
      xp_value: 1,
      content: {
        word: "Prompt Engineering",
        phonetic: "/prɒmpt ˌendʒɪˈnɪərɪŋ/",
        definition:
          "The skill of designing clear, effective instructions for an AI model to get the best possible output.",
        example:
          "Good prompt engineering can be the difference between a generic response and exactly what you need.",
      },
    },
    {
      id: "ex-2",
      position: 1,
      exercise_type: "reading",
      requires_ai: false,
      xp_value: 1,
      content: {
        title: "The Anatomy of a Great Prompt",
        body: "A well-crafted prompt has four key elements: a clear goal, relevant context, a defined audience, and a specified output format. When you include all four, the AI has everything it needs to give you a useful, accurate response.\n\nThink of it like briefing a new colleague. You wouldn't just say \"write something about the project\" — you'd explain what you need, why, who it's for, and what format works best.",
        key_points: [
          "Goal: what you want the AI to do",
          "Context: background information the AI needs",
          "Audience: who the output is for",
          "Format: how you want the answer structured",
        ],
      },
    },
    {
      id: "ex-3",
      position: 2,
      exercise_type: "multiple_choice",
      requires_ai: false,
      xp_value: 2,
      content: {
        question:
          "Which of these is the BEST prompt for summarizing a meeting?",
        options: [
          "Summarize this.",
          "Summarize the following meeting transcript in 5 bullet points for a manager who was not present. Focus on decisions made and next steps.",
          "Write a summary about the meeting transcript.",
          "Can you please summarize for me?",
        ],
        correct_index: 1,
        explanation:
          "Option B includes a goal (summarize), format (5 bullet points), audience (manager who wasn't there), and context (focus on decisions and next steps). The others are too vague.",
      },
    },
    {
      id: "ex-4",
      position: 3,
      exercise_type: "fill_in_blank",
      requires_ai: false,
      xp_value: 2,
      content: {
        template:
          "Act as a {blank_0} and write a {blank_1} email to a client explaining a project delay. Keep the tone {blank_2} and limit it to {blank_3} sentences.",
        blanks: ["senior project manager", "professional", "apologetic", "5"],
        word_bank: [
          "senior project manager",
          "casual",
          "professional",
          "apologetic",
          "aggressive",
          "5",
          "20",
          "junior developer",
        ],
      },
    },
    {
      id: "ex-5",
      position: 4,
      exercise_type: "matching",
      requires_ai: false,
      xp_value: 2,
      content: {
        pairs: [
          { left: "Zero-shot prompt", right: "No examples given to the AI" },
          {
            left: "Few-shot prompt",
            right: "2-3 examples given before the task",
          },
          {
            left: "Chain-of-thought",
            right: "Ask the AI to reason step by step",
          },
          {
            left: "Role prompting",
            right: "Tell the AI to act as an expert",
          },
        ],
      },
    },
    {
      id: "ex-6",
      position: 5,
      exercise_type: "drag_drop",
      requires_ai: false,
      xp_value: 2,
      content: {
        items: [
          { id: "a", label: "📋 Output format" },
          { id: "b", label: "🎯 Goal" },
          { id: "c", label: "📚 Context" },
          { id: "d", label: "👥 Audience" },
        ],
        correct_order: ["b", "c", "d", "a"],
      },
    },
    {
      id: "ex-7",
      position: 6,
      exercise_type: "free_text",
      requires_ai: true,
      xp_value: 5,
      content: {
        instruction:
          "Write an AI prompt to generate a short weekly status update email for your manager.",
        context:
          "You are a software developer. This week you finished a new login feature, fixed 3 bugs, and are starting a new API integration. Your manager likes concise updates.",
        rubric:
          "Score based on: clarity of goal, inclusion of relevant context, specified format or length, professional English.",
        min_words: 20,
        sample_answer:
          "Act as a professional software developer. Write a concise weekly status update email for my manager. This week I completed the login feature, fixed 3 bugs, and started the API integration. Keep it under 100 words and use bullet points for the key achievements.",
      },
    },
  ],
};
