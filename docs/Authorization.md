## API OCCRI

Esta é uma API para gerenciar o sistema da empresa OCCRI

# 1 - Autenticação

A autenticação da API é feita utilizando o [Google Firebase](https://firebase.google.com/).

Atualmente é possível autenticar e criar usuários com 2 provedores, via e-mail e senha ou com uma conta Google.
Existe 1 (um) usuário padrão com nível **ADMIN** no sistema ao qual tem acesso total aos cadastros e todas as rotas da API.
Os dados desse usuário estão listados abaixo:

```bash
email:  "admin@admin.com.br",
password:  "@321Abc",
```
> Como alternativa, é possível logar e obter o token manualmente utilizando o seguinte endpoint:

  POST: **https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key={firebase-key-project}**
    
```bash
{
  "email": "admin@admin.com.br",
  "password": "@321Abc",
  "returnSecureToken": true
}
```
# 2 - Cadastro de Usuários

Para cadastrar novos usuários, basta utilizar a biblioteca do [Google Firebase Autenticação em Sites](https://firebase.google.com/docs/auth/web/start?hl=pt-br).

> Como alternativa, é possível cadastrar manualmente utilizando o seguinte endpoint:

  POST: **https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key={firebase-key-project}**
    
```bash
{
  "email": "user@teste.com",
  "password": "@123Abc",
  "returnSecureToken": true
}
```
	
Por padrão ao ser cadastrado um novo usuário no firebase, este retorna um token e quando acessado algum endpoint da API que precisa de token, esse usuário será cadastrado no banco de dados e virá com nível de **USER**, onde terá acessos a endpoints específicos.

Caso queira transformar esse usuário para o nível **ADMIN**, é necessário estar logado com um usuário ADMIN e utilizar o endpoint de alterar usuário passando o id do usuário que deseja ser alterado e o nível desejado, ou seja, ADMIN. Apartir desse momento esse usuário se tornará um admin e terá acesso completo aos endpoints da API.
