# ArgentBank (Utilisez une API pour un compte utilisateur bancaire avec React) - Projet 13 - OpeClassrooms

Dans ce projet, nous avons développé une application bancaire en utilisant React et Redux pour créer une expérience utilisateur dynamique et réactive.

Notre mission principale sera d'intégrer le front-end avec le back-end via des appels API.

Nous avons utilisé

- Des appels à l'API REST pour connecter les deux parties de l'application, assurant une communication fluide entre le client et le serveur.
- React pour développer l'interface utilisateur de l'application bancaire, en concentrant sur la création d'un tableau de bord complet et responsive pour les utilisateurs.

## objectifs

- S'authentifier à une API en utilisant le jeton d’accés JWT
- Implémenter un gestionnaire d'état dans une application React à l’aide de Redux et Redux Toolkit.
- Intéragir avec une API (Axios)
- Modéliser une API (Swagger)

## Technologies

React, Redux & Redux Toolkit ,React Router, Vite ,Axios

## Frontend

### Instructions

Cloner le projet

```bash
  git clone https://github.com/hajernaas/P13_argentBank.git
```

Accéder au répertoire du projet

```bash
  cd P13_argentBank
```

Installer les dépendances

```bash
  npm install
```

Démarrer le serveur

```bash
  npm run dev
```

## Backend

Consultez le repo github backend pour la documentation:
([github.com/OpenClassrooms-Student-Center/Project-10-Bank-API/](https://github.com/OpenClassrooms-Student-Center/Project-10-Bank-API/tree/master))

Argent Bank utilise la pile technologique suivante :

- [Node.js v12](https://nodejs.org/en/)
- [MongoDB Community Server](https://www.mongodb.com/try/download/community)

Assurez-vous d'avoir les bonnes versions et téléchargez les deux packages. Vous pouvez vérifier cela en utilisant les commandes suivantes dans votre terminal :

```bash
# Check Node.js version
node --version

# Check Mongo version
mongo --version
```

### Instructions

- Forker ce repo
- Cloner le repo sur votre ordinateur
- Ouvrir une fenêtre de terminal dans le projet cloné
- Exécuter les commandes suivantes :

```bash
# Go to the back-end folder
cd back-end-argent-bank

# Install dependencies
npm install

# Start local dev server
npm run dev:server

```

Votre serveur devrait maintenant fonctionner à l'adresse http://localhost:3001 et vous aurez désormais deux utilisateurs dans votre base de données MongoDB !
Une fois que vous avez exécuté le script populate-db, vous devriez avoir deux utilisateurs dans votre base de données :

#### Tony Stark

- First Name: `Tony`
- Last Name: `Stark`
- Email: `tony@stark.com`
- Password: `password123`

#### Steve Rogers

- First Name: `Steve`,
- Last Name: `Rogers`,
- Email: `steve@rogers.com`,
- Password: `password456`
