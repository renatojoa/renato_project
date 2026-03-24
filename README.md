# DemoQA Automation - Conforme Documento Original

## ✅ Exercícios

### Exercício 1 - API Backend (1 Cenários)
Fluxo completo da BookStore API:
- Criar usuário
- Gerar token
- Autorizar usuário
- Listar livros disponíveis
- Alugar 2 livros
- Verificar livros alugados

### Exercício 2 ao 6 - Frontend (5 Cenários)
2. **Exercício 2**: Forms - Practice Form `@exercicio2`
3. **Exercício 3**: Alerts, Frame & Windows - Browser Windows `@exercicio3`
4. **Exercício 4**: Elements - Web Tables (criar, editar, deletar) `@exercicio4`
5. **Exercício 5**: Widgets - Progress Bar `@exercicio5`
6. **Exercício 6**: Interactions - Sortable (drag and drop) `@exercicio6`

## Executar

### Executar todos os testes
```bash
npm install
npm test            # Tudo
npm run test:api    # Apenas API
npm run test:frontend # Apenas Frontend
```

### Executar por exercício específico
```bash
# Exercício 1 - API Backend
npm run test:exercicio1

# Exercício 2 - Forms
npm run test:exercicio2

# Exercício 3 - Browser Windows
npm run test:exercicio3

# Exercício 4 - Web Tables
npm run test:exercicio4

# Exercício 5 - Progress Bar
npm run test:exercicio5

# Exercício 6 - Sortable
npm run test:exercicio6
```

### Outras opções de execução
```bash
# Executar múltiplos exercícios
npx cypress run --env TAGS="@exercicio1 or @exercicio2"

# Executar apenas testes críticos
npx cypress run --env TAGS="@critical"

# Executar apenas smoke tests
npx cypress run --env TAGS="@smoke"

# Modo interativo (abre o Cypress UI)
npx cypress open
```
