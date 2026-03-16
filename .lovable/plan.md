

## Mettre à jour le modèle Claude vers Sonnet 4.6

Changer l'identifiant du modèle dans l'Edge Function.

### Changement

**`supabase/functions/generate-analysis/index.ts`** — remplacer `claude-sonnet-4-20250514` par `claude-sonnet-4-6-20260217` dans l'appel à l'API Anthropic (fonction `callClaude`).

**`src/services/analyseService.ts`** — même changement (fichier legacy, ligne 92).

