### Configuración incial

Instala protractor:
```
npm install -g protractor
```

Instala webdriver-manager:
```
npm install -g webdriver-manager
```

Actualiza selenium y chromedriver:
```
webdriver-manager update
```

Inicia el servidor de selenium _(debe estar iniciado cada vez que se ejecuten los tests)_:
```
webdriver-manager start
```

Corre los tests:
```
protractor my.protractor-conf.js
```

[Gist con CHEAT-SHEET de Protractor](https://gist.github.com/javierarques/0c4c817d6c77b0877fda)

[GULP Protractor](https://gist.github.com/rocknrollMarc/85296aab8ce8e3645a07)
