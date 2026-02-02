
# Résumé Personnalisé en 600 caractères

## Ce que je vais créer

Un système d'analyse qui génère un résumé empathique et personnalisé basé sur 12 questions clés du quiz. Le résumé fera moins de 600 caractères pour être plus détaillé tout en restant percutant.

## Exemple de résultat

> "Tu tournes à 100% en permanence. Le matin, t'es déjà sur ton téléphone avant même de te lever. Quand t'atteins un objectif, tu passes direct au suivant sans célébrer. Ton sommeil ? Insuffisant. Ta voix intérieure te dit que t'es jamais assez bien. T'as essayé la thérapie et le dev perso, mais ça a marché un temps puis t'as rechuté. Aujourd'hui, t'es à 7/10 sur l'échelle de l'épuisement. Mais t'es prêt à changer. On va t'aider."

## Questions mappées pour le résumé

| ID | Question | Ce qu'elle révèle | Priorité |
|----|----------|-------------------|----------|
| 1 | Rapport au repos (hook) | Relation toxique au repos | Haute |
| 2 | Premier réflexe le matin | Hyperconnexion, addiction au travail | Haute |
| 3 | Atteindre un objectif | Incapacité à savourer les victoires | Moyenne |
| 4 | Ce que les gens disent | Image sociale, intensité perçue | Basse |
| 5 | Sommeil | Santé physique, négligence du corps | Haute |
| 6 | Nourriture | Rapport au corps, contrôle | Moyenne |
| 7 | Journée off | Incapacité à déconnecter | Moyenne |
| 8 | Voix intérieure | Auto-critique, pression interne | Haute |
| 10 | Dernier plaisir | Perte de connexion au plaisir | Moyenne |
| 11 | Niveau épuisement (slider) | Score chiffré, tangible | Haute |
| 12 | Porter un masque | Authenticité, isolement | Moyenne |
| 13 | Phrase du vide | Résonance émotionnelle profonde | Haute |
| 14 | Solutions essayées (checkbox) | Parcours, efforts déjà faits | Haute |
| 15 | Résultats des solutions | Frustration, échecs passés | Haute |
| 16 | Vision dans 5 ans | Conscience du risque | Moyenne |
| 17 | Prêt à changer | Motivation, ouverture | Haute |

## Logique de génération par blocs

### Bloc 1 : Rythme de vie (questions 1, 2, 7)

```text
Si repos=A -> "Tu te reposes jamais."
Si repos=B -> "Tu sais que tu devrais te reposer, mais y'a toujours un truc à faire."
Si matin=A -> "Le matin, t'es déjà sur ton téléphone avant même de te lever."
Si matin=B -> "T'as une routine stricte, pas le choix."
Si off=B -> "Même tes jours off, tu travailles."
```

### Bloc 2 : Rapport aux objectifs (questions 3, 10)

```text
Si objectif=A -> "Quand t'atteins un objectif, tu passes direct au suivant."
Si objectif=B -> "C'est jamais assez bien pour toi."
Si plaisir=A -> "Le plaisir sans objectif ? T'as oublié ce que c'est."
Si plaisir=C -> "T'as du mal à savoir ce qui te fait plaisir."
```

### Bloc 3 : Corps (questions 5, 6)

```text
Si sommeil=A -> "Ton sommeil ? 4-5h et tu te dis que ça suffit."
Si sommeil=B -> "Tu dors, mais tu te réveilles fatigué."
Si nourriture=A -> "Tu manges devant l'écran sans t'en rendre compte."
Si nourriture=C -> "Régimes stricts puis craquages. Tu contrôles pas."
```

### Bloc 4 : Mental (questions 8, 12, 13)

```text
Si voix=A -> "Ta voix intérieure te dit que t'es jamais assez bien."
Si voix=B -> "T'as peur que tout s'effondre si tu relâches."
Si masque=A -> "Tu portes un masque. Personne sait vraiment ce qui se passe."
Si masque=C -> "T'as même plus l'impression de savoir qui tu es."
Si phrase=A -> "Cette phrase sur le vide intérieur ? Elle te parle direct."
```

### Bloc 5 : Parcours (questions 14, 15)

```text
Si solutions >= 3 -> "T'as déjà tout essayé : [liste]."
Si solutions contient "Rien" -> "T'essaies de tout gérer seul."
Si résultat=A -> "Ça a marché un temps, puis t'as rechuté."
Si résultat=B -> "Rien n'a vraiment fonctionné. Trop lent, trop superficiel."
```

