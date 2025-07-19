# 🧪 Guia de Testes - FitBody

Este documento detalha a estratégia de testes implementada no projeto FitBody, servindo como base de estudo para diferentes tipos de testes em React Native.

## 📋 Visão Geral

O projeto implementa uma estratégia completa de testes que cobre:

- **Testes Unitários**: Componentes, schemas e utilitários
- **Testes de Integração**: Interação entre componentes
- **Testes de Páginas**: Fluxos de navegação
- **Testes de Validação**: Schemas Zod

## 🛠️ Configuração do Ambiente

### **Dependências de Teste**

```json
{
  "@testing-library/react-native": "^12.4.3",
  "@testing-library/jest-native": "^5.4.3",
  "@testing-library/user-event": "^14.5.2",
  "jest": "^29.7.0",
  "jest-expo": "^53.0.0",
  "@types/jest": "^29.5.12"
}
```

### **Arquivos de Configuração**

- `jest.config.js`: Configuração principal do Jest
- `jest.setup.js`: Setup global com mocks
- `package.json`: Scripts de teste

## 🎯 Tipos de Testes Implementados

### **1. Testes Unitários de Componentes**

#### **Button Component (`src/components/__tests__/button.test.tsx`)**

**O que testa:**

- ✅ Renderização correta com children
- ✅ Chamada da função `onPress` quando pressionado
- ✅ Comportamento quando desabilitado
- ✅ Aplicação de classes CSS customizadas
- ✅ Renderização sem prop `onPress`
- ✅ Múltiplos children
- ✅ Props adicionais
- ✅ Classes de estilo padrão
- ✅ Children vazios
- ✅ `onPress` null

**Exemplo de teste:**

```typescript
it("should call onPress when pressed", () => {
  const { getByText } = render(<Button onPress={mockOnPress}>Click Me</Button>);

  fireEvent.press(getByText("Click Me"));
  expect(mockOnPress).toHaveBeenCalledTimes(1);
});
```

#### **Input Component (`src/components/__tests__/input.test.tsx`)**

**O que testa:**

- ✅ Renderização com placeholder
- ✅ Chamada de `onChangeText` ao digitar
- ✅ Renderização com ícone
- ✅ Entrada de texto seguro (password)
- ✅ Toggle de visibilidade da senha
- ✅ Estado desabilitado
- ✅ Props de valor
- ✅ Input multiline
- ✅ Tipos de teclado
- ✅ Auto-capitalização
- ✅ Tipo de tecla de retorno
- ✅ Eventos de foco e blur
- ✅ Submit editing
- ✅ Classes de estilo
- ✅ `onChangeText` null

**Exemplo de teste:**

```typescript
it("should toggle password visibility when eye icon is pressed", () => {
  const { getByPlaceholderText, getByTestId } = render(
    <Input placeholder="Password" secureTextEntry />
  );

  const input = getByPlaceholderText("Password");
  const eyeIcon = getByTestId("eye-toggle");

  expect(input.props.secureTextEntry).toBe(true);
  fireEvent.press(eyeIcon);
  expect(input.props.secureTextEntry).toBe(false);
});
```

### **2. Testes de Schemas de Validação**

#### **Login Schema (`src/app/login/__tests__/login-schema.test.ts`)**

**O que testa:**

- ✅ Dados válidos (login, email, valores mínimos)
- ✅ Dados inválidos (campos vazios, ausentes, null, undefined)
- ✅ Edge cases (strings longas, caracteres especiais)
- ✅ Inferência de tipos TypeScript

**Exemplo de teste:**

```typescript
it("should fail when login is empty", () => {
  const invalidData = { login: "", password: "password123" };
  const result = loginSchema.safeParse(invalidData);

  expect(result.success).toBe(false);
  if (!result.success) {
    expect(result.error.issues[0].message).toBe("Login is required");
  }
});
```

#### **Register Schema (`src/app/register/__tests__/register-schema.test.ts`)**

**O que testa:**

- ✅ Validação de nome (mínimo 4 chars, apenas letras e espaços)
- ✅ Validação de email (formato válido)
- ✅ Validação de senha (mínimo 6 chars)
- ✅ Confirmação de senha (deve coincidir)
- ✅ Múltiplos erros de validação
- ✅ Caracteres acentuados no nome
- ✅ Case sensitivity no email

**Exemplo de teste:**

```typescript
it("should fail when name contains numbers", () => {
  const invalidData = {
    name: "João123",
    email: "joao@example.com",
    password: "password123",
    confirmPassword: "password123",
  };

  const result = registerSchema.safeParse(invalidData);
  expect(result.success).toBe(false);
});
```

### **3. Testes de Utilitários**

#### **Sleep Function (`src/utils/__tests__/sleep.test.ts`)**

**O que testa:**

- ✅ Resolução após tempo especificado
- ✅ Diferentes durações (100ms, 0ms, 1000ms)
- ✅ Não resolução antes do tempo
- ✅ Múltiplas chamadas
- ✅ Valores negativos
- ✅ Valores muito grandes
- ✅ Padrão async/await
- ✅ Chamadas concorrentes

**Exemplo de teste:**

```typescript
it("should resolve after specified time", async () => {
  const sleepPromise = sleep(1000);
  jest.advanceTimersByTime(1000);
  await expect(sleepPromise).resolves.toBeUndefined();
});
```

### **4. Testes de Páginas**

#### **Home Page (`src/app/__tests__/index.test.tsx`)**

**O que testa:**

- ✅ Renderização correta dos elementos
- ✅ Navegação para login
- ✅ Classes de estilo
- ✅ Múltiplos cliques no botão

