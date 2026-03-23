# DemoQA Automation

## ✅ Parte 1 - API (Completo)
Fluxo: criar usuário → token → autorizar → listar → alugar 2 livros → verificar

## ⚙️ Parte 2 - Frontend (Setup Cypress)

### 🚀 Como Executar

#### 1. Instalar dependências
```bash
npm install
```

#### 2. Executar testes de API
```bash
npm run test:api
```

#### 3. Abrir Cypress (UI Mode)
```bash
npm run cy:open
```

Ou usando npx diretamente:
```bash
npx cypress open
```

#### 4. Executar Cypress (Headless)
```bash
npm run cy:run
```

✅ Use `npm run cy:open` ou `npx cypress open`

### 📦 O que foi configurado

- ✅ Cypress 13.6.0
- ✅ Cucumber preprocessor (BDD)
- ✅ Custom commands (removeAds, waitUntil)
- ✅ cypress.config.js
- ✅ Fixtures para upload
