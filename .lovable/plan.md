

# Intégration IA pour les Résumés - Toutes les 17 Questions

## Ce que je vais créer

Une Edge Function qui envoie **toutes les 17 questions et réponses** à Lovable AI pour générer un résumé empathique et personnalisé de moins de 600 caractères.

## Les 17 questions envoyées à l'IA

| ID | Catégorie | Question |
|----|-----------|----------|
| 1 | Hook | Rapport au repos |
| 2 | Ton fonctionnement | Premier réflexe le matin |
| 3 | Ton fonctionnement | Quand t'atteins un objectif |
| 4 | Ton fonctionnement | Ce que les gens diraient de toi |
| 5 | Ton corps | Ton sommeil |
| 6 | Ton corps | Rapport à la nourriture |
| 7 | Ta tête | Journée off sans obligations |
| 8 | Ta tête | Voix intérieure dominante |
| 9 | Ta tête | Réaction quand ça va pas |
| 10 | Ta tête | Dernier truc fait pour le plaisir |
| 11 | Ton état | Échelle épuisement (1-10) |
| 12 | Ton état | Porter un masque |
| 13 | Ton état | Phrase du vide intérieur |
| 14 | Ton parcours | Solutions déjà essayées |
| 15 | Ton parcours | Résultats des solutions |
| 16 | Ton déclic | Vision dans 5 ans |
| 17 | Ton déclic | Prêt à changer |

## Comment ça marche

```text
+------------------+     +-------------------+     +------------------+
|   17 réponses    | --> |   Edge Function   | --> |  Résumé 600 car  |
|   complètes      |     |   + Lovable AI    |     |  personnalisé    |
+------------------+     +-------------------+     +------------------+
```

## Format des données envoyées à l'IA

L'IA recevra un contexte complet avec chaque question et sa réponse :

```text
DIAGNOSTIC ADOMEOS - Réponses complètes

[TON FONCTIONNEMENT]
- Rapport au repos : "Le repos c'est pour les faibles. Je me reposerai quand je serai mort."
- Premier réflexe matin : "Je checke mon téléphone avant même de me lever"
- Atteindre objectif : "Satisfaction 2 minutes, puis c'est quoi le prochain"
- Ce que les gens disent : "Impressionnant mais trop intense"

[TON CORPS]
- Sommeil : "4-5h et je me dis que c'est suffisant"
- Nourriture : "J'oublie de manger ou je mange devant l'écran"

[TA TÊTE]
- Journée off : "Je travaille quand même, juste un peu"
- Voix intérieure : "T'es pas assez bien. Fais plus."
- Quand ça va pas : "Analyser, comprendre, résoudre. Tout seul."
- Dernier plaisir : "Je sais plus. Ça fait longtemps."

[TON ÉTAT]
- Niveau épuisement : 8/10
- Porter un masque : "Oui. Personne connaît vraiment ce qui se passe en moi."
- Phrase du vide : "Putain. C'est exactement ça."

[TON PARCOURS]
- Solutions essayées : Thérapie, Dev perso, Routines, Coaching
- Résultats : "Ça a marché un temps, puis j'ai rechuté"

[TON DÉCLIC]
- Dans 5 ans si rien change : "Même situation, mais encore plus épuisé"
- Prêt à changer : "Oui. C'est maintenant ou jamais."
```

## Prompt système optimisé

```text
Tu es un coach spécialisé dans l'accompagnement des hauts performeurs en épuisement.

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

IMPORTANT : Chaque résumé doit être UNIQUE basé sur la combinaison exacte des réponses.
```

## Architecture technique

### Prérequis
Lovable Cloud doit être activé pour utiliser Lovable AI Gateway.

### Edge Function : `generate-summary`

```text
supabase/functions/generate-summary/index.ts
     |
     ├── Recevoir les answers[] du frontend
     ├── Mapper chaque answer à sa question complète
     ├── Formater le contexte structuré par catégorie
     ├── Appeler Lovable AI (google/gemini-3-flash-preview)
     └── Retourner le résumé généré
```

### Modifications frontend

```text
src/components/quiz/ConfirmationPage.tsx
     |
     ├── Ajouter état isLoading + skeleton
     ├── Appeler l'edge function au montage
     ├── Afficher le résumé avec animation
     └── Fallback sur generateSummary() si erreur
```

## Flux utilisateur amélioré

```text
1. Utilisateur soumet formulaire
          ↓
2. Page confirmation s'affiche
   [Skeleton animé dans la box résumé]
          ↓
3. Edge function reçoit les 17 réponses
          ↓
4. IA analyse et génère (1-2 sec)
          ↓
5. Résumé s'affiche avec fade-in
```

## Gestion des erreurs

| Erreur | Solution |
|--------|----------|
| Timeout IA (>5s) | Fallback sur `generateSummary()` existant |
| Erreur 429 (rate limit) | Toast + fallback |
| Erreur 402 (crédits) | Toast + fallback |
| Résumé vide | Utiliser le système par règles |

## Fichiers à créer/modifier

| Fichier | Action |
|---------|--------|
| `supabase/functions/generate-summary/index.ts` | Créer |
| `supabase/config.toml` | Ajouter fonction |
| `src/components/quiz/ConfirmationPage.tsx` | Modifier |
| `src/utils/generateSummary.ts` | Garder (fallback) |

## Étapes d'implémentation

1. Activer Lovable Cloud (prérequis pour Lovable AI)
2. Créer l'Edge Function `generate-summary` avec le mapping complet des 17 questions
3. Modifier `ConfirmationPage.tsx` pour appeler l'edge function
4. Ajouter un skeleton loader pendant la génération
5. Implémenter le fallback automatique vers le système actuel

