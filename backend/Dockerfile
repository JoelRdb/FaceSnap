# ÉTAPE 1 : Utiliser une image de base Node.js
FROM node:lts-alpine

# ÉTAPE 2 : Définir le répertoire de travail dans le conteneur
WORKDIR /usr/src/app

# ÉTAPE 3 : Copier et installer les dépendances pour utiliser le cache Docker
# Nous n'avons besoin que de package.json et package-lock.json pour cette étape.
COPY package*.json ./
RUN npm install

# ÉTAPE 4 : Copier le reste du code source
# Cela inclut le fichier de données essentiel : db.json
COPY . .

# ÉTAPE 5 : Exposer le port par défaut de json-server
EXPOSE 3000

# ÉTAPE 6 : Définir la commande de démarrage du conteneur (CMD)
# La commande 'npm start' est celle qui exécute 'npx json-server --watch db.json run'
CMD [ "npm", "start" ]