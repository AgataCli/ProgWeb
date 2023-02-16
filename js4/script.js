class IntegerSet {
    constructor(max){
     
      this.vetor = []
 
      for(let i = 0; i <= max; i++){
        this.vetor.push(false);
      }
     
    }
 
    insercao(elem){
 
      this.vetor[elem] = true;
     
    }
 
    remocao(elem){
 
      this.vetor[elem] = false;
     
    }
 
    static interseccao(vet1, vet2){
 
      function verificacao(bool1, bool2){
        if(bool1 == bool2){return bool1}
        else{return false}
      }
 
      let final = [];
     
      if(vet1.vetor.length > vet2.vetor.length){
        for(let i = 0; i < vet2.vetor.length; i++){
        final.push(verificacao(vet1.vetor[i],vet2.vetor[i]))
        }
      }
     
      else{
        for(let i = 0; i < vet1.vetor.length; i++){
        final.push(verificacao(vet1.vetor[i],vet2.vetor[i]))
        }
      }
 
      return final;
     
    }
 
    static uniao(vet1, vet2){
 
      let final = [];
     
      function verifica(bool1, bool2){
        if(bool1 == bool2 == true){
          return true;
        }else{
          return false;
        }
      }
     
      if(vet1.vetor.length > vet2.vetor.length){
        for(let i = 0; i < vet2.vetor.length; i++){
          final.push(verifica(vet1.vetor[i], vet2.vetor[i]));
        }
        for(i = vet2.vetor.length; i < vet1.vetor.length; i++){
          final.push(vet1.vetor[i]);
        }
        for(let i = vet2.vetor.length; i < vet1.vetor.length; i++){
          final.push(vet1.vetor[i]);
        }
      }
     
      else{
        for(let i = 0; i < vet1.vetor.length; i++){
          final.push(verifica(vet1.vetor[i], vet2.vetor[i]));
        }
        for(let i = vet1.vetor.length; i < vet2.vetor.length; i++){
          final.push(vet2.vetor[i]);
        }
      }
 
      return final;
    }

    static diferenca(vet1, vet2){
      let final = [];

      function verifica(bool1, bool2){
        if(bool1 != bool2){
          return true;
        }
        else{
          return false;
        }
      }

      if(vet1.vetor.length > vet2.vetor.length){
        for(let i = 0; i < vet1.vetor.length; i++){
          final.push(verifica(vet1.vetor[i],vet2.vetor[i]));
        }
        }
        else{
        for(let i = 0; i < vet1.vetor.length; i++){
          final.push(verifica(vet1.vetor[i],vet2.vetor[i]));
        }
        }
      return final;
      }
     

    static conversion(vet){
      let final = "Elementos do vetor: ";

      for(let i = 0; i < vet.vetor.length; i++){
        if(vet.vetor[i] == true){
          final = final + `${i} `
        }
      }

      return final;
    }

}
 
let arr1 = new IntegerSet(10);
let arr2 = new IntegerSet(25);
let arr3 = new IntegerSet(12);
let arr4 = new IntegerSet(5);
 
arr1.insercao(3);
arr1.insercao(5);
arr1.insercao(7);
 
arr2.insercao(10);
arr2.insercao(7);
arr2.insercao(5);
arr2.insercao(9);
 
arr3.insercao(3);
 
arr1.remocao(5);

console.log("Intersecção entre Arr1 e Arr2: ")
console.log(IntegerSet.interseccao(arr1,arr2), "\n");

console.log("União entre Arr1 e Arr2: ")
console.log(IntegerSet.uniao(arr1,arr2), "\n");

console.log("Diferença entre Arr1 e Arr2: ")
console.log(IntegerSet.diferenca(arr1,arr2), "\n");

console.log(IntegerSet.conversion(arr2));
