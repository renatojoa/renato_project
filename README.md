# DemoQA Automation

Projeto de automação de testes para o site DemoQA.

## ✅ Implementado

- [x] Configuração inicial do projeto
- [x] **Teste completo de API - BookStore Flow**

## 🚀 Como Executar

### Setup
```bash
npm install
```

### Executar Testes de API
```bash
# Executar o fluxo completo da API
npm run test:api:flow
```

## 📊 Cobertura Atual

- **6 testes de API** - Fluxo completo BookStore
  1. Criar usuário
  2. Gerar token
  3. Verificar autorização
  4. Listar livros disponíveis
  5. Alugar 2 livros
  6. Verificar detalhes do usuário com livros alugados

## 🎯 Próximos Passos

1. Adicionar testes de API para cenários negativos
2. Adicionar testes de API para edge cases
3. Implementar testes de frontend com Cypress
4. Adicionar sistema de tags para organização
