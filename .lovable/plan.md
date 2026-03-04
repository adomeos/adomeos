

## Problème : Le deep link WhatsApp ne fonctionne pas sur mobile

`window.open('whatsapp://', '_self')` ne fonctionne pas de manière fiable sur mobile. Les navigateurs mobiles bloquent souvent `window.open` pour les deep links.

### Solution

**`src/components/quiz/ConfirmationPage.tsx`** : Remplacer `window.open('whatsapp://', '_self')` par `window.location.href = 'whatsapp://'` qui est la méthode standard et fiable pour déclencher un deep link sur mobile.

Ajouter aussi un fallback : si après 2 secondes l'app ne s'est pas ouverte (l'utilisateur est toujours sur la page), rediriger vers le téléchargement WhatsApp web.

