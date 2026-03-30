

## Plan : Accepter les numéros de téléphone internationaux (9 chiffres ou plus)

### Problème
La validation actuelle exige **exactement 9 chiffres** après normalisation, ce qui bloque les numéros de pays comme le Royaume-Uni (10 chiffres), les USA (10 chiffres), etc.

### Modification

**Fichier : `src/components/quiz/CapturePage.tsx`**

1. Changer la condition de validation du formulaire : `normalizedPhone.length === 9` → `normalizedPhone.length >= 7` (minimum 7 pour couvrir les plus petits formats internationaux)
2. Changer le message d'erreur : afficher l'erreur uniquement si le numéro fait moins de 7 chiffres → "Numéro invalide (minimum 7 chiffres après l'indicatif)"

Deux lignes à modifier, rien d'autre.

