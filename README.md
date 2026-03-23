# DemoQA Automation

Projeto de automação de testes para o site DemoQA.

## ✅ Implementado

- [x] Configuração inicial do projeto
- [x] Teste completo de API - BookStore Flow
- [x] **Suite completa de testes de API**

## 🚀 Como Executar

### Setup
```bash
npm install
```

### Executar Testes de API
```bash
# Executar TODOS os testes de API
npm run test:api

# Ou executar suites específicas:
npm run test:api:flow      # Fluxo completo (6 testes)
npm run test:api:users     # Criação de usuários (15 testes)
npm run test:api:auth      # Autenticação (13 testes)
npm run test:api:books     # Listagem de livros (8 testes)
npm run test:api:rental    # Aluguel de livros (14 testes)
```

## 📊 Cobertura Atual

### **56 testes de API** distribuídos em:

#### 1. BookStore Flow (6 testes)
- Fluxo completo: criar → token → autorizar → listar → alugar → verificar

#### 2. User Creation (15 testes)
- ✅ Testes positivos: criar usuários válidos
- ❌ Testes negativos: sem username, sem password, senha fraca
- 🎯 Edge cases: username longo, caracteres especiais

#### 3. Authentication (13 testes)
- ✅ Testes positivos: gerar token, verificar autorização
- ❌ Testes negativos: credenciais erradas, sem autenticação
- 🎯 Edge cases: token inválido, headers malformados

#### 4. Books Listing (8 testes)
- ✅ Testes positivos: listar todos os livros, buscar por ISBN
- ❌ Testes negativos: endpoint inválido, método não permitido
- 🎯 Performance: tempo de resposta

#### 5. Book Rental (14 testes)
- ✅ Testes positivos: alugar 1 livro, alugar múltiplos livros
- ❌ Testes negativos: ISBN inválido, sem livros, sem userId
- 🎯 Edge cases: livro já alugado, ISBNs duplicados

## 🎯 Próximos Passos

1. Adicionar sistema de tags (@critical, @smoke, @regression)
2. Implementar testes de frontend com Cypress
