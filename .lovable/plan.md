

## Revenir à la taille originale du calendrier GHL

La première intégration utilisait :
- **Largeur** : `80vw` avec la technique de breakout centering (`left-1/2 right-1/2 -ml-[40vw] -mr-[40vw]`)
- **Hauteur** : `minHeight: 800px`

### Changement

Dans `src/components/quiz/ConfirmationPage.tsx`, remplacer le conteneur actuel (650×650px fixe) par le style original breakout :

```tsx
<motion.div
  className="mt-10 relative left-1/2 right-1/2 -ml-[40vw] -mr-[40vw] w-[80vw]"
>
  <div className="rounded-2xl overflow-hidden border border-border bg-card">
    <iframe
      src="https://api.leadconnectorhq.com/widget/booking/mAIicXExqqCZze4fyoSD"
      style={{ width: "100%", border: "none", overflow: "hidden", minHeight: "800px" }}
      scrolling="no"
      id="mAIicXExqqCZze4fyoSD_1773508800917"
      title="Calendrier de réservation"
    />
  </div>
</motion.div>
```

Suppression du titre "Réserve ton créneau" et du wrapper à largeur fixe.

