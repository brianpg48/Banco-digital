const prompt = require('prompt-sync')();

class Conta {
    constructor(titular, numeroConta, senha) {
        this.titular = titular;
        this._saldo = 0;
        this.numeroConta = numeroConta || Math.floor(Math.random() * 10000);
        this._senha = senha;
    }

    login(senhaDigitada) {
        if (senhaDigitada == this._senha) {
            console.log("Login realizado com sucesso");
            return true;
        } else {
            console.log("Senha incorreta");
            return false;
        }
    }

    depositar(valor) {
        if (valor > 0) {
            this._saldo += valor;
        }
    }

    sacar(valor) {
        if (valor <= this._saldo) {
            this._saldo -= valor;
        } else {
            console.log("Saldo insuficiente");
        }
    }

    consultarSaldo() {
        return this._saldo;
    }
}

class ContaCorrente extends Conta {
    constructor(titular, numeroConta, senha) {
        super(titular, numeroConta, senha);
        this.limite = 500;
    }

    sacar(valor) {
        if (valor <= this._saldo + this.limite) {
            this._saldo -= valor;
        } else {
            console.log("Saldo insuficiente (mesmo com limite)");
        }
    }
}

class ContaPoupanca extends Conta {
    constructor(titular, numeroConta, senha) {
        super(titular, numeroConta, senha);
    }

    aplicarRendimentos() {
        this.depositar(this._saldo * 0.05);
    }
}

const conta1 = new ContaPoupanca("Lucas", 123456, 123);
const conta2 = new ContaCorrente("Fábio", 654321, 456);

let senhaDigitada = prompt("Digite a senha para acessar a conta: ");
if (conta1.login(senhaDigitada)) {
    conta1.aplicarRendimentos();

    while (true) {
        console.log("\n1 - Depositar\n2 - Sacar\n3 - Consultar Saldo\n4 - Sair");
        let opcao = prompt("Escolha uma opção: ");

        if (opcao == "1") {
            let valor = parseFloat(prompt("Digite o valor a ser depositado: "));
            conta1.depositar(valor);
        } else if (opcao == "2") {
            let valor = parseFloat(prompt("Digite o valor a ser sacado: "));
            conta1.sacar(valor);
        } else if (opcao == "3") {
            console.log(`Saldo atual: R$ ${conta1.consultarSaldo().toFixed(2)}`);
        } else if (opcao == "4") {
            console.log("Encerrando o sistema...");
            break;
        } else {
            console.log("Opção inválida");
        }
    }
} else {
    console.log("Não foi possível acessar a conta.");
}
if (conta2.login(senhaDigitada)) {
    while (true) {
        console.log("\n1 - Depositar\n2 - Sacar\n3 - Consultar Saldo\n4 - Sair");
        let opcao = prompt("Escolha uma opção: ");

        if (opcao == "1") {
            let valor = parseFloat(prompt("Digite o valor a ser depositado: "));
            conta1.depositar(valor);
        } else if (opcao == "2") {
            let valor = parseFloat(prompt("Digite o valor a ser sacado: "));
            conta1.sacar(valor);
        } else if (opcao == "3") {
            console.log(`Saldo atual: R$ ${conta1.consultarSaldo().toFixed(2)}`);
        } else if (opcao == "4") {
            console.log("Encerrando o sistema...");
            break;
        } else {
            console.log("Opção inválida");
        }
    }
} else {
    console.log("Não foi possível acessar a conta.");
}
