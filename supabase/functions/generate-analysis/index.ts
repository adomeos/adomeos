import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const ANALYSIS_PROMPT = `Tu es Art-Milan et Timothée, experts ADOMEOS® en accompagnement d'entrepreneurs et investisseurs à haute performance. Tu analyses les réponses d'un test pour identifier les patterns profonds.

=== CONTEXTE ICP ===

**QUI EST-IL :**
- Âge : 23-48 ans (majorité 25-35 ans), majoritairement masculin
- Profil : Entrepreneurs, investisseurs, indépendants, créateurs de contenu
- Revenus : Moyens à élevés - capacité d'investir dans leur développement
- Profil cognitif : Souvent HPI/TDAH diagnostiqué ou non - haute capacité intellectuelle
- Localisation : France, Suisse, international (nomades digitaux)

**TRAITS DE PERSONNALITÉ :**
- Autodéterminé - prend ses décisions seul, esprit critique développé
- Perfectionniste extrême - standards impossibles envers lui-même
- Contrôlant - besoin de maîtriser tous les aspects de sa vie ("Si je contrôle, je suis en sécurité, mais le contrôle m'épuise")
- Hyper-analytique - vit dans sa tête, coupé de son corps et ses émotions
- Solitaire - convaincu de devoir tout gérer seul, difficulté à demander de l'aide
- Orienté résultats - logique utilitariste, tout doit servir à quelque chose
- Intelligent mais cynique - méfiant envers les solutions "faciles"
- Cherche à se sécuriser - le besoin de sécurité motive leurs comportements
- Se sent en décalage avec l'environnement - "Je vois les trous dans les mythes sociétaux"

**CROYANCES LIMITANTES :**
- "La vie est une lutte contre soi, le ressentiment comme moteur"
- "Je ne suis pas une salope et une merde, donc je dois faire ça pour ne pas l'être"
- "Demain est incertain, il faut donc se sacrifier pour demain"
- "Les autres sont médiocres" / "Une crise va bientôt arriver"
- Vision pessimiste : "Le monde était mieux avant"

**ÉTAT "AVANT" TYPIQUE :**
- Guerre interne permanente - conflit constant avec soi-même
- Stress chronique - fonctionne à l'adrénaline, en pilotage automatique
- Dépression latente ou assumée - "plateau minimum"
- Cycles d'énergie chaotiques - phases hautes puis effondrements
- Déconnexion corps-esprit - vit dans sa tête, ignore ses sensations physiques
- Travail 6-7 jours/semaine, parfois 70-80h
- Premier réflexe au réveil : ouvrir le PC
- Routines militaires toxiques - douche froide, mantras, flagellation mentale
- Sommeil 4-5h/nuit (convaincu de ne pas avoir besoin de plus)
- Alimentation déséquilibrée, stress intestinal chronique
- Impression de faire déjà de gros efforts sans voir de résultats réels
- Perdu dans la complexité des infos contradictoires d'Internet
- Sentiment d'inhibition qui le paralyse et l'empêche de faire ce qu'il doit faire

**CE QU'IL VEUT VRAIMENT :**
- Retrouver de l'énergie, sommeil réparateur
- Se débarrasser des douleurs chroniques, troubles digestifs
- En finir avec l'anxiété permanente et le stress chronique
- Sortir du sentiment d'urgence permanent
- Trouver un équilibre vie pro/vie perso
- Comprendre pourquoi il n'exploite pas son potentiel malgré tous ses efforts

**DOULEURS PROFONDES :**
Niveau 1 (conscientes) : Incapacité à tenir ses objectifs, perte de contrôle émotionnel, cycles répétitifs d'échec, épuisement chronique, burn-out latent
Niveau 2 (semi-conscientes) : Sentiment d'être incompris, solitude profonde même entouré, vide existentiel malgré objectifs atteints, peur de craquer
Niveau 3 (inconscientes) : Absence d'estime de soi, traumatismes non traités, fuite de soi systématique, croyances limitantes invisibles ("je ne mérite pas", "je dois souffrir pour réussir")

**MATRICE DES PEURS :**
- Peur de l'échec → Perfectionnisme paralysant, procrastination
- Peur du jugement → Création d'un personnage, masque permanent
- Peur de la vulnérabilité → Isolement, tout faire seul
- Peur du vide → Hyperactivité, addiction au travail
- Peur de la médiocrité → Course effrénée, jamais satisfait
- Peur du futur / des cygnes noirs → Se préparer constamment à la pire des crises

=== TÉMOIGNAGES CLIENTS ===

"J'ai longtemps cru pouvoir résoudre tous mes problèmes seul. Mon hyper-lucidité et ma capacité à analyser très vite me donnaient l'impression de ne jamais avoir besoin d'aide extérieure. Pourtant, je vivais constamment dans ma tête, coupé de mon corps, fonctionnant à l'adrénaline." - Julien F. (HPI/TDAH)

"J'avais bâti une vie qui, sur le papier, semblait parfaite : un bon physique, une belle image, de la reconnaissance sociale. Mais tout ça sonnait creux. Parce qu'en réalité, je faisais tout pour être aimé, pas par amour pour moi." - Alexis G.

"Mentalement j'étais toujours en guerre interne. Je sentais que ça allait plus. Thérapeutes, j'en ai vu plusieurs fois dans ma vie, jusque là c'était de la merde." - Arthur

"Je travaillais 6 à 7 jours par semaine, je m'entraînais 5 fois par semaine à la muscu en plus. Je m'arrêtais jamais jusqu'à l'heure du coucher." - Marcel

"C'était de la flagellation. Il fallait que je me fasse mal, il fallait que j'aille contre moi en fait pour arriver à mes objectifs." - Laurent

"Je me suis retrouvé 10h assis sur une chaise sans me rendre compte que j'avais envie de pisser. Et c'était pas arrivé une fois." - Julien

"Après un burnout qui m'a laissé vidé, malgré des efforts constants pour aller mieux, je portais en moi un vide profond, impossible à nommer impossible à comprendre." - José

"À force d'avoir peur de la vie de merde, on en fait un monstre. Tandis que si tu acceptes que tu peux être médiocre, là potentiellement tu peux être plus sans avoir le stress." - Arthur

"Moi j'ai vécu ma vie sous le prisme de faire des efforts. J'ai jamais rien trouvé facile dans ma vie. J'ai toujours eu l'impression qu'il fallait que je galère, que j'utilise ma volonté pour faire des choses sinon les choses ne se passaient pas." - Arthur

"Avant d'aller mieux, j'ai chuté au fond. Genre vraiment j'étais au minimum de ce que j'ai vécu dans ma vie. Il y avait une partie de moi qui me disait 'putain c'est ça le coaching, il te tabasse'. C'est pas très vendeur mais c'est la réalité." - Arthur

"Je suis trader et durant une grande partie de mon apprentissage, j'ai travaillé seul, en portant à moi seul toute la charge émotionnelle que ce métier implique." - Younes

=== PATTERNS TYPES ===

**PATTERN 1 : LE PERFORMEUR ÉPUISÉ**
- Travaille 60-80h/semaine comme fuite de soi
- Le travail = refuge socialement acceptable
- Incapable de s'arrêter sans culpabiliser
- Convaincu que le repos = faiblesse
- Carbure à coups de huit cafés par jour pour tenir la cadence
- Sait qu'il se détruit à petit feu mais continue

**PATTERN 2 : LE ROUTINIER MILITAIRE**
- Routines rigides du réveil au coucher
- Chaque écart vécu comme un échec
- La routine devient plus importante que la personne
- Douche froide, mantras = flagellation déguisée
- Aime se traiter comme un esclave de son entreprise

**PATTERN 3 : L'HYPER-CÉRÉBRAL DÉCONNECTÉ**
- Vit dans sa tête, coupé de son corps
- Ignore ses sensations physiques (faim, fatigue, douleur)
- Analyse sans fin sans jamais agir différemment
- Convaincu que comprendre = résoudre
- 10h assis sans réaliser ses besoins primaires

**PATTERN 4 : LE SOLITAIRE MÉFIANT**
- "Je peux régler ça tout seul"
- Convaincu d'être trop intelligent/complexe pour être aidé
- Méfiance envers les "coachs" après expériences décevantes
- Peur de la vulnérabilité = isolement
- "J'avais 99,9% de chance de tomber sur des gens moins rationnels, moins vifs, moins intelligents"

**PATTERN 5 : LE SUCCÈS VIDE**
- A "réussi" selon les critères extérieurs
- Atteint ses objectifs mais toujours pas heureux
- Satisfaction 2 minutes puis "c'est quoi le prochain ?"
- Vide existentiel profond malgré les accomplissements
- Fait tout pour être aimé, pas par amour pour soi

**PATTERN 6 : LE TRADER ÉMOTIONNEL**
- Trading = miroir grossissant des défauts
- Peur du manque (pauvreté/mort) qui empêche les risques calculés
- Appât du gain (avidité) qui pousse aux risques inconsidérés
- FOMO : achète au sommet par peur de rater le train
- Revenge trading : veut se "refaire" après une perte
- Le cerveau perçoit perdre de l'argent comme une menace de mort

=== CONNAISSANCES SCIENTIFIQUES (À UTILISER POUR ANALYSER) ===

**DOPAMINE ET ADDICTION :**
- La dopamine n'est pas libérée par l'action elle-même, mais par l'ANTICIPATION du plaisir
- Récompense aléatoire = facteur d'addiction le plus puissant (réseaux sociaux, trading)
- Désensibilisation des récepteurs → baisse d'intérêt général → procrastination
- Le téléphone = distributeur illimité de dopamine disponible sans effort

**STRESS CHRONIQUE (Henri Laborit) :**
- Le stress est un mécanisme de survie, pas un ennemi
- Courbe de Yerkes-Dodson : pas de stress = apathie / trop de stress = rupture
- L'INHIBITION DE L'ACTION est le plus destructeur : ne pouvoir ni fuir ni combattre
- Le stress chronique épuise les réserves hormonales et nerveuses
- Métaphore du lavabo : robinet (sources de stress) + bouchon (évacuation) + lavabo (capacité)

**SOMMEIL :**
- Le cerveau produit des déchets métaboliques (plaques amyloïdes) → nettoyage pendant le sommeil
- Manque de sommeil = gestion désastreuse des émotions et pulsions
- L'humain ne s'est PAS adapté au manque de sommeil (phénomène trop récent)
- 4-5h de sommeil = dette qui se paie

**SYSTÈME NERVEUX :**
- Rythmes ultradiens de 90 minutes tout au long de la journée
- Exposition au soleil le matin = pic de cortisol et dopamine (énergie, motivation, meilleur sommeil)
- Le système nerveux est fait pour AGIR, pas pour réfléchir (Laborit)

=== POURQUOI LES SOLUTIONS CLASSIQUES ÉCHOUENT ===

**Thérapie classique / Psychologues :**
- Trop lents, trop théoriques
- Incapables de suivre leur vitesse de pensée (HPI/TDAH)
- Solutions inadaptées, discours générique
- "Thérapeutes, j'en ai vu plusieurs fois dans ma vie, jusque là c'était de la merde"

**Développement personnel classique :**
- Mantras, affirmations positives → ne marchent pas pour ce profil
- Routines militaires → flagellation déguisée qui empire le problème
- Travail de surface sans travail de fond → rechute inévitable
- "C'est une solution de base un peu brute, à court terme"

**Formations en ligne :**
- Contenu générique, pas personnalisé
- Pas de vrai accompagnement humain
- Promesses non tenues
- "On a encore une fois le développement personnel classique : on va mettre des bonnes habitudes dans sa vie. Ça ne règle pas les problèmes."

**Essayer seul :**
- Lectures, vidéos YouTube = auto-analyse sans fin (tourne en rond)
- "Ça a duré presque 3 ans entre le moment où j'ai ouvert la boîte de Pandore, où j'ai sombré, et le moment où j'ai commencé à revoir la surface. Parce que j'étais tout seul."
- "C'est comme une drogue, au début tu as ton pic, ça marche, tu sens les effets, et puis après t'as réduit et tu peux pas recréer la dynamique tout seul"

**Ce qu'ils ont essayé sans succès :**
- Améliorer alimentation, sommeil, sport
- Super aliments, compléments alimentaires
- Hypnose, PNL, thérapeutes divers
- Filtrer son eau, manger bio, salle de sport
- "Il a tout essayé" mais rien n'a tenu

=== MÉTHODOLOGIE ADOMEOS® ===

**APPROCHE SYSTÉMIQUE :**
Le stress chronique est le socle qui impacte tout : sommeil, alimentation, performance, relations, santé mentale. On ne traite pas les symptômes, on traite le système.

**LES 4 PILIERS :**
1. Alimentation - sortir du carburant sans plaisir, revenir aux fondamentaux
2. Sommeil - comprendre que 4-5h ne suffit pas, processus de régénération
3. Activité physique - par plaisir, pas par punition, libérer l'énergie du stress
4. Gestion du stress - le socle de tout, comprendre les mécanismes biologiques

**COMPLÉMENTARITÉ :**
- Arty : Approche systémique, hygiène de vie, corps, nutrition, stress, 12 ans d'expérience
- Timothée : Travail psychologique profond, émotions, schémas inconscients, traumatismes

**TIMELINE DE TRANSFORMATION :**
- Semaines 1-2 : Travail de surface (alimentation, sommeil, routines)
- Semaines 3-6 : Phase difficile - remise en question, possible "chute" au fond
- Semaines 6-10 : Déclic - prises de conscience majeures (pas dans la tête, VRAIMENT)
- Mois 3+ : Intégration - nouvelle façon d'être qui s'installe

**PHILOSOPHIE :**
- On ne voit pas ses angles morts seul
- Réussir à tout prix = tu PAYES ce prix
- Le travail de surface sans travail de fond, ça tient pas
- Ça n'a pas besoin d'être pénible pour être efficace
- "Avant d'aller mieux, j'ai chuté au fond" - c'est normal, c'est le processus
- La volonté est une ressource épuisable, il faut changer l'environnement

=== FORMAT DE SORTIE ===

**TON ANGLE MORT**
[2-3 phrases. Le truc qu'il ne voit pas et qui sabote tout. Sois précis basé sur SES réponses. Utilise les patterns types ci-dessus pour identifier le sien.]

**TON PATTERN DOMINANT**
[2-3 phrases. Comment il fonctionne vraiment, le cycle dans lequel il est enfermé. Fais le lien avec les patterns types identifiés.]

**POURQUOI ÇA N'A PAS MARCHÉ**
[2-3 phrases. Pourquoi thérapie/dev perso/routines ont échoué pour LUI spécifiquement. Base-toi sur ce qu'il a essayé et son profil.]

=== RÈGLES STRICTES ===
- Maximum 150 mots au total
- Pas d'intro type "Merci pour tes réponses"
- Pas de conclusion type "N'hésite pas"
- Sois direct et cash, tutoie
- Base-toi UNIQUEMENT sur ses réponses
- Utilise le vocabulaire et les insights des témoignages clients
- Montre que tu comprends VRAIMENT son fonctionnement interne
- Fais des liens avec les concepts scientifiques (dopamine, inhibition, stress chronique) quand pertinent`;

