

## Plan : Envoyer le numéro avec l'indicatif pays

### Problème
Actuellement, le `countryCode` (+33, +1, etc.) reste dans le composant `CapturePage` et n'est jamais transmis. Le numéro envoyé au webhook ne contient que les chiffres sans indicatif.

### Modifications

**1. `src/components/quiz/CapturePage.tsx`**
- Concaténer `countryCode` + numéro normalisé avant d'appeler `onSubmit`
- Le champ `phone` envoyé sera par ex. `+33612345678` ou `+14155551234`

**2. `src/hooks/useQuiz.ts`**
- Aucun changement nécessaire, le `phone` reçu contiendra déjà l'indicatif complet

**3. Edge functions** (`generate-analysis`, `generate-summary`)
- Aucun changement nécessaire, elles transmettent le `phone` tel quel au webhook

### Détail technique

Dans `CapturePage.tsx`, modifier le `handleSubmit` :
```ts
const fullPhone = countryCode + normalizedPhone;
onSubmit({ ...formData, phone: fullPhone });
```

Résultat : le CRM (GHL) recevra `+33612345678` au lieu de `612345678`.

