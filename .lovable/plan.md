

## Corriger le débordement noir autour du calendrier GHL

Le problème : le conteneur `div` avec `bg-card` et `rounded-2xl` est plus grand que le contenu réel de l'iframe du calendrier. L'iframe a un `minHeight: 1000px` et le widget GHL à l'intérieur a un fond clair, mais le conteneur autour affiche `bg-card` (fond sombre en dark mode) dans les zones non couvertes par le widget.

### Changement

**`src/components/quiz/ConfirmationPage.tsx`** (lignes 69-76) :
- Retirer `bg-card`, `border`, et `rounded-2xl` du conteneur pour éliminer le cadre noir visible autour du calendrier
- Rendre le conteneur transparent pour que seul le contenu de l'iframe soit visible
- Optionnellement ajouter `bg-white rounded-2xl` pour que le fond corresponde au fond blanc du widget GHL

