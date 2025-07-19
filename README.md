# FitBody - Aplicativo de Fitness

## 📱 Sobre o Projeto

O **FitBody** é um aplicativo móvel de fitness desenvolvido com React Native e Expo, focado em proporcionar uma experiência completa para usuários que desejam gerenciar seus treinos, nutrição e progresso físico.

## 🛠️ Stack Tecnológica

### **Framework Principal**

- **React Native 0.79.2** - Framework para desenvolvimento mobile multiplataforma
- **Expo SDK 53** - Plataforma que simplifica o desenvolvimento React Native
- **TypeScript 5.7.3** - Linguagem tipada para maior segurança e produtividade

### **Navegação e Roteamento**

- **Expo Router 5.0.5** - Sistema de roteamento baseado em arquivos (file-based routing)
- **React Native Screens 4.10.0** - Otimização de performance para navegação
- **React Native Safe Area Context 5.4.0** - Gerenciamento de áreas seguras

### **Estilização e UI**

- **NativeWind 4.1.23** - Tailwind CSS para React Native
- **Tailwind CSS 3.4.17** - Framework CSS utilitário
- **Tailwind Merge 3.3.0** - Utilitário para mesclar classes Tailwind
- **Lucide React Native 0.509.0** - Biblioteca de ícones

### **Formulários e Validação**

- **React Hook Form 7.56.3** - Gerenciamento de formulários
- **Zod 3.24.4** - Validação de esquemas TypeScript-first
- **@hookform/resolvers 5.0.1** - Integração entre React Hook Form e Zod

### **Fontes e Tipografia**

- **@expo-google-fonts/poppins** - Fonte Poppins (400, 500, 700, 900)
- **@expo-google-fonts/league-spartan** - Fonte League Spartan (400, 500, 700, 900)

### **Animações e Gestos**

- **React Native Reanimated 3.17.4** - Biblioteca de animações nativas
- **React Native Gesture Handler 2.24.0** - Gerenciamento de gestos
- **React Native Reanimated Carousel 4.0.2** - Componente de carrossel animado

### **Autenticação e Segurança**

- **Expo Local Authentication 16.0.4** - Autenticação biométrica (fingerprint)

### **Utilitários**

- **Expo Blur 14.1.4** - Efeitos de blur
- **Expo Splash Screen 0.30.8** - Tela de splash personalizada
- **Expo Constants 17.1.4** - Constantes do aplicativo
- **Expo Linking 7.1.4** - Deep linking

## 🏗️ Arquitetura do Projeto

### **Estrutura de Pastas**

```
src/
├── app/                    # Rotas do Expo Router (file-based routing)
│   ├── _layout.tsx        # Layout principal da aplicação
│   ├── index.tsx          # Página inicial
│   ├── login/             # Rotas de autenticação
│   │   ├── index.tsx      # Tela de login principal
│   │   ├── form-login.tsx # Formulário de login
│   │   ├── login-schema.ts # Validação do login
│   │   ├── fingerprint/   # Autenticação biométrica
│   │   └── forgot/        # Recuperação de senha
│   ├── register/          # Rotas de cadastro
│   │   ├── index.tsx      # Tela de registro
│   │   ├── form-register.tsx # Formulário de registro
│   │   └── register-schema.ts # Validação do registro
│   ├── onboarding/        # Onboarding do usuário
│   │   ├── index.tsx      # Tela de onboarding
│   │   └── welcome-splash.tsx # Splash screen
│   └── setup/             # Configuração inicial
├── components/            # Componentes reutilizáveis
│   ├── button.tsx         # Componente de botão
│   └── input.tsx          # Componente de input
├── styles/               # Estilos globais
│   ├── global.css        # Estilos CSS globais
│   └── globalFonts.ts    # Configuração de fontes
├── assets/               # Recursos estáticos
│   ├── icons/           # Ícones do aplicativo
│   └── images/          # Imagens
└── utils/               # Utilitários
    └── sleep.ts         # Funções auxiliares
```

## 🎨 Sistema de Design

### **Paleta de Cores**

