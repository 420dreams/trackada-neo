# Projet trackada

Petit script Node.js qui vérifie l'avancement des projets du bloc 1 Ada Tech.
Il regarde, pour chaque projet, si le dossier existe et si les fichiers obligatoires sont présents, puis affiche un pourcentage d'avancement.

## 1. Récupérer le projet

Cloner le dépôt :

```bash
git clone https://github.com/420dreams/trackada-neo.git
cd trackada-neo
```

## 2. Fonctionnement global

Déroulement du script `checktrack.js` :

1. Il charge `track.json`.
2. Il construit le chemin du dossier qui contient tous les projets .
3. Si ce dossier n'existe pas → message d'erreur `❌` et arrêt.
4. Pour chaque projet de `track.json` :
   - dossier introuvable → `❌ nom : dossier introuvable`
   - tous les fichiers présents → `✅ nom : complet (x/x) - 100%`
   - fichiers manquants → `⚠️ nom : x/y fichiers - z%` + la liste des fichiers manquants
5. Il affiche un bilan : `📊 nombre de projets complets / total - pourcentage`.
6. Code de sortie : `0` si tous les projets sont complets, `1` sinon.

```json
{ "name": "nom-du-dossier", "required": ["index.html", "README.md"] }
```

## 3. ⚠️ À modifier si le projet ne marche pas sur un autre ordinateur

Le script cherche les projets dans un chemin fixe, construit à partir du dossier personnel de l'utilisateur.
C'est dans `checktrack.js`, ligne 7:

```js
const adaPath = join(homedir(), "code", "ada-tech", "bloc1", "projets")
```

Attention aussi aux noms des dossiers : ils doivent correspondre exactement aux valeurs `name` de `track.json` (sinon → `dossier introuvable`). Le dossier cloné s'appelle `trackada-neo` : renommez-le en `trackada` s'il doit être reconnu lui-même par le script.

---

## 4. Lancer le projet

Depuis le dossier du projet :

```bash
node checktrack.js
```

ou, de façon équivalente :

```bash
npm start
```