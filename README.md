# DemoQA Automation

Projeto de automação com API (Mocha) e Frontend (Cypress + BDD).

## ✅ Implementado

- [x] Suite completa de testes de API (56 testes)
- [x] Sistema de tags
- [x] **Cypress instalado e configurado**
- [x] **Suporte BDD com Cucumber**
- [ ] Page Objects
- [ ] Features BDD
- [ ] CI/CD

## 🚀 Como Executar

### Setup
```bash
npm install
```

### Testes de API
```bash
npm run test:api
```

### Testes de Frontend (Cypress)
```bash
# Abrir Cypress UI (recomendado para desenvolvimento)
npm run cy:open

# Executar em modo headless
npm run cy:run
```

## 🌲 Cypress

### Configuração
- ✅ Cypress 13.6.0 instalado
- ✅ Cucumber preprocessor configurado
- ✅ Custom commands:
  - `cy.removeAds()` - Remove anúncios do DemoQA
  - `cy.waitUntil()` - Espera condicional
- ✅ Manipulação global de erros
- ✅ Fixtures para dados de teste

### Estrutura
```
cypress/
├── e2e/                # Features BDD (a criar)
├── support/
│   ├── commands.js     # Custom commands
│   └── e2e.js          # Setup global
└── fixtures/
    └── sample-upload.txt
```

## 📊 Cobertura Atual

- **56 testes de API** ✅
- **Cypress configurado** ✅
- **Testes de frontend** ⏳ (próximo)

## 🎯 Próximos Passos

1. Criar Page Objects
2. Criar Features BDD
3. Criar Step Definitions
4. Adicionar CI/CD