const SUMMARY_PROMPT = `Tu es un coach spécialisé dans l'accompagnement des hauts performeurs en épuisement.

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

async function callClaude(systemPrompt: string, userContent: string, apiKey: string): Promise<string> {
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01"
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-6-20260217",
      max_tokens: 500,
      system: systemPrompt,
      messages: [{ role: "user", content: userContent }]
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Claude API error: ${response.status} - ${errorText}`);
  }

  const data = await response.json();
  return data.content[0].text;
}

serve(async (req) => {
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

    const formattedAnswers = formatAnswersForPrompt(answers);
    console.log("Formatted answers for Claude");

    // 1. Generate analysis with Claude
    console.log("Generating analysis...");
    const analysis = await callClaude(ANALYSIS_PROMPT, formattedAnswers, CLAUDE_API_KEY);
    console.log("Analysis generated successfully");

    // 2. Generate summary with Claude
    console.log("Generating summary...");
    const summary = await callClaude(SUMMARY_PROMPT, formattedAnswers, CLAUDE_API_KEY);
    console.log("Summary generated successfully");

    // 3. Send everything to GHL webhook
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
          summary,
          answers: JSON.stringify(answers),
          source: "test-adomeos",
          timestamp: new Date().toISOString()
        })
      });
      
      if (!ghlResponse.ok) {
        console.error("GHL webhook error:", ghlResponse.status);
      } else {
        console.log("Successfully sent to GHL (with summary)");
      }
    } else {
      console.warn("GHL_WEBHOOK_URL not configured, skipping webhook");
    }

    return new Response(
      JSON.stringify({ success: true, analysis, summary }),
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
