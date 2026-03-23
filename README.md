# DemoQA Automation

Projeto completo com API e Frontend (BDD + Page Objects).

## ✅ Implementado

- [x] Suite completa de testes de API (56 testes)
- [x] 6 Page Objects
- [x] **2 Features BDD completas**
- [x] **Step Definitions**
- [ ] CI/CD

## 🚀 Como Executar

### Testes de API
```bash
npm run test:api
```

### Testes de Frontend
```bash
# Todos os testes de frontend
npm run test:frontend

# Com browser visível
npm run test:frontend:headed

# Testes específicos
npm run test:forms      # Formulário
npm run test:tables     # Tabelas

# Por criticidade
npm run test:critical   # Testes críticos
npm run test:smoke      # Smoke tests
```

## 🎭 Features BDD Implementadas

### 1. forms.feature
```gherkin
@frontend @regression
Feature: Practice Form Submission
  
  @smoke @forms @critical
  Scenario: Fill and submit practice form successfully
    Given I am on the DemoQA homepage
    When I navigate to Forms section
    And I click on Practice Form
    And I fill all form fields with random data
    And I upload a text file
    And I submit the form
    Then a confirmation popup should be displayed
    When I close the popup
    Then the form should be ready for new submission
```

**Validações:**
- ✅ Student Name = dados preenchidos
- ✅ Student Email = email digitado
- ✅ Gender, Mobile, Subjects
- ✅ Address, State and City
- ✅ Modal exibido corretamente
- ✅ Formulário pronto após fechar

### 2. web-tables.feature
```gherkin
@frontend @regression
Feature: Web Tables Management
  
  @smoke @tables @critical
  Scenario: Create, edit, and delete a record
    Given I am on the DemoQA homepage
    When I navigate to Elements section
    And I click on Web Tables
    And I create a new record with random data
    Then the new record should appear in the table
    When I edit the newly created record
    Then the record should be updated
    When I delete the edited record
    Then the record should be removed from the table
```

## 📊 Cobertura Atual

- **56 testes de API** ✅ (100% passando)
- **2 testes de Frontend** ✅ (Cypress + BDD)
  - Forms: Cadastro completo com validação
  - Web Tables: CRUD completo

## 🏗️ Arquitetura

```
cypress/
├── e2e/
│   ├── forms.feature           # @smoke @forms @critical
│   └── web-tables.feature      # @smoke @tables @critical
├── support/
│   ├── pages/                  # 6 Page Objects
│   ├── step-definitions/
│   │   ├── common.js          # Steps compartilhados
│   │   ├── forms.js           # Steps de formulário
│   │   └── web-tables.js      # Steps de tabelas
│   └── helpers/
│       └── dataHelper.js      # Geração de dados
```

## 🎯 Próximos Passos

1. Adicionar mais features (Alerts, Progress Bar, Drag&Drop)
2. CI/CD com Azure DevOps
3. Relatórios de testes
