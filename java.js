class conta {
    _saldo;
    constructor(titular, numeroConta) {
        this.titular = titular;
        this._saldo = 0;
        this.numeroConta = numeroConta
    }
    depositar(valor) {
        if (valor > 0) this._saldo += valor;
    }

    sacar(valor) {
        if (valor <= this._saldo) this._saldo -= valor;
        else console.log("Saldo insuficiente");

    }
    consultarSaldo() {
        return this._saldo;
 }
}
class contaCorrente extends conta {
    constructor(titular, numeroConta) {
        super(titular, numeroConta);
        this.limite = 500;
    }
    depositar(valor) {
        if (valor > 0) this._saldo += valor;
    }

    sacar(valor) {
        if (valor <= this._saldo + this.limite) this._saldo -= valor;
        else console.log("Saldo insuficiente");
    }
}

class contaPoupanca extends conta {
    constructor(titular, numeroConta) {
        super(titular, numeroConta);
        this.limite = 0;
    }
    aplicarRendimentos() {
        this.depositar(this._saldo * 0.05)
    }
    sacar(valor) {
        if (valor <= this._saldo - this.limite) this._saldo -= valor;
        else console.log("Saldo insuficiente");
    }

}
const conta1 = new contaPoupanca("Lucas", 123456); {
    conta1.depositar(1000);
    conta1.aplicarRendimentos();
    console.log(`Saldo R$ ${conta1.consultarSaldo().toFixed(2)}`);
}
const conta2 = new contaCorrente("Luis", 654321); {
    conta2.depositar(1000);
    console.log(`Saldo R$ ${conta2.consultarSaldo().toFixed(2)}`);
}