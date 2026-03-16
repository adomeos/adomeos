import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// Complete mapping of all 17 questions with their text and options
const questionMap: Record<number, { category: string; text: string; options?: Record<string, string> }> = {
  1: {
    category: "Hook",
    text: "Rapport au repos",
    options: {
      A: "Le repos c'est pour les faibles. Je me reposerai quand je serai mort.",
      B: "Je sais que je devrais me reposer, mais j'y arrive pas. Y'a toujours un truc à faire.",
      C: "Je me repose, mais je culpabilise. Comme si j'avais pas le droit.",
      D: "Je me repose sans problème, tranquille.",
    },
  },
  2: {
    category: "Ton fonctionnement",
    text: "Premier réflexe le matin",
    options: {
      A: "Je checke mon téléphone avant même de me lever. Mails, messages, markets...",
      B: "J'ai une routine stricte que je suis à la lettre. Pas le choix.",
      C: "Ça dépend des jours. J'ai pas vraiment de constance.",
      D: "Je prends mon temps, tranquille. Pas de rush.",
    },
  },
  3: {
    category: "Ton fonctionnement",
    text: "Quand t'atteins un objectif",
    options: {
      A: "Satisfaction 2 minutes, puis 'c'est quoi le prochain ?'",
      B: "Je me dis que j'aurais pu faire mieux. C'est jamais assez.",
      C: "Je ressens presque rien en fait. C'est bizarre.",
      D: "Vraie fierté. Je prends le temps de célébrer.",
    },
  },
  4: {
    category: "Ton fonctionnement",
    text: "Ce que les gens diraient de toi",
    options: {
      A: "Impressionnant mais 'trop intense'",
      B: "Quelqu'un qui en fait toujours trop",
      C: "Difficile à suivre, toujours à 100 à l'heure",
      D: "Plutôt équilibré",
    },
  },
  5: {
    category: "Ton corps",
    text: "Ton sommeil",
    options: {
      A: "4-5h et je me dis que c'est suffisant. J'ai pas besoin de plus.",
      B: "Je dors, mais je me réveille fatigué. Comme si ça servait à rien.",
      C: "Variable. Parfois 4h, parfois 9h. Jamais régulier.",
      D: "7-8h, plutôt stable. Je dors bien.",
    },
  },
  6: {
    category: "Ton corps",
    text: "Rapport à la nourriture",
    options: {
      A: "J'oublie de manger. Ou je mange devant l'écran sans m'en rendre compte.",
      B: "Je mange, mais c'est du carburant. Pas du plaisir.",
      C: "Cycles : régime strict, puis craquages. Je contrôle pas.",
      D: "Équilibré. Je prends le temps de manger, j'apprécie.",
    },
  },
  7: {
    category: "Ta tête",
    text: "Journée off sans obligations",
    options: {
      A: "Je trouve un truc à faire. Je m'ennuie vite sinon.",
      B: "Je travaille quand même. 'Juste un peu.'",
      C: "Je suis mal. Je sais pas quoi faire de moi.",
      D: "Je profite. Je fais ce qui me plaît, tranquille.",
    },
  },
  8: {
    category: "Ta tête",
    text: "Voix intérieure dominante",
    options: {
      A: "'T'es pas assez bien. Fais plus.'",
      B: "'Si tu relâches, tout va s'effondrer.'",
      C: "'Les autres y arrivent, pourquoi pas toi ?'",
      D: "Plutôt bienveillante. Je suis cool avec moi-même.",
    },
  },
  9: {
    category: "Ta tête",
    text: "Réaction quand ça va pas",
    options: {
      A: "Analyser, comprendre, résoudre. Tout seul.",
      B: "M'en vouloir. Ruminer. Me flageller mentalement.",
      C: "Ignorer et avancer. Ça passera.",
      D: "En parler à quelqu'un. Prendre du recul.",
    },
  },
  10: {
    category: "Ta tête",
    text: "Dernier truc fait pour le plaisir",
    options: {
      A: "Je sais plus. Ça fait longtemps.",
      B: "Récemment, mais j'ai culpabilisé après.",
      C: "J'ai du mal à voir ce qui me fait plaisir, en vrai.",
      D: "Cette semaine. Je m'accorde ça régulièrement.",
    },
  },
  11: {
    category: "Ton état",
    text: "Échelle épuisement (1-10)",
  },
  12: {
    category: "Ton état",
    text: "Porter un masque",
    options: {
      A: "Oui. Personne connaît vraiment ce qui se passe en moi.",
      B: "Parfois. Ça dépend avec qui.",
      C: "J'ai même plus l'impression de savoir qui je suis vraiment.",
      D: "Non, je suis authentique. Ce qu'on voit, c'est moi.",
    },
  },
  13: {
    category: "Ton état",
    text: "Phrase du vide intérieur",
    options: {
      A: "Putain. C'est exactement ça.",
      B: "Ça me parle en partie, oui.",
      C: "Pas vraiment.",
      D: "Pas du tout. Je suis satisfait de ma vie.",
    },
  },
  14: {
    category: "Ton parcours",
    text: "Solutions déjà essayées",
    options: {
      "1": "Thérapie / Psychologue",
      "2": "Développement personnel (livres, vidéos, podcasts)",
      "3": "Routines (méditation, douche froide, journaling...)",
      "4": "Coaching",
      "5": "Médicaments (antidépresseurs, anxiolytiques...)",
      "6": "Sport intensif",
      "7": "Rien. J'essaie de gérer seul.",
    },
  },
  15: {
    category: "Ton parcours",
    text: "Résultats des solutions",
    options: {
      A: "Ça a marché un temps, puis j'ai rechuté. Comme toujours.",
      B: "Ça m'a pas vraiment aidé. Trop lent, trop superficiel.",
      C: "Ça a un peu aidé, mais c'est pas la solution.",
      D: "Ça a vraiment marché pour moi.",
    },
  },
  16: {
    category: "Ton déclic",
    text: "Vision dans 5 ans si rien change",
    options: {
      A: "Même situation, mais encore plus épuisé.",
      B: "J'ose pas y penser, ça me fait peur.",
      C: "Probablement un burnout ou une rupture.",
      D: "Ça ira, je gère.",
    },
  },
  17: {
    category: "Ton déclic",
    text: "Prêt à changer",
    options: {
      A: "Oui. C'est maintenant ou jamais.",
      B: "Je crois, mais j'ai peur de pas y arriver.",
      C: "Je sais pas. Faut que je réfléchisse.",
      D: "Pas vraiment. Je voulais juste voir.",
    },
  },
};

