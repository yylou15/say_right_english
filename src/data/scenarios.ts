export type Tone = "SOFT" | "NEUTRAL" | "FIRM";

export type Scenario = {
  id: string;
  category: "Disagree" | "Clarify" | "Delay" | "Update" | "Ask for help" | "Push back";
  badge: string;              // e.g. "Polite Disagree", "Hard Reject"
  title: string;              // 详情页 H1
  subtitle: string;           // 详情页 italic 句子（引号）
  description: string;        // 列表卡片大句子
  tones: Record<Tone, {
    hint: string;             // e.g. "Ideal for superiors..."
    phrase: string;           // 可复制内容
  }>;
  risk: {
    level: "Low" | "Moderate" | "High";
    whenNotToUse: string;
    bestPractices: string[];
  };
  isPro: boolean;             // true 表示需要Pro
};

export const scenarios: Scenario[] = [
  // Disagree 1: Polite Disagree
  {
    id: "disagree-polite",
    category: "Disagree",
    badge: "Polite Disagree",
    title: "Disagree Politely",
    subtitle: "Disagree without sounding discouraging.",
    description: "You disagree with the plan but don't want to seem like you're dismissing their progress.",
    tones: {
      SOFT: {
        hint: "Ideal for superiors or initial discussions",
        phrase: "I see where you're coming from, and I'm wondering if we could also explore a few other perspectives on the timeline."
      },
      NEUTRAL: {
        hint: "Suitable for peer meetings or follow-ups",
        phrase: "I have some reservations about the current approach. Specifically, I'm concerned about the potential impact on resources."
      },
      FIRM: {
        hint: "Best for course correction or risk control",
        phrase: "To be honest, I'm not comfortable with this direction given the data we've seen. We should reconsider this before proceeding."
      }
    },
    risk: {
      level: "Low",
      whenNotToUse: "Avoid excessive disagreement when the other party is being emotional or during the very early stages of informal brainstorming.",
      bestPractices: [
        "Recommended for use during formal proposal reviews.",
        "Always follow a disagreement with a constructive suggestion."
      ]
    },
    isPro: false
  },
  // Disagree 2: Interrupt
  {
    id: "disagree-interrupt",
    category: "Disagree",
    badge: "Interrupt",
    title: "Interrupt to Correct",
    subtitle: "Stop the conversation to correct a misunderstanding.",
    description: "Interrupt to correct a misunderstanding about your department's work during a meeting.",
    tones: {
      SOFT: {
        hint: "Gentle interruption",
        phrase: "Sorry to interrupt, but I want to make sure we're all on the same page regarding the timeline."
      },
      NEUTRAL: {
        hint: "Direct interruption",
        phrase: "Can I just jump in here for a second? There's a slight misunderstanding about our team's capacity."
      },
      FIRM: {
        hint: "Urgent correction",
        phrase: "Hold on a moment. That information is incorrect, and we need to clarify this before moving forward."
      }
    },
    risk: {
      level: "Moderate",
      whenNotToUse: "Do not use when a senior leader is giving a formal speech unless it's a critical factual error.",
      bestPractices: [
        "Keep it brief and factual.",
        "Apologize for the interruption if appropriate."
      ]
    },
    isPro: false
  },
  // Disagree 3: Hard Reject (Pro)
  {
    id: "disagree-hard-reject",
    category: "Disagree",
    badge: "Hard Reject",
    title: "Decline a Deadline",
    subtitle: "Say no to an impossible deadline firmly.",
    description: "The proposed deadline is impossible to meet and you need to decline it on the spot.",
    tones: {
      SOFT: {
        hint: "Soft rejection",
        phrase: "I'd love to help, but looking at our current load, that timeline might be a bit tight."
      },
      NEUTRAL: {
        hint: "Standard rejection",
        phrase: "I don't think we can commit to that date without compromising on quality."
      },
      FIRM: {
        hint: "Firm no",
        phrase: "That deadline is not feasible for us. We will need at least two more weeks to deliver this."
      }
    },
    risk: {
      level: "High",
      whenNotToUse: "Avoid using this if the deadline is driven by external regulatory compliance.",
      bestPractices: [
        "Offer an alternative timeline immediately.",
        "Explain the trade-offs (e.g., quality vs speed)."
      ]
    },
    isPro: true
  },
  // Disagree 4: Nuanced
  {
    id: "disagree-nuanced",
    category: "Disagree",
    badge: "Nuanced",
    title: "Partial Agreement",
    subtitle: "Agree with the goal, but not the method.",
    description: "You generally agree with the direction but have objections regarding the budget details.",
    tones: {
      SOFT: {
        hint: "Soft objection",
        phrase: "I love the overall direction, though I'm a bit unsure about the budget allocation."
      },
      NEUTRAL: {
        hint: "Balanced view",
        phrase: "The strategy makes sense. However, the budget numbers seem a bit optimistic."
      },
      FIRM: {
        hint: "Critical point",
        phrase: "I support the initiative, but the current budget plan is unsustainable and needs revision."
      }
    },
    risk: {
      level: "Low",
      whenNotToUse: "When the plan is already approved and in execution phase.",
      bestPractices: [
        "Validate the goal first.",
        "Focus on the specific detail that needs change."
      ]
    },
    isPro: false
  },
  // Disagree 5: Upward (Pro)
  {
    id: "disagree-upward",
    category: "Disagree",
    badge: "Upward",
    title: "Disagree with Boss",
    subtitle: "Challenge a superior's decision professionally.",
    description: "Rebut a decision made by your boss while providing professional risk warnings.",
    tones: {
      SOFT: {
        hint: "Tentative",
        phrase: "I was thinking about your suggestion, and I wonder if we might consider..."
      },
      NEUTRAL: {
        hint: "Professional",
        phrase: "I have a different perspective on this decision based on the recent data."
      },
      FIRM: {
        hint: "Duty to warn",
        phrase: "I feel it's my responsibility to highlight the significant risks associated with this decision."
      }
    },
    risk: {
      level: "High",
      whenNotToUse: "In a public meeting with external stakeholders.",
      bestPractices: [
        "Do it in private if possible.",
        "Frame it as protecting the company's interest."
      ]
    },
    isPro: true
  },
  // Disagree 6: Mediation
  {
    id: "disagree-mediation",
    category: "Disagree",
    badge: "Mediation",
    title: "Table the Discussion",
    subtitle: "Move on from a deadlock.",
    description: "Suggest tabling a disagreement to move on to other agenda items during a deadlock.",
    tones: {
      SOFT: {
        hint: "Suggestion",
        phrase: "Maybe we can park this topic for now and come back to it later?"
      },
      NEUTRAL: {
        hint: "Process focus",
        phrase: "Given the time, let's table this discussion and proceed to the next item."
      },
      FIRM: {
        hint: "Directive",
        phrase: "We are not making progress here. Let's move on and revisit this offline."
      }
    },
    risk: {
      level: "Low",
      whenNotToUse: "When the item is a blocker for the rest of the agenda.",
      bestPractices: [
        "Assign an action item to follow up.",
        "Set a specific time to revisit."
      ]
    },
    isPro: false
  },
  // Buy Time (For Landing Page)
  {
    id: "buy-time-generic",
    category: "Delay",
    badge: "Buy Time",
    title: "Buy Time",
    subtitle: "Get a moment to think.",
    description: "Sudden questions under pressure? Buy 10-20 seconds to think without looking awkward.",
    tones: {
      SOFT: {
        hint: "Casual",
        phrase: "That's an interesting point. Let me think about that for a second."
      },
      NEUTRAL: {
        hint: "Standard",
        phrase: "That’s a great question, let me double-check the figures for you."
      },
      FIRM: {
        hint: "Formal",
        phrase: "I want to give you a precise answer, so I will need to verify the data first."
      }
    },
    risk: {
      level: "Low",
      whenNotToUse: "When an immediate yes/no answer is required for safety or compliance.",
      bestPractices: [
        "Don't wait too long to follow up.",
        "Maintain eye contact."
      ]
    },
    isPro: false
  },
  // Clarify (For Landing Page)
  {
    id: "clarify-generic",
    category: "Clarify",
    badge: "Clarify",
    title: "Clarify Without Defense",
    subtitle: "Explain without being defensive.",
    description: "When progress is misunderstood, clarify facts calmly instead of being defensive.",
    tones: {
      SOFT: {
        hint: "Soft clarification",
        phrase: "I think there might be a slight misunderstanding about my role in this."
      },
      NEUTRAL: {
        hint: "Factual",
        phrase: "Just to clarify, my focus this week was primarily on the backend integration."
      },
      FIRM: {
        hint: "Firm correction",
        phrase: "That is not accurate. The report clearly states that the module was completed yesterday."
      }
    },
    risk: {
      level: "Moderate",
      whenNotToUse: "When you actually made a mistake—apologize instead.",
      bestPractices: [
        "Stick to facts.",
        "Avoid 'You' statements (e.g., 'You are wrong')."
      ]
    },
    isPro: false
  }
];
