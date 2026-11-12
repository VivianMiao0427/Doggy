const dogGrid = document.querySelector("#dogGrid");
const shuffleButton = document.querySelector("#shuffleButton");

const backgroundColors = [
  "#f4b8c3",
  "#a8c8ff",
  "#f4d06f",
  "#a8d5ba",
  "#c8b6e8",
  "#f4a88a",
  "#8ecacb",
  "#c7a18f",
  "#d8e28f"
];

let dogImages = [];
let dogHasBeenChosen = false;

async function getRandomDogs() {
  const url = "https://dog.ceo/api/breeds/image/random/9";

  dogGrid.innerHTML = "";
  dogHasBeenChosen = false;
  document.body.style.backgroundColor = "#f2f0ea";

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    dogImages = result.message;
    createCards();
  } catch (error) {
    console.error(error.message);
  }
}

function createCards() {
  dogImages.forEach((imageUrl, index) => {
    const card = document.createElement("button");
    card.className = "dog-card";
    card.type = "button";
    card.setAttribute("aria-label", `Reveal dog card ${index + 1}`);

    const image = document.createElement("img");
    image.src = imageUrl;
    image.alt = "A randomly selected dog";

    card.appendChild(image);
    card.addEventListener("click", () => revealDog(card, index));
    dogGrid.appendChild(card);
  });
}

function revealDog(selectedCard, index) {
  if (dogHasBeenChosen) return;

  dogHasBeenChosen = true;
  selectedCard.classList.add("revealed");
  document.body.style.backgroundColor = backgroundColors[index];

  document.querySelectorAll(".dog-card").forEach((card) => {
    card.disabled = true;

    if (card !== selectedCard) {
      card.classList.add("not-chosen");
    }
  });
}

shuffleButton.addEventListener("click", getRandomDogs);

getRandomDogs();