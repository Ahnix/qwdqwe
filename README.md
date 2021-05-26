# desafio-dock

Devido a alta demanda de teste, escolhi usar o lb4/Ts para backend tendo em vista que o teste é um crud/orm.
O lb4 é um frame da ibm muito agil para este tipo de demanda incluindo teste e swagger.

Conforme escopo é possivel criar conta,efetuar transacoes,consultar saldo,efetuar saque,bloqueio,extrato completo ou por data.

O swagger vulgo webdoc, possui todos os endpoints necessarios para tais atividade.

## Padrao MRC (model repo control)

- model define os fields e relacionamentos.
- repositorio transcreve o model para o db mysql
- controller possui os endpoints

## Instalacao do projeto

```sh
yarn install
```

## Fix code style and formatting issues

```sh
yarn run lint
```

To automatically fix such issues:

```sh
yarn run lint:fix
```

## criar tabelas e rows no db com relacionamento e chaves primarya/estrageira

- `yarn run migrate`: Migrate database schemas for models

## Tests

```sh
yarn test
```

## Rodando o projeto

```sh
yarn start
```

- [Link base](http://127.0.0.1:3000)

- [Swagger](http://localhost:3000/explorer/)

[![LoopBack](<https://github.com/strongloop/loopback-next/raw/master/docs/site/imgs/branding/Powered-by-LoopBack-Badge-(blue)-@2x.png>)](http://loopback.io/)
