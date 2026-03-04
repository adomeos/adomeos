

## Fix: Bouton WhatsApp sur mobile

Le code actuel utilise `window.location.href = 'whatsapp://'` via JavaScript dans un `onClick`. Sur mobile, certains navigateurs (notamment Safari et Chrome) bloquent les changements de `location.href` vers des custom schemes quand ils sont déclenchés par du JavaScript.

### Solution

**`src/components/quiz/ConfirmationPage.tsx`** : Remplacer le `<Button>` par un lien `<a>` stylisé avec `href="whatsapp://"`. Les navigateurs mobiles gèrent mieux les deep links via des balises `<a>` natives qu'avec du JavaScript.

- Utiliser une balise `<a href="whatsapp://">` avec les mêmes classes CSS que le bouton actuel
- Supprimer le `onClick` JavaScript et le fallback `setTimeout`
- Le navigateur mobile ouvrira directement WhatsApp sans bloquer la navigation

