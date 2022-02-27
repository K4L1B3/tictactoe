/**
 * Resume o método querySelector
 *
 * O `.bind` altera o contexto interno da função
 * 1 - Estudar o motivo de precisar de usar o bind no `querySelector`
 * 2 - Métodos de uma função: bind, call e apply
 */
const selector = document.querySelector.bind(document);

/**
 * Abstrai a vinculação de eventos
 * */
function bind(el, event, callback) {
  el.addEventListener(event, callback);
}

/**
 * Abstrai a persistência de dados no localStorage
 * */
function persist(key, value) {
  localStorage.setItem(key, value);
}

/**
 * Abstrai a recuperação de dados do localStorage
 */
function retrieve(key) {
  return localStorage.getItem(key);
}

/**
 * Leva para uma determinada página com base no argumento page
 */
function goTo(page) {
  window.location.href = page;
}

export { selector, bind, persist, retrieve, goTo };
