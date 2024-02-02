//Recuperiamo gli elementi dalla pagina:
const grid = document.getElementById("grid");
const playButton = document.getElementById("play-button");
const levelSelect = document.getElementById("select-level");
const scorePlaceholder = document.getElementById("score");

//# GIOCA
const startGame = () => {
  let isGameOver = false;
  //# FUNZIONI
  //FUNZIONE PER RIVELARE TUTTE LE CELLE
  const revealCells = () => {
    //Recuperiamo le celle:
    const cells = document.querySelectorAll(".cell");
    for (let i = 0; i < cells.length; i++) {
      const cell = cells[i];
      cell.classList.add("clicked");
      const cellNumber = parseInt(cell.innerText);
      if (bombs.includes(cellNumber)) cell.classList.add("bomb");
    }
  };

  //FUNZIONE PER GENERARE LE BOMBE
  const generateBombs = (numberOfBombs, maxNumber) => {
    let bombs = [];
    while (bombs.length < numberOfBombs) {
      let randomNumber;
      do {
        randomNumber = Math.floor(Math.random() * maxNumber) + 1;
      } while (bombs.includes(randomNumber));

      bombs.push(randomNumber);
    }
    return bombs;
  };

  //# FUNZIONE PER CREARE LA CELLA
  const createCell = (cellNumber) => {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.append(cellNumber);

    return cell;
  };

  //# FUNZIONE PER TERMINARE LA PARTITA
  const endGame = (score, hasHitBomb) => {
    const message = hasHitBomb
      ? `HAI PERSO! Totale punti: ${score}`
      : `HAI VINTO! Totale punti: ${score}`;
    alert(message);

    //Riveliamo tutte le celle:
    revealCells();
  };

  //Cambio il testo in ricomincia:
  playButton.innerText = "Rigioca";

  //Svuoto la pagina:
  grid.innerHTML = "";

  //Recupero il livello scelto:
  const level = levelSelect.value;

  //Calcolo le celle totali:
  let rows;
  let cols;

  switch (level) {
    case "hard":
      rows = 7;
      cols = 7;
      break;
    case "normal":
      rows = 9;
      cols = 9;
      break;
    case "easy":
    default:
      rows = 10;
      cols = 10;
      break;
  }

  //Recupero il root:
  const root = document.querySelector(":root");
  root.style.setProperty("--cols", cols);

  const totalCells = rows * cols;

  //Preparo il punteggio:
  let score = 0;

  //Setto il numero delle bombe:
  const totalBombs = 16;

  //Preparo il punteggio massimo:
  const maxScore = totalCells - totalBombs;

  //Preparo un contenitore per le bombe:
  const bombs = generateBombs(totalBombs, totalCells);

  //# LOGICA DI GIOCO
  for (let i = 1; i <= totalCells; i++) {
    //Creo la cella:
    const cell = createCell(i);

    //Aggancio l'Event Listener:
    cell.addEventListener("click", () => {
      //Controllo se era già stata cliccata:
      if (isGameOver === true || cell.classList.contains("clicked")) return;

      //Aggiungo la classe clicked:
      cell.classList.add("clicked");
      console.log(cell.innerText);
      //Controllo se è una bomba:
      const hasHitBomb = bombs.includes(i);

      if (hasHitBomb) {
        cell.classList.add("bomb");
        //Segnalo che ha perso:
        endGame(score, hasHitBomb);
      } else {
        //Incremento il punteggio:
        scorePlaceholder.innerText = ++score;

        //Controllo se l'utente ha vinto:
        if (score === maxScore) {
          endGame(score, hasHitBomb);
        }
      }
    });

    //La inserisco in pagina:
    grid.appendChild(cell);
  }
};

//Aggancio l'Event Listener al mio Button:
playButton.addEventListener("click", startGame);
