#installation
git clone https://github.com/Angelo007-dev/candidate-app.git
cd candidate-app

#lancer les conteneurs Docker

docker compose up --build

#Tets
#backend

npm run test
npm run test:converage

#Frontend
npx cypress:run 

