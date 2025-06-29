const flashcards = [
  {
    question: "O que é JavaScript?",
    answer:
      "JavaScript é uma linguagem de programação interpretada e orientada a objetos, usada principalmente para adicionar interatividade e dinamismo a páginas web.",
  },
  {
    question: "O que são funções de callback em JavaScript?",
    answer:
      "São funções passadas como argumento para outra função, que serão executadas após um determinado evento ou operação.",
  },
  {
    question: "O que é o this em JavaScript?",
    answer:
      "this se refere ao contexto de execução atual. Seu valor varia dependendo de como a função é chamada.",
  },
  {
    question: "O que é hoisting em JavaScript?",
    answer:
      'Hoisting é o comportamento em que declarações de variáveis e funções são "movidas" para o topo do escopo durante a fase de compilação. Isso faz com que seja possível usar uma função antes de sua definição no código.',
  },
  {
    question: "O que são tipos primitivos em JavaScript?",
    answer:
      "Os tipos primitivos em JavaScript são: String, Number, Boolean, Null, Undefined, BigInt e Symbol. Eles representam valores imutáveis e não são objetos.",
  },
];

let shuffledDeck = [];
let currentCardIndex = 0;
let isShowingAnswer = false;
let hasFinishedDeck = false;

const cardFront = document.getElementById("card-front");
const cardBack = document.getElementById("card-back");
const flashcard = document.getElementById("card-container");
const flashcardInner = document.getElementById("flashcard-inner");
const nextBtn = document.getElementById("next-button");
const counterText = document.getElementById("card-counter");
const instructionText = document.getElementById("text");
const darkModeBtn = document.getElementById("dark-mode-button");
const lightModeBtn = document.getElementById("light-mode-button");

// Embaralhar os cards e iniciar
function initializeDeck() {
  shuffledDeck = [...flashcards].sort(() => Math.random() - 0.5);
  currentCardIndex = 0;
  hasFinishedDeck = false;
  nextBtn.textContent = "Próximo Card";
  renderCard();
}

// Atualizar o conteúdo do card
function renderCard() {
  const currentCard = shuffledDeck[currentCardIndex];
  cardFront.textContent = currentCard.question;
  cardBack.textContent = currentCard.answer;
  flashcard.classList.remove("flipped");
  isShowingAnswer = false;
  nextBtn.disabled = true;
  counterText.textContent = `Card ${currentCardIndex + 1} de ${
    shuffledDeck.length
  }`;
  instructionText.textContent = "Clique no card para ver a resposta";
}

// Alternar o card entre frente e verso
flashcard.addEventListener("click", () => {
  if (hasFinishedDeck) return;

  flashcard.classList.toggle("flipped");
  isShowingAnswer = !isShowingAnswer;
  instructionText.textContent = isShowingAnswer
    ? "Clique em 'Próximo Card'"
    : "Clique no card para ver a resposta";
  nextBtn.disabled = !isShowingAnswer;
});

// Permitir alternar o card entre frente e verso utilizando as teclas "Enter" ou "Espaço"
flashcard.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    flashcard.click();
  }
});

// Ir para o próximo card / restart
nextBtn.addEventListener("click", () => {
  if (hasFinishedDeck) {
    initializeDeck();
    return;
  }

  currentCardIndex++;

  if (currentCardIndex >= shuffledDeck.length) {
    alert("Parabéns! Você concluiu todos os cards!");
    hasFinishedDeck = true;
    nextBtn.textContent = "Recomeçar";
    instructionText.textContent = "Clique em 'Recomeçar'";
    nextBtn.disabled = false;
    return;
  }

  renderCard();
});

// Permitir ir para o próximo card utilizando as teclas "Enter" ou "Espaço"
nextBtn.addEventListener("keydown", (e) => {
  if ((e.key === "Enter" || e.key === " ") && !nextBtn.disabled) {
    e.preventDefault();
    nextBtn.click();
  }
});

initializeDeck();

darkModeBtn.addEventListener("click", () => {
  document.body.classList.add("dark");
  darkModeBtn.style.display = "none";
  lightModeBtn.style.display = "inline-block";
});

lightModeBtn.addEventListener("click", () => {
  document.body.classList.remove("dark");
  darkModeBtn.style.display = "inline-block";
  lightModeBtn.style.display = "none";
});
