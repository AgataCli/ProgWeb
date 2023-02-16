// Código desenvolvido corretamente
// Nota: 2.0

class Venda{
    constructor(id, quantidade, preco){
        this.id = id;
        this.quantidade = quantidade;
        this.preco = preco;
    }

    getId(){
        return this.id;
    }

    setId(id){
        this.id = id;
    }

    getQuantidade(){
        return this.quantidade;
    }

    setQuantidade(qtd){
        this.quantidade = qtd;
    }

    getPreco(){
        return this.preco;
    }

    setPreco(pc){
        this.preco = pc;
    }

    getValorTotal(){
        let valor = this.quantidade * this.preco;
        return valor;
    }
}

let flores = new Venda(2900, 2, 2);
let undertale = new Venda(1111, 20, 30);

console.log(flores.getValorTotal());
console.log(undertale.getValorTotal());
