# Checklist 2025 - README

## Visão Geral
O projeto **Checklist 2025** é uma aplicação web desenvolvida em **Angular** com integração ao **AWS Amplify** para autenticação e gerenciamento de verificações de qualidade. A aplicação permite visualizar, navegar e classificar imagens de checklists armazenadas em um bucket S3 da AWS, organizadas por pastas e etiquetas. A interface suporta navegação por teclado, exibição automática de imagens em um carrossel e autenticação segura via AWS Cognito.

## Funcionalidades Principais
- **Autenticação**: Integração com AWS Cognito para login e logout de usuários, com proteção de rotas usando um guarda de autenticação (`AuthGuardService`).
- **Navegação de Imagens**: Exibição de imagens de checklists com suporte a navegação por setas do teclado (direita, esquerda, cima e baixo para avançar/retroceder uma ou dez imagens).
- **Carrossel Automático**: Avanço automático de imagens com intervalo de 3 segundos, pausado durante interações do usuário.
- **Modal de Classificação**: Interface para classificar imagens de checklists, com eventos para controle de abertura e fechamento do modal.
- **Listagem de Pastas**: Exibição de pastas disponíveis no bucket S3, com fallback para dados mock em caso de erro.
- **Cache de Dados**: Uso de cache com `shareReplay` para otimizar chamadas HTTP ao carregar listas de pastas.

## Estrutura do Projeto
A aplicação segue a arquitetura modular do Angular, com componentes standalone e serviços para comunicação com o backend. Abaixo estão os principais arquivos e suas funções:

- **`src/app/config/amplify-config.ts`**: Configura o AWS Amplify com as credenciais do Cognito (User Pool ID e Client ID) para autenticação.
- **`src/app/app.component.ts`**: Componente raiz da aplicação, responsável por renderizar o template principal e o roteador.
- **`src/app/app.routes.ts`**: Define as rotas da aplicação, incluindo a rota de login e rotas protegidas para visualização de checklists.
- **`src/app/components/novos/novos.component.ts`**: Componente principal para exibição e navegação de imagens de checklists, com suporte a teclado e carrossel automático.
- **`src/app/components/login-cognito/login-cognito.component.ts`**: Gerencia o login e logout via AWS Cognito, emitindo eventos para atualização do estado de autenticação.
- **`src/app/components/modal-login/modal-login.component.ts`**: Componente de modal para login, integrado com o Amplify Authenticator.
- **`src/app/components/lista-pastas/lista-pastas.component.ts`**: Exibe a lista de pastas disponíveis no bucket S3.
- **`src/app/components/janela-modal-classificar/janela-modal-classificar.component.ts`**: Modal para classificação de imagens, com eventos para abertura e fechamento.
- **`src/app/services/get-fotos-bucket/get-fotos-bucket.service.ts`**: Serviço para carregar URLs de imagens de checklists do bucket S3.
- **`src/app/services/get-lista-pastas/get-lista-pastas.service.ts`**: Serviço para carregar a lista de pastas, com cache e fallback.
- **`src/app/services/auth-cognito/auth.guard.service.ts`**: Guarda de rota que verifica a autenticação do usuário antes de permitir acesso às rotas protegidas.
- **`src/environments/environment.ts` e `environment.prod.ts`**: Configurações de ambiente para desenvolvimento e produção, incluindo URLs do bucket S3.

## Como Funciona
1. **Autenticação**: O usuário acessa a rota `/login`, onde o componente `LoginCognitoComponent` exibe um modal de login usando o Amplify Authenticator. Após o login, o estado de autenticação é atualizado e o usuário é redirecionado para a rota `/geral/geral`.
2. **Exibição de Imagens**: Na rota protegida `/:parametro/:parametro`, o componente `NovosComponent` carrega imagens do bucket S3 com base na etiqueta fornecida na URL. As imagens são exibidas em um carrossel automático, com navegação por teclado.
3. **Classificação**: O componente `JanelaModalClassificarComponent` permite classificar imagens, pausando o carrossel durante a interação.
4. **Listagem de Pastas**: O componente `ListaPastasComponent` exibe as pastas disponíveis, carregadas pelo serviço `GetListaPastasService`.
5. **Proteção de Rotas**: O `AuthGuardService` garante que apenas usuários autenticados acessem as rotas de visualização de checklists.

## Configuração do Ambiente
- **AWS Amplify**: Configurado em `amplify-config.ts` com o User Pool ID e Client ID do Cognito.
- **Bucket S3**: As imagens e listas de pastas são armazenadas em um bucket S3, com URLs definidas nos arquivos de ambiente (`environment.ts` e `environment.prod.ts`).
- **Ambiente de Desenvolvimento**:
  - `apiUrl`: `https://cv-julian-2025.s3.us-east-1.amazonaws.com/ux-2025`
  - `apiPastas`: `https://cv-julian-2025.s3.us-east-1.amazonaws.com/ux-2025/nomes-modulos/pastas.json`
  - `useMock`: `false` (pode ser habilitado para usar dados mock locais).
- **Ambiente de Produção**:
  - `apiUrl`: `https://cv-julian-2022.s3.us-west-2.amazonaws.com`
  - `useMock`: `false`

## Como Executar
1. **Pré-requisitos**:
   - Node.js e Angular CLI instalados.
   - AWS CLI configurado (opcional, para gerenciar o bucket S3).
   - Credenciais do AWS Cognito configuradas corretamente.

2. **Instalação**:
   ```bash
   npm install
   ```

3. **Configuração do Amplify**:
   - Certifique-se de que as credenciais em `amplify-config.ts` estão corretas.
   - Instale o pacote `@aws-amplify/ui-angular`:
     ```bash
     npm install @aws-amplify/ui-angular
     ```

4. **Execução**:
   - Para desenvolvimento:
     ```bash
     ng serve
     ```
   - Para produção:
     ```bash
     ng build --configuration production
     ```

5. **Acesso**:
   - Acesse `http://localhost:4200/login` para fazer login.
   - Após o login, navegue para `/geral/geral` para visualizar os checklists.

## Testes
Os testes unitários estão configurados usando **Jasmine** e **Karma**, com arquivos `.spec.ts` para cada componente e serviço. Para executar os testes:
```bash
ng test
```

## Considerações
- **Segurança**: As credenciais do Cognito (User Pool ID e Client ID) estão hardcoded no código. Em um ambiente de produção, considere usar variáveis de ambiente ou um gerenciador de segredos.
- **Cache**: O serviço `GetListaPastasService` usa `shareReplay` para cache, mas o cache é limpo manualmente com `clearCache()`.
- **Erro de Rede**: Os serviços `GetFotosBucketService` e `GetListaPastasService` implementam retentativas (`retry`) e tratamento de erros com fallback para dados mock.

## Contribuições
Para contribuir, siga as boas práticas de desenvolvimento Angular:
1. Crie uma branch para sua feature ou correção.
2. Adicione testes unitários para novos componentes e serviços.
3. Faça um pull request com uma descrição clara das alterações.

## Licença
Este projeto é de uso interno e não possui uma licença pública definida.