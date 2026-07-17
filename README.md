# PRO1X — Frontend Next.js

Frontend premium (mobile-first) pour PRO1X, plateforme de pronostics sportifs par
abonnement. Généré à partir des 8 prompts de spécification, avec un thème
"wealth-management" (teal profond / slate / ambre, Inter + Playfair Display).

## Démarrage

```bash
npm install
cp .env.local.example .env.local   # ajuster NEXT_PUBLIC_API_URL si besoin
npm run dev
```

L'app tourne sur http://localhost:3000 et attend l'API Django sur
`http://localhost:8000/api` par défaut (configurable via `NEXT_PUBLIC_API_URL`).

Autres commandes utiles :

```bash
npm run typecheck   # tsc --noEmit (vérifié : 0 erreur)
npm run lint        # next lint (vérifié : 0 warning)
npm run build        # build de production
```

## Structure

```
app/
  layout.tsx          Layout racine, polices, bottom nav (Prompt 1)
  page.tsx             Accueil — onglets Safe/Opportunités/Risk (Prompt 3)
  login/page.tsx        Connexion (Prompt 2)
  resultats/page.tsx    Historique + preuve d'intégrité (hash) (Prompt 4)
  bankroll/page.tsx     Recommandations de mise (Prompt 5)
  compte/page.tsx        Profil, abonnement CinetPay, affiliation (Prompt 6)
components/
  BottomNav.tsx          Navigation basse, 4 onglets
  CouponCard.tsx         Carte coupon (accueil)
  ResultCard.tsx          Carte résultat (gagné/perdu + hash vérifié)
  CouponDetail.tsx        Drawer/modal détail coupon (Prompt 7)
  Badge.tsx, LockIcon.tsx, Skeleton.tsx, CouponSkeleton.tsx  (Prompt 8)
lib/
  api.ts                  Client Axios + intercepteur JWT + fonctions par endpoint
  utils.ts                cn(), formatDateFr(), todayISO()
providers/
  QueryProvider.tsx        Provider React Query (client component)
types/
  index.ts                 Types partagés (Coupon, User, BankrollRecommendation, ...)
styles/
  globals.css              Reset Tailwind + classe .font-serif
```

## Décisions techniques

- **Auth** : le token JWT est stocké côté client via `js-cookie` (nom de cookie
  `pro1x_access` / `pro1x_refresh`) et injecté automatiquement dans chaque
  requête Axios. Si le backend doit poser un cookie **httpOnly** signé côté
  serveur (recommandé pour la prod), il faudra remplacer l'intercepteur par
  `withCredentials` pur et supprimer la lecture du cookie côté client — le
  point d'entrée est isolé dans `lib/api.ts`.
- **shadcn/ui** : plutôt que d'installer le scaffold shadcn complet (Radix +
  `components.json`), les composants ont été reconstruits à la main dans le
  même esprit (accessibles, composables, `cn()` pour merger les classes) afin
  d'éviter tout rendu "template" et de garder le bundle léger. La structure
  permet d'ajouter de vrais composants shadcn plus tard sans rien casser.
- **Verrouillage premium** : chaque carte s'appuie sur `coupon.is_locked`
  renvoyé par l'API plutôt que sur une logique de rôle côté client — la
  décision métier reste côté Django.
- **Icônes bankroll** : Tortue / Lapin / Zap (`lucide-react`) pour
  Conservateur / Modéré / Agressif, comme demandé.

## Vérifications effectuées

- `npm install` : OK (408 paquets)
- `tsc --noEmit` : 0 erreur
- `next lint` : 0 warning
- Non exécuté ici : `next build` (nécessite un accès réseau à Google Fonts au
  build, indisponible dans cet environnement sandboxé) — à lancer côté client.
# pro1x-frontend