```javascript
colors: {
  black: '#232323',        // Preto principal
  blacksecundary: '#2E2E2E', // Preto secundário
  white: '#ffffff',        // Branco
  limegreen: '#E2F163',    // Verde lima
  purple: '#896CFE',       // Roxo principal
  lightpurple: '#B3A0FF',  // Roxo claro
}
```

### **Tipografia**

- **Poppins**: Fonte principal (Regular, Medium, Bold, Black)
- **League Spartan**: Fonte secundária (Regular, Medium, Bold, Black)

### **Componentes Base**

- **Button**: Botão customizado com suporte a blur e estilização Tailwind
- **Input**: Campo de entrada com suporte a ícones e toggle de senha

## 🚀 Sistema de Rotas (Expo Router)

### **Estrutura de Navegação**

```
/                           # Página inicial (Home)
├── /login                  # Tela de login
│   ├── /fingerprint       # Autenticação biométrica
│   └── /forgot            # Recuperação de senha
├── /register              # Tela de cadastro
├── /onboarding            # Onboarding do usuário
└── /setup                 # Configuração inicial
```

### **Características do Roteamento**

- **File-based Routing**: Cada arquivo `.tsx` na pasta `app/` se torna uma rota
- **Layout Aninhado**: `_layout.tsx` define o layout compartilhado
- **Navegação Programática**: Uso do `router.push()` para navegação
- **Headers Ocultos**: Configurado para não mostrar headers padrão

## 📋 Validação de Formulários

### **Login Schema (Zod)**

```typescript
const loginSchema = z.object({
  login: z.string().min(1, { message: "Login is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});
```

### **Register Schema (Zod)**

```typescript
const registerSchema = z
  .object({
    name: z
      .string()
      .nonempty({ message: "O nome é obrigatório" })
      .min(4, "O nome deve ter pelo menos 4 caracteres")
      .regex(/^[A-Za-zÀ-ÿ\s]+$/, {
        message: "O nome não pode conter números ou caracteres especiais",
      }),
    email: z.string().email("Digite um email válido"),
    password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não se coincidem",
    path: ["confirmPassword"],
  });
```

## 🔧 Configurações do Projeto

### **Expo Config**

- **Scheme**: `fitbody-app`
- **Orientation**: Portrait
- **User Interface Style**: Automatic (dark/light mode)
- **New Architecture**: Habilitada
- **Splash Screen**: Personalizada com ícone e background

### **Tailwind Config**

- **Content**: `./src/**/*.{ts,tsx}`
- **Preset**: NativeWind
- **Custom Colors**: Paleta personalizada do FitBody
- **Custom Fonts**: Poppins e League Spartan

## 🚀 Como Executar

### **Pré-requisitos**

- Node.js (versão LTS)
- Expo CLI
- Android Studio (para Android) ou Xcode (para iOS)

### **Instalação**

```bash
# Instalar dependências
npm install

# Executar o projeto
npm start

# Executar no Android
npm run android

# Executar no iOS
npm run ios

# Executar na web
npm run web
```

## 📱 Funcionalidades Principais

### **Autenticação**

- Login tradicional com email/senha
- Autenticação biométrica (fingerprint)
- Recuperação de senha
- Cadastro de novos usuários

### **Onboarding**

- Tela de splash personalizada
- Fluxo de introdução ao aplicativo
- Configuração inicial do perfil

### **UI/UX**

- Design moderno e responsivo
- Suporte a modo escuro/claro
- Animações fluidas
- Componentes reutilizáveis

## 🎯 Objetivos do Projeto

Este projeto serve como um **ambiente de estudo** para:

1. **React Native com Expo**: Desenvolvimento mobile multiplataforma
2. **Expo Router**: Sistema de roteamento moderno
3. **TypeScript**: Tipagem estática e melhor DX
4. **Tailwind CSS**: Estilização utilitária
5. **Validação de Formulários**: React Hook Form + Zod
6. **Autenticação**: Fluxos de login e registro
7. **Componentização**: Arquitetura de componentes reutilizáveis

## 🔮 Próximos Passos

- Implementação de funcionalidades de fitness
- Integração com APIs de exercícios
- Sistema de tracking de progresso
- Comunidade e social features
- Notificações push
- Sincronização com wearables

---

**Desenvolvido com ❤️ usando React Native e Expo**
