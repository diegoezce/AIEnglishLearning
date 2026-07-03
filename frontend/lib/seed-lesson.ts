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
          "Using prompt engineering, the office administrator drafted a supplier complaint letter in seconds instead of spending 20 minutes writing it from scratch.",
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
        body: "A well-crafted prompt has four key elements: a clear goal, relevant context, a defined audience, and a specified output format. When you include all four, the AI has everything it needs to give you a useful, accurate response.\n\nThink of it like briefing a new colleague. You wouldn't just say \"write something about the invoice\" — you'd explain what you need, why, who it's for, and what format works best. The same logic applies to AI.",
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
          "Which is the BEST prompt for writing an email to a supplier about a late delivery?",
        options: [
          "Write an email about the delivery.",
          "Write a formal email to our supplier, Contoso Ltd., requesting an update on order #4521, which is 5 days overdue. Keep the tone professional but firm, and ask for a new delivery date.",
          "Can you write something about our late order?",
          "Write an email complaining about the supplier.",
        ],
        correct_index: 1,
        explanation:
          "Option B includes a goal (request an update), context (supplier name, order number, 5 days overdue), tone (professional but firm), and a clear ask (new delivery date). The others are too vague for the AI to produce a useful result.",
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
          "Act as a {blank_0} and write a {blank_1} email to a vendor explaining a payment delay. Keep the tone {blank_2} and limit it to {blank_3} sentences.",
        blanks: ["senior office administrator", "professional", "apologetic", "5"],
        word_bank: [
          "senior office administrator",
          "casual",
          "professional",
          "apologetic",
          "aggressive",
          "5",
          "20",
          "new intern",
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
          "Write an AI prompt to draft a professional email requesting quotes from a new office supplies vendor.",
        context:
          "You are an office administrator. Your company needs to find a new supplier for printer paper, pens, and folders. You need at least 3 price quotes by the end of the month. The email should be formal and include your company name: Nexus Group.",
        rubric:
          "Score based on: clarity of goal, inclusion of relevant context, specified format or length, professional English.",
        min_words: 20,
        sample_answer:
          "Act as a professional office administrator at Nexus Group. Write a formal email to a potential office supplies vendor requesting a price quote for printer paper, pens, and folders. Mention that we need the quote by the end of the month. Keep the tone polite and professional, and ask them to include bulk pricing options.",
      },
    },
  ],
};
