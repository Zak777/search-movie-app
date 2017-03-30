![screenshot](https://cloud.githubusercontent.com/assets/15364747/24530704/69251466-15bc-11e7-8f72-92d9c86dfc67.PNG)


Tehnology usage: HTML, CSS, Stylus, JS, ES6, React, React-Router, Babel, Webpack

1. Copy or clone repo
2. Install all dependencies, open your local directory with downloaded files in command line and input 'npm install'. Wait while all dependencies will be installed
3. For 'development mode' input in command line 'npm run dev'. After the local server will be started open in your browser 'localhost:8080'
4. For 'production mode' input in command line 'npm run prod'. Wait some time while will be created directory 'dist' with all files. Open 'index.html' in the browser

Recommendation: 
1. If you want a beautiful URL in browser(without symbol '#') then in file main.js in line 3 and 13 change 'hashHistory' to 'browserHistory'(it works only on a server, example: localhost or remote).
2. If you want another theme then in filename 'index.html' in tag '<link>' change attribute 'href' to theme from the list below:
  - solar.min.css (default)
  - slate.min.css
  - superhero.min.css
  - spacelab.min.css
  - readable.min.css

Note: sometimes after you changed the template, active link in top menu can display not well it's easy correct in file 'styles.styl' in class '.active' in tag 'color'
