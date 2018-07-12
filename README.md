# Instructions
## Running the app locally
### Install programs

install [git bash][git bash]  
install [node][node]

install angular-cli:  
```npm install -g @angular/cli``` 

install typings:  
```npm install -g typings```

install typescript:  
```npm install -g typescript``` 

### Clone Repo
in git bash (or other terminal):  
```git clone git@github.com:simubank/project5-asteroids.git```  
change to Development branch:  
```git checkout development```

### Install Dependencies
navigate to td-generic-group-project/ folder  

install dependencies:  
```npm install``` 

### Run the app locally
run the website:  
```ng serve```  

Navigate to http://localhost:4200/.  
The app will automatically reload if you change any of the source files.  

## Deploying to Firebase
### Build the project
```ng build --prod```

### Install firebase tools
```npm install -g firebase-tools```

### Login to Firebase
```firebase login``` (Try with ```--interactive``` if it doesn't work)

### To test the app locally
```firebase serve```
Navigate to http://localhost:5000

### Start deployment
```firebase init```
* Select the project
* Use default Database Rules
* Overwrite it
* Overwrite package.json
* Overwrite index.js
* Install dependencies (once)
* Choose "dist" folder
* Choose __yes__ to configure as a single-page app
* Choose __no__ to not overwrite the index.html


### Deploy!
```firebase deploy```

[git bash]: https://git-scm.com/downloads  
[node]: https://nodejs.org/en/  

Tutorial for angular cli + angularfire + firebase: https://medium.com/codingthesmartway-com-blog/building-an-angular-5-project-with-bootstrap-4-and-firebase-4504ff7717c1  
Tutorial for deploying from angular cli to firebase : https://coryrylan.com/blog/deploy-angular-cli-apps-to-firebase
