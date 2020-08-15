# Web Menu
Customer facing app built with REACT

## Run the project
To run locally, create a `.env` file at the root directory of the this project with the following entries:
```
REACT_APP_API_BASE_URL=<local backend address, maybe http://localhost:3000>
```

Then run in terminal:
```
yarn install
yarn start
```
or
```
npm install
npm start
```

## Project Structure
```
├── public
│   ├── css *includes customization on bootstrap*
│   ├── fonts
│   └── js - *includes customization on bootstrap*
└── src
    ├── components - shared (material design) stuff, best to refactor here whenever possible during future development
    ├── narrow-screen - mobile specific stuff
    │   ├── components
    │   └── screens
    └── wide-screen - desktop specific stuff
```

## Deployment
### Production (deployed from production branch)
https://nomi-smart-menu.netlify.app

### Staging (deployed from master branch)
https://master--nomi-smart-menu.netlify.app
