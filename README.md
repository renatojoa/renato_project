# DemoQA Automation

Projeto com Page Object Model e geração automática de dados.

## ✅ Implementado

- [x] Suite completa de testes de API (56 testes)
- [x] Cypress configurado
- [x] **6 Page Objects implementados**
- [x] **DataHelper para geração de dados**
- [ ] Features BDD
- [ ] Step Definitions
- [ ] CI/CD

## 🚀 Como Executar

```bash
npm install
npm run test:api        # Testes de API
npm run cy:open         # Cypress UI
```

## 📁 Page Objects

### Implementados
1. **HomePage.js**
   - Navegação entre seções
   - Remoção de anúncios

2. **PracticeFormPage.js**
   - Preenchimento de formulário
   - Upload de arquivos
   - Validação de dados submetidos
   - Verificação do modal de confirmação

3. **WebTablesPage.js**
   - CRUD completo de registros
   - Busca e validação de dados

4. **BrowserWindowsPage.js**
   - Manipulação de janelas e abas
   - Stub de window.open

5. **ProgressBarPage.js**
   - Interação com barra de progresso
   - Espera condicional com waitUntil

6. **SortablePage.js**
   - Drag and drop
   - Verificação de ordenação

### DataHelper
```javascript
DataHelper.generateFormData()      // Dados de formulário
DataHelper.generateRecordData()    // Dados de tabela
DataHelper.generateFirstName()     // Nome aleatório
DataHelper.generateEmail()         // Email único
```

## 🏗️ Arquitetura

```
cypress/support/
├── pages/                  # Page Objects
│   ├── HomePage.js
│   ├── PracticeFormPage.js
│   ├── WebTablesPage.js
│   ├── BrowserWindowsPage.js
│   ├── ProgressBarPage.js
│   └── SortablePage.js
└── helpers/
    └── dataHelper.js      # Geração de dados
```

## 🎯 Próximos Passos

1. Criar Features BDD usando os Page Objects
2. Criar Step Definitions
3. Executar testes de frontend