**Exemplo de teste:**

```typescript
it("should navigate to login when button is pressed", () => {
  const { getByText } = render(<Home />);
  const { router } = require("expo-router");

  fireEvent.press(getByText("go to login"));
  expect(router.push).toHaveBeenCalledWith("/login");
});
```

### **5. Testes de Integração**

#### **Integration Tests (`src/__tests__/integration.test.tsx`)**

**O que testa:**

- ✅ **Integração Button + Input**: Submissão de formulário
- ✅ **Toggle de Senha**: Interação com ícone de olho
- ✅ **Validação de Formulários**: Schemas funcionando juntos
- ✅ **Navegação**: Sistema de roteamento
- ✅ **Estilização**: Consistência visual
- ✅ **Tratamento de Erros**: Componentes com props inválidos
- ✅ **Operações Assíncronas**: Função sleep
- ✅ **Acessibilidade**: Labels e props de acessibilidade

**Exemplo de teste:**

```typescript
it("should handle form submission with button and input", () => {
  const mockOnSubmit = jest.fn();
  const mockOnChangeText = jest.fn();

  const { getByText, getByPlaceholderText } = render(
    <React.Fragment>
      <Input placeholder="Enter email" onChangeText={mockOnChangeText} />
      <Button onPress={mockOnSubmit}>Submit</Button>
    </React.Fragment>
  );

  fireEvent.changeText(getByPlaceholderText("Enter email"), "test@example.com");
  fireEvent.press(getByText("Submit"));

  expect(mockOnChangeText).toHaveBeenCalledWith("test@example.com");
  expect(mockOnSubmit).toHaveBeenCalledTimes(1);
});
```

## 🔧 Configuração de Mocks

### **Mocks Principais (`jest.setup.js`)**

```javascript
// Mock do expo-router
jest.mock("expo-router", () => ({
  router: { push: jest.fn(), replace: jest.fn(), back: jest.fn() },
  useRouter: () => ({ push: jest.fn(), replace: jest.fn(), back: jest.fn() }),
}));

// Mock do NativeWind
jest.mock("nativewind", () => ({
  styled: jest.fn((component) => component),
  useColorScheme: jest.fn(() => "light"),
}));

// Mock do react-hook-form
jest.mock("react-hook-form", () => ({
  useForm: jest.fn(() => ({
    control: {},
    handleSubmit: jest.fn((fn) => fn),
    formState: { errors: {} },
  })),
}));
```

## 📊 Cobertura de Testes

### **Métricas de Cobertura**

- **Componentes**: 100% dos componentes principais testados
- **Schemas**: 100% das validações testadas
- **Utilitários**: 100% das funções auxiliares testadas
- **Páginas**: Páginas principais testadas
- **Integração**: Fluxos principais testados

### **Comandos de Cobertura**

```bash
# Executar com cobertura
npm run test:coverage

# Ver relatório detalhado
open coverage/lcov-report/index.html
```

## 🎓 Conceitos de Teste Aplicados

### **1. Testes Unitários**

- **Isolamento**: Cada teste é independente
- **Mocks**: Dependências externas são mockadas
- **Assertions**: Verificações específicas e claras
- **Edge Cases**: Casos extremos e inválidos

### **2. Testes de Integração**

- **Interação Real**: Componentes trabalham juntos
- **Fluxos Completos**: Cenários de uso real
- **Dados Reais**: Schemas com dados válidos/inválidos

### **3. Testes de Comportamento**

- **User Interactions**: Cliques, digitação, navegação
- **State Changes**: Mudanças de estado dos componentes
- **Async Operations**: Operações assíncronas

### **4. Testes de Validação**

- **Schema Validation**: Verificação de dados com Zod
- **Error Messages**: Mensagens de erro corretas
- **Type Safety**: Inferência de tipos TypeScript

## 🚀 Executando os Testes

### **Comandos Disponíveis**

```bash
# Executar todos os testes
npm test

# Executar em modo watch (desenvolvimento)
npm run test:watch

# Executar com cobertura
npm run test:coverage

# Executar testes específicos
npm test -- --testNamePattern="Button"
```

### **Debug de Testes**

```bash
# Executar com debug
npm test -- --verbose

# Executar um arquivo específico
npm test -- button.test.tsx

# Executar com console.log
npm test -- --verbose --no-coverage
```

## 📝 Boas Práticas Implementadas

### **1. Organização**

- Testes próximos ao código testado
- Nomenclatura clara e descritiva
- Estrutura hierárquica com `describe` e `it`

### **2. Isolamento**

- `beforeEach` para limpeza de mocks
- Testes independentes
- Mocks apropriados para dependências

### **3. Assertions**

- Assertions específicas e claras
- Verificação de chamadas de função
- Verificação de props e estados

### **4. Cobertura**

- Testes para casos válidos e inválidos
- Edge cases e casos extremos
- Comportamento de erro

## 🎯 Objetivos de Aprendizado

Este conjunto de testes serve como **base de estudo** para:

1. **React Native Testing**: Como testar componentes mobile
2. **Jest Framework**: Configuração e uso do Jest
3. **Testing Library**: Queries e assertions
4. **Mocking**: Como mockar dependências
5. **TypeScript Testing**: Testes com tipagem
6. **Schema Validation**: Testes de validação Zod
7. **Integration Testing**: Testes de integração
8. **Test Organization**: Estrutura e organização de testes

---

**Este guia demonstra uma abordagem completa de testes para aplicações React Native, cobrindo desde testes unitários até integração, servindo como referência para projetos futuros.**
