// src/services/analyseService.ts

const CLAUDE_API_KEY = import.meta.env.VITE_CLAUDE_API_KEY;
const GHL_WEBHOOK_URL = import.meta.env.VITE_GHL_WEBHOOK_URL;

// ============================================
// LE PROMPT SYSTÈME - C'est ici qu'il est !
// ============================================

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

// ============================================
// FORMATER LES RÉPONSES POUR CLAUDE
// ============================================

function formatAnswersForPrompt(answers: Record<string, any>): string {
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

  let formatted = "RÉPONSES DU TEST :\n\n";
  
  for (let i = 1; i <= 17; i++) {
    if (answers[i] !== undefined) {
      const value = Array.isArray(answers[i]) ? answers[i].join(", ") : answers[i];
      formatted += `${questionLabels[i]}: ${value}\n`;
    }
  }
  
  return formatted;
}

// ============================================
// APPELER CLAUDE POUR GÉNÉRER L'ANALYSE
// ============================================

export async function generateAnalysis(answers: Record<string, any>): Promise<string> {
  const formattedAnswers = formatAnswersForPrompt(answers);
  
  const response = await fetch("https://api.anthropic.com/v1/messages", {
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

  const data = await response.json();
  return data.content[0].text;
}

// ============================================
// ENVOYER À GHL
// ============================================

export async function sendToGHL(
  firstname: string,
  email: string,
  phone: string,
  answers: Record<string, any>,
  analysis: string
): Promise<void> {
  
  await fetch(GHL_WEBHOOK_URL, {
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
}

// ============================================
// FONCTION PRINCIPALE - À APPELER AU SUBMIT
// ============================================

export async function processTestSubmission(
  firstname: string,
  email: string,
  phone: string,
  answers: Record<string, any>
): Promise<{ success: boolean; analysis?: string; error?: string }> {
  
  try {
    // 1. Générer l'analyse avec Claude
    console.log("Génération de l'analyse...");
    const analysis = await generateAnalysis(answers);
    console.log("Analyse générée:", analysis);
    
    // 2. Envoyer à GHL
    console.log("Envoi à GHL...");
    await sendToGHL(firstname, email, phone, answers, analysis);
    console.log("Envoyé à GHL !");
    
    return { success: true, analysis };
    
  } catch (error) {
    console.error("Erreur:", error);
    return { success: false, error: String(error) };
  }
}
