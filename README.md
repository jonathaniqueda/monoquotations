# Monoquotations

WAIT IT

## Getting started (< 2mn)

```
nvm install v16
npm install -g lerna
lerna bootstrap --hoist --loglevel=silly
cd /src/{service} && npm run start
```

### Motivation

DESAFIO TÉCNICO
Pré-req: monorepo de lambda functions dockerizado.
Cenário: suponhamos que entrega de valores de cotação fosse feita de uma maneira diferente. Em um cenário simples e ideal, existe um mundo onde um provider externo envia via webhook (POST request) uma cotação para a Remessa Online toda vez que ela muda contendo o seguinte JSON:
{
  "fromCurrency": "USD",
   "toCurrency": "BRL",
   "quotation": "5,50",
   "changedAt": "2021-05-05T08:00:00"
}
Do lado de tecnologia da RemessaOnline existe um lambda com express ou algum outro server por cima que será responsável por receber esse webhook, contendo apenas uma única rota POST /webhook. (Set quotations)
Fechando o ciclo de recebimento de cotação e entrando no ciclo de entrega dessa cotação para o usuário, a RemessaOnline irá possuir um outro lambda responsável por receber a moeda de entrada, a moeda de saída e valor final convertido. Esse lambda possui um server por cima também e responde apenas uma única rota GET /quotation e os parâmetros necessários para o processamento. (Get quotations)
Em um determinado momento da RemessaOnline o time de Data resolveu que precisa saber as moedas mais consultadas por dia e por isso, o time de tecnologia resolveu criar um outro Lambda que será responsável por armazenar um log toda vez que alguém solicita um GET /quotation. Em um cenário de microserviços simples e isolados, toda vez que tiver um GET /quotation irá ter um POST para outro lambda avisando que o usuario de ip XPTO, solicitou a cotação da moeda ABCD para a ABC com o valor de conversão escolhido. Esse terceiro lambda só será responsável por pegar o request e salvar no banco de dados.
Dado esse cenário de 3 lambdas que estão envolvidos todos no mesmo mundo de pegar e entregar cotações, precisamos construir um monorepo orientado a NodeJS 14+ com um banco de dados SQL de escolha. O desafio maior é conseguir fazer o monorepo bulidar isoladamente o micro-serviço necessário com as libs compartilhadas toda vez que rodar o CI/CD. Lembre-se, se voce editou apenas um lambda, jamais deve bulidar os outros, somente o lambda editado será buildado para o deploy. Cada lambda deve ser deployado sempre isoladamente 1 do outro.
---------------------------------------------------------------
Referências para estudos:
1. Lerna (gerenciador de Monorepos em node): https://github.com/lerna/lerna/tree/main/commands/bootstrap
2. Yarn Workspaces (gerenciador de monorepos competidor do Lerna): https://classic.yarnpkg.com/en/docs/workspaces/
3. Explicação Monorepo: https://semaphoreci.com/blog/what-is-monorepo
4. Pontos negativos do Monorepo: https://medium.com/@mattklein123/monorepos-please-dont-e9a279be011b
