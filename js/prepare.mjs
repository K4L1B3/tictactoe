import { selector, bind, persist, goTo } from "../utils/index.mjs";

/**
 * 1 - Cria um objeto para os inputs que pegam os nomes dos jogadores
 * 2 - Pega o botão que da início a partida
 */
const playersInputName = {
  one: selector("#player-one-name"),
  two: selector("#player-two-name"),
};
const btnPlay = selector("#btn-play");

/**
 * Função para ser executada quando o botão play for clicado
 */
function play() {
  // Pega apenas os valores (em forma de array) do objeto de inputs
  const playersName = Object.values(playersInputName);

  // Verifica se exite pelo menos um campo inválido. Caso exista, não deixa a função prosseguir retornando false
  // 1 - Estudar métodos de arrays: some
  if (playersName.some(({ value }) => !isNameValid(value))) {
    return false;
  }

  // Intera sobre o objeto de inputs (por meio das chaves) e armazena o valore (value) de cada input no localStorage
  for (const key in playersInputName) {
    const storageKey = `player.${key}`;
    persist(storageKey, playersInputName[key].value);
  }

  // Retorna true quando a função é bem sucessida
  return true;
}

/**
 * Verifica se o nome passado é uma string e se ele é válido (não vazio)
 * 1 - Estudar métodos de strings: trim
 */
function isNameValid(name) {
  return typeof name === "string" && !!name.trim();
}

// Vincula uma função ao click do botão play
bind(btnPlay, "click", () => {
  // Guarda o resultado da execução de play
  const canWePlay = play();

  // Caso o resultado seja verdadeiro (ocorreu tudo certo), a página é redirecionada
  if (canWePlay) {
    goTo("/");
  }
});
