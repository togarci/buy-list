# 🛒 Buy List - App de Lista de Compras

<p align="center">
  <img src="https://img.shields.io/badge/Nuxt-00DC82?style=for-the-badge&logo=nuxt.js&logoColor=white" />
  <img src="https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vue.js&logoColor=4FC08D" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" />
</p>

<p align="center">
  Aplicação moderna para criar e gerenciar listas de compras, com detalhes de produtos, preços e imagens.
</p>

<p align="center">
<b>
 <a href="https://buy-list-seven.vercel.app"><strong>Ver Online 🚀</strong></a>
</b>
 
</p>

---

> 🔹 **Contexto:** Este projeto é uma **evolução de um teste técnico** para Desenvolvedor Frontend. A proposta inicial, desenvolvida em 20 horas, foi expandida com foco em arquitetura de software, boas práticas e ferramentas modernas do ecossistema Vue/Nuxt.

---

## ✨ Funcionalidades

- **📝 Criação de Listas:** Crie e gerencie múltiplas listas de compras.
- **🛍️ Gerenciamento de Itens:** Adicione, edite e remova itens, especificando quantidade, preço e unidade.
- **🖼️ Upload de Imagens:** Associe imagens aos produtos para fácil identificação.
- **✅ Validação Robusta:** Formulários com validação em tempo real usando **VeeValidate** e **Yup**.
- **💾 Persistência de Dados:** Suas listas são salvas localmente no navegador com **Pinia Persisted State**.
- **📱 Interface Responsiva:** Experiência otimizada para desktop e dispositivos móveis.
- **🚪 Modal de Confirmação:** Evita a perda de dados ao sair da criação de uma lista sem salvar.
- **💅 UI Moderna:** Componentes estilizados com o novo **Tailwind CSS v4**.

---

## 🚀 Tecnologias e Ferramentas

| Categoria                   | Tecnologia                               |
| :-------------------------- | :--------------------------------------- |
| **Framework**               | Nuxt 4 (com Nitro)                       |
| **Linguagem**               | TypeScript                               |
| **UI & Estilização**        | Vue 3 (Composition API), Tailwind CSS v4 |
| **Gerenciamento de Estado** | Pinia, `pinia-plugin-persistedstate`     |
| **Formulários**             | VeeValidate + Yup                        |
| **Testes**                  | Vitest, Vue Test Utils                   |
| **Ícones**                  | Nuxt Icon                                |
| **PWA**                     | `@vite-pwa/nuxt`                         |

---

## 🏗️ Arquitetura

O projeto utiliza uma **arquitetura híbrida modular**. As funcionalidades são organizadas em módulos auto-contidos (pasta `/modules`), enquanto componentes, utilitários e stores globais são compartilhados (pasta `/share`). Esta abordagem promove:

- **Escalabilidade:** Facilita a adição de novas funcionalidades.
- **Manutenção:** Isola o escopo de cada parte da aplicação.
- **Reutilização de Código:** Componentes e lógicas compartilhadas são facilmente acessíveis.

---

## 🛠️ Como Rodar o Projeto

**1. Clone o repositório:**

```bash
git clone https://github.com/seu-usuario/buy-list.git
cd buy-list
```

**2. Instale as dependências (escolha seu gerenciador de pacotes):**

```bash
# pnpm
pnpm install

# npm
npm install

# yarn
yarn install
```

**3. Inicie o servidor de desenvolvimento:**

```bash
# pnpm
pnpm dev

# npm
npm run dev

# yarn
yarn dev
```

**4. Abra [http://localhost:3000](http://localhost:3000) no seu navegador.**

---

## 📜 Scripts Disponíveis

- `pnpm dev`: Inicia o servidor de desenvolvimento.
- `pnpm build`: Compila o projeto para produção.
- `pnpm test`: Roda os testes unitários com Vitest.
- `pnpm generate`: Gera um site estático.