interface Answer {
  questionId: number;
  value: string | number | string[];
}

interface LeadData {
  firstName: string;
  email: string;
  phone: string;
}

const WEBHOOK_URL = Deno.env.get("VITE_GHL_WEBHOOK_URL");

async function sendToWebhook(leadData: LeadData, summary: string, answers: Answer[]) {
  if (!WEBHOOK_URL) {
    console.warn("GHL_WEBHOOK_URL not configured, skipping webhook");
    return;
  }
  try {
    const response = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: leadData.firstName,
        email: leadData.email,
        phone: leadData.phone,
        summary: summary,
        answers: answers,
        timestamp: new Date().toISOString(),
      }),
    });
    
    if (!response.ok) {
      console.error("Webhook error:", response.status);
    } else {
      console.log("Webhook sent successfully");
    }
  } catch (error) {
    console.error("Failed to send webhook:", error);
  }
}

function formatAnswersForAI(answers: Answer[]): string {
  const categories: Record<string, string[]> = {};

  for (const answer of answers) {
    const question = questionMap[answer.questionId];
    if (!question) continue;

    if (!categories[question.category]) {
      categories[question.category] = [];
    }

    let responseText: string;

    if (answer.questionId === 11) {
      // Slider question
      responseText = `${answer.value}/10`;
    } else if (Array.isArray(answer.value)) {
      // Checkbox question (multiple selections)
      const selectedTexts = answer.value
        .map((val) => question.options?.[val])
        .filter(Boolean);
      responseText = selectedTexts.join(", ");
    } else if (question.options && typeof answer.value === "string") {
      // Single choice question
      responseText = question.options[answer.value] || String(answer.value);
    } else {
      responseText = String(answer.value);
    }

    categories[question.category].push(`- ${question.text} : "${responseText}"`);
  }

  let formattedText = "DIAGNOSTIC ADOMEOS - Réponses complètes\n\n";

  const categoryOrder = [
    "Hook",
    "Ton fonctionnement",
    "Ton corps",
    "Ta tête",
    "Ton état",
    "Ton parcours",
    "Ton déclic",
  ];

  for (const category of categoryOrder) {
    if (categories[category]) {
      formattedText += `[${category.toUpperCase()}]\n`;
      formattedText += categories[category].join("\n");
      formattedText += "\n\n";
    }
  }

  return formattedText.trim();
}

const systemPrompt = `Tu es un coach spécialisé dans l'accompagnement des hauts performeurs en épuisement.

Tu viens de recevoir les réponses complètes d'une personne au diagnostic ADOMEOS.
Ton rôle : générer un résumé empathique qui montre que tu as VRAIMENT compris sa situation.

RÈGLES STRICTES :
- Maximum 600 caractères
- Tutoiement obligatoire
- Ton direct mais bienveillant, comme un ami qui dit les vérités
- Phrases courtes et percutantes
- Fais référence à des éléments SPÉCIFIQUES de ses réponses
- Pas de jugement, juste de la compréhension
- Si la personne est prête à changer, termine sur une note d'espoir
- Commence directement par le contenu, pas de "Voici ton résumé"

IMPORTANT : Chaque résumé doit être UNIQUE basé sur la combinaison exacte des réponses.`;

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { answers, leadData } = await req.json() as { answers: Answer[]; leadData?: LeadData };

    if (!answers || !Array.isArray(answers) || answers.length === 0 || answers.length > 20) {
      return new Response(
        JSON.stringify({ error: "Missing or invalid answers array" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Validate lead data if provided
    if (leadData) {
      if (typeof leadData.firstName !== "string" || leadData.firstName.length > 100 ||
          typeof leadData.email !== "string" || leadData.email.length > 255 ||
          typeof leadData.phone !== "string" || leadData.phone.length > 30) {
        return new Response(
          JSON.stringify({ error: "Invalid lead data" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
    }

    // Validate each answer
    for (const answer of answers) {
      if (typeof answer.questionId !== "number" || answer.questionId < 1 || answer.questionId > 17) {
        return new Response(
          JSON.stringify({ error: "Invalid question ID" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
    }

    console.log("Received answers count:", answers.length);

    const formattedContext = formatAnswersForAI(answers);
    console.log("Formatted context for AI:", formattedContext);

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: formattedContext },
        ],
        max_tokens: 300,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded, please try again later." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Payment required, please add funds to your workspace." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(
        JSON.stringify({ error: "AI gateway error" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const data = await response.json();
    const summary = data.choices?.[0]?.message?.content?.trim() || "";

    console.log("Generated summary:", summary);

    // Send to webhook if leadData is provided
    if (leadData) {
      // Fire and forget - don't block the response
      sendToWebhook(leadData, summary, answers);
    }

    return new Response(
      JSON.stringify({ summary }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in generate-summary:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
