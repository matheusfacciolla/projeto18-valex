<p align="center">
  <a href="https://github.com/matheusfacciolla/projeto18-valex">    
    <img src="https://img.icons8.com/ios/250/000000/bank-card-back-side.png" alt="readme-logo" width="100" height="100">
  </a>
  <h1 align="center">
    projeto18-valex
  </h1>
</p>

## Usage

```bash
$ git clone https://github.com/matheusfacciolla/projeto18-valex

$ cd projeto18-valex

$ npm install

$ npm run dev
```

API:

```
- POST /createcard (autenticada)
    - Rota para criar um novo cartão a partir do identificador do funcionário e tipo do cartão.
    - headers: { x-api-key: apiKey }
    - body: {
        "employeeId": 1,
        "cardType": "groceries" | "restaurant" | "transport" | "education" | "health"
    }

- PUT /activatecard 
    - Rota para fazer a ativação do cartão com seu identificador, codigo de segurança e senha.
    - headers: {}
    - body: {
        "cardId": 1,
        "securityCode": "111",
        "password":"1234"
    }

- GET /cardbalance/:cardId 
    - Rota para listar todos as transações, recargas e saldo do cartão a partir de seu identificador.
    - headers: {}
    - body: {}
    - params: { 
        "cardId": "1" 
    }

- PUT /blockcard 
    - Rota para desbloquear o cartão com seu identificador e senha.
    - headers: {}
    - body: {
        "cardId": 1,
        "password":"1234"
    }

- PUT /desblockcard 
    - Rota para bloquear o cartão com seu identificador e senha.
    - headers: {}
    - body: {
        "cardId": 1,
        "password":"1234"
    }

- POST /cardrecharge (autenticada)
    - Rota para fazer uma recarga no cartão a partir de seu identificador e quantia a ser colocada.
    - headers: { x-api-key: apiKey }
    - body: {
        "cardId": 1,
        "amount": 100
    }

- POST /cardpayment 
    - Rota para fazer uma compra a partir do identificador do cartão e sua senha, identificador do estabelecimento e quantia a ser paga.
    - headers: {}
    - body: {
        "cardId": 1,
        "password":"1234",
        "businessId": 1,
        "amount": 100
    }
```
