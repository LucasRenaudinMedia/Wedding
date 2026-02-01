# Wedding (GitHub Pages)

Ce dépôt contient une page statique (dans `docs/`) pour partager des infos pratiques avec les invités.

## Éditer le contenu

- Modifiez les champs dans `docs/assets/site.js` (objet `CONFIG`).
- La page est `docs/index.html`.

## Publier sur GitHub Pages

1. GitHub → **Settings** → **Pages**
2. **Build and deployment** → **Source**: *Deploy from a branch*
3. **Branch**: `main` / **Folder**: `/docs`

## Anti-indexation (robots / moteurs de recherche)

- `docs/robots.txt` bloque les robots (`Disallow: /`).
- `docs/index.html` ajoute des balises `noindex`.

Important : GitHub Pages ne permet pas de protéger par mot de passe. La page peut rester accessible à toute personne qui a le lien (même si elle n’est pas indexée).
