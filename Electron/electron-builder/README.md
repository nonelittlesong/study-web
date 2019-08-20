# electron-builder.yml

- [YAML官网](https://yaml.org/)

```yml
appId: com.example.app
copyright: Example co
productName: MyApp

asar: true

directories:
  buildResources: dist-assets/
  output: dist/

files:
  - package.json
  - init.js
  - build/
  - node_modules/

dmg:
  contents:
    - type: link
      path: /Applications
      x: 410
      y: 150
    - type: file
      x: 130
      y: 150

mac:
  target: dmg
  category: public.app-category.tools

win:
  target: nsis

linux:
  target:
    - deb
    - AppImage
```

# package.json
```json
{
  "name": "electron-react-redux-boilerplate",
  "version": "0.0.0",
  "description": "electron-react-redux-boilerplate",
  "main": "init.js",
  "author": {
    "name": "Jordan Schroter",
    "email": "email@author.com"
  },
  "repository": "https://github.com/jschr/electron-react-redux-boilerplate",
  "license": "MIT",
  "dependencies": {
    "@babel/register": "^7.0.0",
    "connected-react-router": "^5.0.1",
    "history": "^4.6.3",
    "prop-types": "^15.5.10",
    "react": "^16.2.0",
    "react-dom": "^16.2.0",
    "react-redux": "^5.0.2",
    "react-router": "^4.1.2",
    "redux": "^4.0.0",
    "redux-actions": "^2.2.1",
    "redux-localstorage": "^0.4.1",
    "redux-thunk": "^2.2.0"
  },
  "devDependencies": {
    "@babel/cli": "^7.1.2",
    "@babel/core": "^7.1.2",
    "@babel/node": "^7.0.0",
    "@babel/plugin-proposal-class-properties": "^7.1.0",
    "@babel/plugin-proposal-decorators": "^7.1.2",
    "@babel/preset-env": "^7.1.0",
    "@babel/preset-react": "^7.0.0",
    "babel-eslint": "^10.0.1",
    "browser-sync": "^2.23.6",
    "chai": "^4.1.0",
    "electron": "^3.0.0",
    "electron-builder": "^20.0.7",
    "electron-devtools-installer": "^2.2.4",
    "electron-mocha": "^6.0.1",
    "eslint": "^5.1.0",
    "eslint-config-prettier": "^3.1.0",
    "eslint-plugin-react": "^7.1.0",
    "npm-run-all": "^4.0.1",
    "prettier": "^1.13.7",
    "redux-mock-store": "^1.2.2",
    "rimraf": "^2.5.4"
  },
  "scripts": {
    "postinstall": "electron-builder install-app-deps",
    "develop": "npm run private:compile -- --source-maps true && run-p -r private:watch private:serve",
    "test": "electron-mocha --renderer -R spec --require @babel/register test/**/*.spec.js",
    "lint": "eslint --no-ignore scripts app test *.js",
    "format": "npm run private:format -- --write",
    "check-format": "npm run private:format -- --list-different",
    "pack": "run-s private:clean private:compile private:build:all",
    "pack:mac": "run-s private:clean private:compile private:build:mac",
    "pack:win": "run-s private:clean private:compile private:build:win",
    "pack:linux": "run-s private:clean private:compile private:build:linux",
    "private:build:all": "electron-builder -mwl",
    "private:build:mac": "electron-builder --mac",
    "private:build:win": "electron-builder --win",
    "private:build:linux": "electron-builder --linux",
    "private:watch": "npm run private:compile -- --source-maps true --watch --skip-initial-build",
    "private:serve": "babel-node scripts/serve.js",
    "private:compile": "babel app/ --copy-files --out-dir build",
    "private:clean": "rimraf build",
    "private:format": "prettier \"babel.config.js\" \"scripts/*.js\" \"app/**/*.js\" \"test/**/*.js\""
  }
}
```