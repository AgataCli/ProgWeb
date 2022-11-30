let opcoes = ['Papel','Pedra','Tesoura'];
let pontuacao = 0;
let verifica = true;

while(verifica){
    console.log('Escolha sua jogada:\n1 - Papel \n2 - Pedra \n3 - Tesoura');
    let escolha = parseInt(prompt());

    let random = opcoes[Math.floor(Math.random() * opcoes.length)];

    console.log('O computador jogou ' + random);

    switch(opcoes[escolha-1]){
        case 'Papel':
            switch(random){
                case 'Papel':
                    console.log('A rodada empatou!');
                    break;
                case 'Pedra':
                    console.log('Você ganhou!');
                    pontuacao++;
                    break;
                case 'Tesoura':
                    verifica = false;
            }
            break;
        case 'Pedra':
            switch(random){
                case 'Papel':
                    verifica = false;
                    break;
                case 'Pedra':
                    console.log('A rodada empatou!');
                    break;
                case 'Tesoura':
                    console.log('Você ganhou!');
                    pontuacao++;
            }
            break;
        case 'Tesoura':
            switch(random){
                case 'Papel':
                    console.log('Você ganhou!');
                    pontuacao++;
                    break;
                case 'Pedra':
                    verifica = false;
                    break;
                case 'Tesoura':
                    console.log('A rodada empatou!');
            }
            break;
        default:
            verifica = false;
    }
}
console.log('Você perdeu! A sua pontuação foi de ' + pontuacao);