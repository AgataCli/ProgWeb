function counter (valor) {
  let x = valor;
    return function () {
        x += 1; 
      return x;
    }
};

// Parte do slide:

const incrementar = counter(10);

console.log('Primeira chamada ' + incrementar());
console.log('Segunda chamada ' + incrementar());
console.log('Terceira chamada ' + incrementar());
