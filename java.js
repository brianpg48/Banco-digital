const prompt = require('prompt-sync')();

class Conta {
    constructor(titular, numeroConta, senha) {
        this.titular = titular;
        this._saldo = 0;
        this.numeroConta = numeroConta || Math.floor(Math.random() * 10000);
        this._senha = senha;
        this.historico = [];
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
            this.historico.push(`Depósito de R$ ${valor.toFixed(2)}`);
        }
    }

    sacar(valor) {
        if (valor <= this._saldo) {
            this._saldo -= valor;
            this.historico.push(`Saque de R$ ${valor.toFixed(2)}`);
        } else {
            console.log("Saldo insuficiente");
        }
    }

    consultarSaldo() {
        return this._saldo;
    }

    transferir(valor, contaDestino) {
        if (valor > 0 && (this._saldo + (this.limite || 0)) >= valor) {
            this.sacar(valor);
            contaDestino.depositar(valor);
            this.historico.push(`Transferência de R$ ${valor.toFixed(2)} para conta ${contaDestino.numeroConta}`);
            contaDestino.historico.push(`Recebido R$ ${valor.toFixed(2)} da conta ${this.numeroConta}`);
        } else {
            console.log("Saldo insuficiente para transferência.");
        }
    }

    solicitarEmprestimo(valor, taxaJuros) {
        if (valor > 0) {
            const total = valor * (1 + taxaJuros);
            this._saldo += valor;
            this.historico.push(`Empréstimo de R$ ${valor.toFixed(2)} (Total a pagar: R$ ${total.toFixed(2)})`);
            console.log(`Empréstimo aprovado. Total a pagar: R$ ${total.toFixed(2)}`);
        }
    }

    exibirHistorico() {
        console.log("Histórico de transações:");
        this.historico.forEach(item => console.log("- " + item));
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
            this.historico.push(`Saque de R$ ${valor.toFixed(2)} (com limite)`);
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
        let rendimento = this._saldo * 0.05;
        this.depositar(rendimento);
        this.historico.push(`Rendimento aplicado de R$ ${rendimento.toFixed(2)}`);
    }
}

// Instanciando contas
const conta1 = new ContaPoupanca("Lucas", 123456, 123);
const conta2 = new ContaCorrente("Fábio", 654321, 456);

// Escolher conta para login
let numeroConta = parseInt(prompt("Digite o número da conta para acessar: "));
let conta = (numeroConta === conta1.numeroConta) ? conta1 : 
            (numeroConta === conta2.numeroConta) ? conta2 : null;

if (!conta) {
    console.log("Conta não encontrada.");
    return;
}

let senhaDigitada = prompt("Digite a senha: ");
if (conta.login(senhaDigitada)) {
    if (conta instanceof ContaPoupanca) {
        conta.aplicarRendimentos(); // Aplica rendimento ao acessar
    }

    while (true) {
        console.log(`\nBem-vindo, ${conta.titular}`);
        console.log("1 - Depositar\n2 - Sacar\n3 - Consultar Saldo\n4 - Transferir\n5 - Ver Histórico\n6 - Solicitar Empréstimo\n7 - Sair");
        let opcao = prompt("Escolha uma opção: ");

        if (opcao == "1") {
            let valor = parseFloat(prompt("Digite o valor a ser depositado: "));
            conta.depositar(valor);
        } else if (opcao == "2") {
            let valor = parseFloat(prompt("Digite o valor a ser sacado: "));
            conta.sacar(valor);
        } else if (opcao == "3") {
            console.log(`Saldo atual: R$ ${conta.consultarSaldo().toFixed(2)}`);
        } else if (opcao == "4") {
            let valor = parseFloat(prompt("Digite o valor a transferir: "));
            let numDestino = parseInt(prompt("Digite o número da conta destino: "));
            let destino = (numDestino === conta1.numeroConta) ? conta1 : 
                          (numDestino === conta2.numeroConta) ? conta2 : null;

            if (destino && destino !== conta) {
                conta.transferir(valor, destino);
            } else {
                console.log("Conta destino inválida.");
            }
        } else if (opcao == "5") {
            conta.exibirHistorico();
        } else if (opcao == "6") {
            let valor = parseFloat(prompt("Valor do empréstimo: "));
            conta.solicitarEmprestimo(valor, 0.1); // 10% juros
        } else if (opcao == "7") {
            console.log("Encerrando o sistema...");
            break;
        } else {
            console.log("Opção inválida");
        }
    }
} else {
    console.log("Não foi possível acessar a conta.");
}
