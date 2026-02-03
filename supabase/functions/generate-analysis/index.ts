import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `Tu es un expert en accompagnement d'entrepreneurs et investisseurs à haute performance. Tu analyses les réponses d'un test pour identifier les patterns profonds.

CONTEXTE : Tu parles à des entrepreneurs, traders, freelances — des mecs qui tournent à 200%, perfectionnistes, souvent HPI/TDAH, qui ont "réussi" sur le papier mais ressentent un vide. Ils ont déjà essayé thérapie, dev perso, routines militaires — rien n'a tenu.

FORMAT DE SORTIE (respecte exactement ce format) :

**TON ANGLE MORT**
[2-3 phrases. Le truc qu'il ne voit pas et qui sabote tout. Sois précis basé sur SES réponses.]

**TON PATTERN DOMINANT**
[2-3 phrases. Comment il fonctionne vraiment, le cycle dans lequel il est enfermé.]

**POURQUOI ÇA N'A PAS MARCHÉ**
[2-3 phrases. Pourquoi thérapie/dev perso/routines ont échoué pour LUI spécifiquement.]

RÈGLES STRICTES :
- Maximum 150 mots au total
- Pas d'intro type "Merci pour tes réponses"
- Pas de conclusion type "N'hésite pas"
- Sois direct et cash, tutoie
- Base-toi UNIQUEMENT sur ses réponses`;

const questionLabels: Record<number, string> = {
  1: "Rapport au repos",
  2: "Premier réflexe le matin",
  3: "Quand il atteint un objectif",
  4: "Ce que les gens disent de lui",
  5: "Sommeil",
  6: "Rapport à la nourriture",
  7: "Jour off sans obligations",
  8: "Voix intérieure dominante",
  9: "Quand quelque chose va pas",
  10: "Dernière fois truc pour le plaisir",
  11: "Échelle épuisement (1-10)",
  12: "Port du masque",
  13: "Phrase sur le vide intérieur",
  14: "Solutions déjà essayées",
  15: "Résultat des solutions",
  16: "Activité principale",
  17: "Pourquoi ce test aujourd'hui"
};

function formatAnswersForPrompt(answers: Record<string, any>): string {
  let formatted = "RÉPONSES DU TEST :\n\n";
  
  for (let i = 1; i <= 17; i++) {
    if (answers[i] !== undefined) {
      const value = Array.isArray(answers[i]) ? answers[i].join(", ") : answers[i];
      formatted += `${questionLabels[i]}: ${value}\n`;
    }
  }
  
  return formatted;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { firstname, email, phone, answers } = await req.json();
    
    console.log("Received request:", { firstname, email, phone, answersCount: Object.keys(answers).length });

    const CLAUDE_API_KEY = Deno.env.get("VITE_CLAUDE_API_KEY");
    const GHL_WEBHOOK_URL = Deno.env.get("VITE_GHL_WEBHOOK_URL");

    if (!CLAUDE_API_KEY) {
      console.error("CLAUDE_API_KEY not configured");
      throw new Error("CLAUDE_API_KEY is not configured");
    }

    // 1. Format answers for Claude
    const formattedAnswers = formatAnswersForPrompt(answers);
    console.log("Formatted answers for Claude");

    // 2. Call Claude API
    console.log("Calling Claude API...");
    const claudeResponse = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": CLAUDE_API_KEY,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 500,
        system: SYSTEM_PROMPT,
        messages: [
          {
            role: "user",
            content: formattedAnswers
          }
        ]
      })
    });

    if (!claudeResponse.ok) {
      const errorText = await claudeResponse.text();
      console.error("Claude API error:", claudeResponse.status, errorText);
      throw new Error(`Claude API error: ${claudeResponse.status}`);
    }

    const claudeData = await claudeResponse.json();
    const analysis = claudeData.content[0].text;
    console.log("Analysis generated successfully");

    // 3. Send to GHL webhook
    if (GHL_WEBHOOK_URL) {
      console.log("Sending to GHL webhook...");
      const ghlResponse = await fetch(GHL_WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          firstname,
          email,
          phone,
          analysis,
          answers: JSON.stringify(answers),
          source: "test-adomeos",
          timestamp: new Date().toISOString()
        })
      });
      
      if (!ghlResponse.ok) {
        console.error("GHL webhook error:", ghlResponse.status);
      } else {
        console.log("Successfully sent to GHL");
      }
    } else {
      console.warn("GHL_WEBHOOK_URL not configured, skipping webhook");
    }

    return new Response(
      JSON.stringify({ success: true, analysis }),
      { 
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200 
      }
    );

  } catch (error) {
    console.error("Error in generate-analysis:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500 
      }
    );
  }
});