### Bloc 6 : État actuel (question 11)

```text
"Aujourd'hui, t'es à [X]/10 sur l'échelle de l'épuisement."
```

### Bloc 7 : Projection et motivation (questions 16, 17)

```text
Si futur=A -> "Tu sais que si tu changes rien, tu seras encore plus épuisé."
Si futur=C -> "Tu vois le burnout arriver."
Si prêt=A -> "Mais t'es prêt à changer. C'est maintenant ou jamais."
Si prêt=B -> "T'as peur de pas y arriver, mais t'es prêt à essayer."
```

### Clôture empathique

```text
"On a compris. On va t'aider."
```

## Algorithme de sélection

1. Calculer un "score d'intensité" basé sur les réponses A/B vs C/D
2. Sélectionner les phrases des blocs prioritaires
3. Assembler en respectant 600 caractères max
4. Prioriser : Bloc 1 > Bloc 4 > Bloc 6 > Bloc 5 > Bloc 7 > Bloc 2 > Bloc 3

## Structure technique

### Nouveau fichier : `src/utils/generateSummary.ts`

```typescript
interface SummaryProfile {
  // Rythme de vie
  restIssue: 'extreme' | 'cant_stop' | 'guilt' | 'healthy';
  morningRoutine: 'phone_addict' | 'strict' | 'inconsistent' | 'relaxed';
  dayOff: 'busy' | 'work_anyway' | 'lost' | 'enjoys';
  
  // Objectifs
  goalFeeling: 'next_please' | 'never_enough' | 'numb' | 'celebrates';
  lastPleasure: 'forgotten' | 'guilt_after' | 'dont_know' | 'regular';
  
  // Corps
  sleep: 'minimal' | 'tired_anyway' | 'irregular' | 'good';
  food: 'forgets' | 'fuel_only' | 'cycles' | 'balanced';
  
  // Mental
  innerVoice: 'not_enough' | 'fear_collapse' | 'comparison' | 'kind';
  mask: 'always' | 'sometimes' | 'lost_identity' | 'authentic';
  emptyPhrase: 'exactly' | 'partly' | 'not_really' | 'not_at_all';
  
  // Parcours
  triedSolutions: string[];
  solutionResult: 'relapsed' | 'didnt_help' | 'helped_bit' | 'worked';
  
  // État
  exhaustionLevel: number;
  
  // Projection
  futureVision: 'more_exhausted' | 'scared' | 'burnout' | 'fine';
  readyToChange: 'now_or_never' | 'afraid_but_yes' | 'unsure' | 'not_really';
}
```

## Fichiers à modifier

1. **Créer** `src/utils/generateSummary.ts` - Logique complète d'analyse et génération
2. **Modifier** `src/components/quiz/Quiz.tsx` - Passer `answers` au ConfirmationPage
3. **Modifier** `src/components/quiz/ConfirmationPage.tsx` - Afficher le résumé stylisé

## Rendu visuel sur la page de confirmation

```text
+-------------------------------------------+
|              [Icone check vert]           |
|                                           |
|        C'est envoyé, Thomas !             |
|                                           |
|   +-----------------------------------+   |
|   |  CE QU'ON A COMPRIS               |   |
|   |                                   |   |
|   |  "Tu tournes à 100% en perma-     |   |
|   |  nence. Le matin, t'es déjà sur   |   |
|   |  ton téléphone. Quand t'atteins   |   |
|   |  un objectif, tu passes direct    |   |
|   |  au suivant. Ta voix intérieure   |   |
|   |  te dit que t'es jamais assez     |   |
|   |  bien. T'as essayé la thérapie,   |   |
|   |  ça a marché un temps puis t'as   |   |
|   |  rechuté. Aujourd'hui, t'es à     |   |
|   |  7/10 sur l'épuisement. Mais      |   |
|   |  t'es prêt à changer. On va       |   |
|   |  t'aider."                        |   |
|   +-----------------------------------+   |
|                                           |
|   Ton diagnostic est en route...          |
|                                           |
|   [Box: Prochaines étapes]               |
+-------------------------------------------+
```

## Etapes d'implementation

1. Creer `src/utils/generateSummary.ts` avec toute la logique d'analyse des 12 questions
2. Modifier `Quiz.tsx` pour passer les `answers` au ConfirmationPage
3. Modifier `ConfirmationPage.tsx` pour afficher le resume dans une box stylisee
