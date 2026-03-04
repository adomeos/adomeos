

## Plan: Modifier le lien WhatsApp pour ouvrir l'application uniquement

Le bouton dans `ConfirmationPage.tsx` utilise actuellement `https://wa.me/` qui ouvre une conversation. Il faut changer l'URL pour simplement ouvrir l'application WhatsApp.

### Changement

**`src/components/quiz/ConfirmationPage.tsx`** (ligne 68) :
- Remplacer `window.open('https://wa.me/', '_blank')` par `window.open('whatsapp://', '_self')` qui ouvre simplement l'application WhatsApp sans cibler de conversation.

