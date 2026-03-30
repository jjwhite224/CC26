const page = document.querySelector(".page");
const hoverWords = document.querySelectorAll(".hover-word");
const resetBtn = document.querySelector(".reset-bg");

const defaultGif = page.dataset.defaultGif;
let locked = false;
page.style.backgroundImage = `url("${defaultGif}")`;

hoverWords.forEach(word => {
  const gif = word.dataset.gif;

  word.addEventListener("mouseenter", () => {
    if (!locked) page.style.backgroundImage = `url("${gif}")`;
  });

  word.addEventListener("mouseleave", () => {
    if (!locked) page.style.backgroundImage = `url("${defaultGif}")`;
  });

  word.addEventListener("click", () => {
    locked = true;
    page.style.backgroundImage = `url("${gif}")`;
  });
});

