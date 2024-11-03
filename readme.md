# Simulation de Gravité et de Collisions

Ce projet est une simulation visuelle de particules évoluant dans un environnement 2D. Chaque particule possède une masse, une direction, et est affectée par la gravité, permettant de créer des animations simulant la chute libre et les collisions. Des objets géométriques (segments, cercles) servent également de colliders et peuvent être déplacés à la souris pour interagir avec les particules.

## Fonctionnalités

- **Génération aléatoire de particules** : Les particules sont créées avec des couleurs et directions aléatoires.
- **Simulation de la gravité** : Chaque particule se déplace vers le bas en fonction de sa masse.
- **Détection et gestion des collisions** : Les particules rebondissent lorsqu'elles atteignent les bords de l'écran ou entrent en contact avec les colliders.
- **Déplacement des objets géométriques** : Les colliders (segments, cercles) peuvent être déplacés dans le canvas à l'aide de la souris, permettant une interaction en temps réel avec la simulation.
- **Animation en temps réel** : Utilisation de `requestAnimationFrame` pour une animation fluide.

## Technologies

- **HTML5 Canvas** : Pour le rendu 2D.
- **JavaScript (ES6)** : Langage principal pour la logique de simulation.
- **Node.js & Express.js** : Serveur local pour héberger et exécuter l'application web.


## Installation

1. Clonez le dépôt :
   ```bash
   git clone https://github.com/Abdoul-Majid/nom-du-projet.git
2. Installez les dépendances :
```
npm install
```
3. Lancez le serveur :
```
node server.js
```
4. Accédez à l'application dans votre navigateur :
```
http://localhost:3000
```

