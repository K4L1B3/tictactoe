import { bind, retrieve, selector } from "../utils/index.mjs";

// AVISO: EU TENTEI EXPLICAR MAIOR PARTE DO CÓDIGO, ENTÃO CASO TU VEJA UMA EXPLICAÇÃO DE ALGO QUE PARECE
//        ÓBIVIO, NÃO LEVE COMO UM INSULTO. OS COMENTÁRIOS NÃO SÃO ATESTANTO SUA HABILIDADE DE ALGORITMOS E AFINS
//        SÃO APENAS PARA DEIXAR CLARO O QUE O CÓDIGO JS ESTÁ FAZENDO E NORTEAR NA PROCURA DE CONTEÚDOS

const FIRST_PLAYER_TURN = 0; // Indica o index do primeiro jogador a começar (POR CONVENÇÃO, É O JOGADOR QUE MARCA OS X's)
const PLAYER_TURN_NAMES = ["one", "two"]; // Padroniza os nomes do jogadores e torna fácil a indexação
const MARKS = ["X", "O"]; // Padroniza a marcação de cada jogador e torna fácil a indexação

// Cria um objeto e guarda a referência dos elementos para exibição dos nomes
const playersNameDisplay = {
  one: selector("#player-one-name-display"),
  two: selector("#player-two-name-display"),
};
// Cria outro objeto, com a mesma convenção de nomes de chaves (a mesma usada para a referência aos jogadores)
const playersMovesHistory = {
  one: [],
  two: [],
};
// Pega a referência do tabuleiro (board). Ver HTML correspodente
const board = selector("#board");
// Cria uma variável mutável (let) que começa com o index do primeiro jogador
let turn = FIRST_PLAYER_TURN;
// Diz quantas casa ainda podem ser preenchidas (9, já que o jogo-da-velha tem 9 casas)
let howManySpacesLeft = 9;

/**
 * Itera sobre o objeto que guarda a referência dos displays por meio das chaves
 * Para cada iteração recupera o valor (nome do jogador) correspondente e faz a atribuição
 */
function displayNames() {
  for (const key in playersNameDisplay) {
    const storageKey = `player.${key}`;
    playersNameDisplay[key].innerText = retrieve(storageKey);
  }
}

/**
 * Serve para dar a lógica maior (jogabilidade em si)
 *
 * ESSA FUNÇÃO ESTÁ GRANDE E MAL ORGANIZAADA DE PROPÓSITO
 * 1 - DA PARA REFATORAR E DEIXAR O CÓDIGO MAIS MODULARIZADO (FUNÇÕES COM RESPONSABILIDADE BEM DEFINIDAS E ÚNICAS)
 * 2 - MINIMIZAR A REPETIÇÃO DE CÓDIGO COM ARMAZENAMENTO DE DADOS REPETIDOS EM VARIÁVEIS MAIS CONCISAS
 * 3 - INSTIGAR A BUSCAR TÓPICOS COMO MANIPUALÃO DO DOM E FUNÇÕES NATIVAS DE CONTRUTORS DO JS COMO ARRAYS E STRING
 */
function configureBoard() {
  const spaces = [...board.children]; // Pega todos os espaços (casas) do tabuleiro
  // 1 - Estudar spread e rest operators

  // Intera sobre cada espaço
  for (let i = 0; i < spaces.length; i++) {
    // Vincula uma função para o click em cada quadrado
    bind(spaces[i], "click", ({ target }) => {
      // Caso o espaço já esteja preenchido ou não existam mais espaços disponíveis, nada é feito
      if (target.innerText || !howManySpacesLeft) {
        return;
      }

      target.innerText = MARKS[turn]; // É feito a marcação do espaço com a marca do atual jogador
      playersMovesHistory[PLAYER_TURN_NAMES[turn]].push(i); // É adicionado a jogada (index do espaço) ao array de jogadas válidas do atual jogador
      howManySpacesLeft--; // O valor de espaços disponíveis é decrementado

      // Após cada jogada, verifica se o jogador atual (o que acabou de jogar) ganhou o jogo
      if (verifyWinner(playersMovesHistory[PLAYER_TURN_NAMES[turn]])) {
        const storageKey = `player.${PLAYER_TURN_NAMES[turn]}`; // Pega o nome do jogador do localStorage
        console.log(`${retrieve(storageKey)} ganhou!`); // Mostra que o jogador ganhou
        return; // Não prosegue com a função
      }

      // Caso após a jogada não tiver mais espaços disponíveis e não tiver ganhador, a partida é finalizada
      if (!howManySpacesLeft) {
        console.log("Partida terminou");
        return;
      }

      // Manipulaão de DOM (Descubra por você mesmo o que isso daqui faz)
      // 1 - Estudar: parentNode, children...
      // 2 - Estudar: classList e style
      playersNameDisplay[PLAYER_TURN_NAMES[turn]].parentNode.classList.remove(
        "move"
      );
      turn = ++turn % 2; // Passa a vez para o próximo jogador (entenda esse pequeno cálculo)
      // Mesma coisa que o de cima, entenda por você mesmo
      playersNameDisplay[PLAYER_TURN_NAMES[turn]].parentNode.classList.add(
        "move"
      );
    });
  }
}

/**
 * Verifica se o histórico de jogadas passado possui um agrupamento de indexes que são válidos para uma vitória
 */
function verifyWinner(moves) {
  // Descubra a lógica disso daqui você mesmo (é de boa até)
  const winnerMoves = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
  ];

  // 1 - Estudar métodos de array: some, every e includes
  return winnerMoves.some((winnerMove) =>
    winnerMove.every((move) => moves.includes(move))
  );
}

/**
 * Função que inicia toda o jogo
 */
function init() {
  // Chama as outras funções
  displayNames();
  configureBoard();
}

init(); // Chamada da função que inicia o jogo

// O QUE PODE SER FEITO AINDA...
// 1 - DEIXAR O JOGO MAIS BONITO (CSS)
// 2 - MENSAGEM EM MODAL DE FINALIZAÇÃO DE JOGO (GANHADOR OU DEU VELHA)
// 3 - MARCAR SE UMA PARTIDA ESTÁ EM ANDAMENTO, CASO SIM, SE ENTRAR NA TELA DE REGISTRO DE NOMES, PASSAR DIRETO PARA A TELA DE JOGO
// 4 - PERSISTIR O HISTÓRICO DE JOGADA DE CADA JOGADOR, PARA CASO A ABA SEJA REDIRECIONADA OU RECARREGADA, A PARTIDA PODER VOLTAR DE ONDE PAROU
// 5 - FIQUEI SEM IDEIAS, MAS DEVE TER OUTRAS COISAS QUE TU PODE FAZER PARA DEIXAR O JOGO MELHOR E TU APRENDER MAIS
