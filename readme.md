# CDC ADMIN API

### Pequena explicação

Projeto da API exposta no curso 1 de React no alura.

## Instalação

Você precisa ter o NPM e o Maven instalado, para então executar os dois pacotes:

```
npm install
mvn clean install
```

## Configuração

Altere o arquivo **application.properties** e configure seu login, senha e a url do seu banco de dados. 

## Compilação

Para compilar a aplicação (fazer o *build*), primeiramente, o status do seu banco de dados deve estar ativo. Em seguida, rode o comando:

`mvn spring-boot:run`

Sua API deve estar acessível em <http://localhost:8080>