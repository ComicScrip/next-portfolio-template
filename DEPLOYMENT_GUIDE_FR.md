# Déploiement de l'application sur un serveur privé

## Choisir un serveur et un nom de domaine 

* Le choix du provider est libre, cependant il est recommandé de disposer d'au moins un 1 Go de Ram et 30 Go d'espace de stockage . [La procédure suivante a été testée sur ce VPS (ubuntu 20.04)](https://us.ovh.com/us/order/vps/?v=3#/vps/build?selection=~(range~'Essential~pricingMode~'default~flavor~'vps-essential-2-4-80~os~'ubuntu_20_04~datacenters~(SBG~1)))
* Acheter un nom de domaine et le faire pointer sur l'adresse du serveur (il sera référencé dans ce document sous l'alias [NOM DE DOMAINE])


## Installer Docker sur le serveur :

Se connecter en SSH au serveur sous ubuntu, puis tapez les commandes suivantes

```bash
sudo apt-get update
sudo apt-get install -y \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg-agent \
    software-properties-common \
    ufw
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo apt-key fingerprint 0EBFCD88
sudo add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
   $(lsb_release -cs) \
   stable"
sudo apt-get update
sudo apt-get install -y docker-ce docker-ce-cli containerd.io
sudo usermod -aG docker $USER
newgrp docker 
```

## Installation [Caprover](https://caprover.com/docs/get-started.html) :

```
sudo ufw allow 80,443,3000,996,7946,4789,2377/tcp; sudo ufw allow 7946,4789,2377/udp;
docker run -p 80:80 -p 443:443 -p 3000:3000 -v /var/run/docker.sock:/var/run/docker.sock -v /captain:/captain caprover/caprover
```

Attendre 60 secondes

* Aller à l'adresse : http://[NOM DE DOMAINE]:3000/
* Mot de passe : captain42
* Aller à "settings" -> change password (et changez le mot de passe)
* Aller sur le dashboard, section "CapRover Root Domain Configurations", mettre [NOM DE DOMAINE] dans l'input et cliquer sur "update domain", se relogger et cliquer sur "enable https" puis "Force https".

### STEP 1 : créer la base de donnée
  - Caprover > Apps > One-Click Apps/Databases > MySQL
  - App name : portfolio
  - MySQL Root password : [DB_PASS]
  - MySQL version : 5.7
  - Deploy
  - Caprover > Apps > portfolio-db > App config : rajoutez dans la section "port mapping" la valeur 3306 dans les inputs "Server Port" et "Container Port" puis cliquez sur le bouton "Save and Update"

### STEP 2 : créer l'interface d'admin de la base de donnée
  - Caprover > Apps > One-Click Apps/Databases > PHPMyAdmin
  - app name : db-admin
  - Deploy
  - Caprover > Apps > db-admin > Enable HTTPS et cocher Force HTTPS by redirecting all HTTP traffic to HTTPS et "Save & Update"
  - Aller à https://<span>db-admin.[NOM DOMAINE]/</span>
  - Serveur : srv-captain---portfolio-db
  - utilisateur : root
  - mot de passe : [DB_PASS]
  
Si vous voulez importer une base existante : 
  - Aller sur l'onglet importer
  - Sélectionner votre dump sql dans choisir un ficher
  - Décocher "Activer la vérification des clés étrangères dans "Autres options"
  - Appuyer sur Executer

Si vous voulez partir d'une base vierge : 
  - Cliquer sur "Nouvelle base de données" dans le menu de gauche de PHPMyAdmin.
  - Entrer "portfolio_database" dans le champ "Nom de la base de donnée", puis cliquer sur le bouton "creer" à droite du champ nom.

### STEP 3 : Mettre en place l'application Next
  - Caprover > Apps > entrer "server" dans l'input, cocher "Has persistant data" , cliquer sur le bouton "Create New App"
  - Caprover > Apps > server > Enable HTTPS et cocher Force HTTPS by redirecting all HTTP traffic to HTTPS et cliquer sur "Save & Update"
  - onglet App Configs, Environmental Variables: cocher "bulk edit" et copier dans le champ :
```
NODE_ENV=production
DATABASE_URL=mysql://root:[DB_PASS]@[NOM DOMAINE]:3306
SECRET=[CHOISIR UN SECRET LONG ET IMPOSSIBLE A DEVINER]
NEXTAUTH_URL=https://<span>www.[NOM DOMAINE]/</span>
NEXT_PUBLIC_UPLOADCARE_KEY=[CLE PUBLIQUE UPLOADCARE]
SMTP_HOST=in-v3.mailjet.com
SMTP_PORT=465
SMTP_USER=[SMTP USER]
SMTP_PASSWORD=[SMTP PASSWORD]
CONTACT_FORM_RECIPIENT=[YOUR EMAIL]
MAILER_FROM=[YOUR EMAIL]
NEXT_PUBLIC_HCAPTCHA_SITEKEY=[CLE PUBLIQUE HCAPTCHA]
GITHUB_ID=[GITHUB ID]
GITHUB_SECRET=[GITHUB SECRET]
```
  - Adapater les variables à vos propres identifiants 
  - Cliquer sur "Save & Update"
  - Onglet "Deployement"
  - Aller à Method 3: Deploy from Github/Bitbucket/Gitlab
  - Repository : [URL_REPO_API]
  - Branch : main
  - Username : [GH_USER]
  - Password : [GH_PASSWORD]
  - Cliquer sur "Save & Update"
  - Copier la valeur du champs apparu dans "Method 3: Deploy from Github/Bitbucket/Gitlab"
  - Aller sur https://[URL_REPO_API]/settings/hooks
  - Cliquer sur "add webhook"
  - Coller la valeur de l'input copiée précédement dans le champs Payload URL de github, cliquer sur le bouton vert "Add webhook". Desormais, après chaque push sur la branche main du repository de l'API, elle sera redéployée automatiquement pour intégrer les nouveaux développements.
