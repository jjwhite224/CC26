const page = document.querySelector(".page");
const hoverWords = document.querySelectorAll(".hover-word");

const defaultGif = page.dataset.defaultGif;
page.style.backgroundImage = `url("${defaultGif}")`;

hoverWords.forEach(word => {
  word.addEventListener("mouseenter", () => {
    const gif = word.dataset.gif;
    page.style.backgroundImage = `url("${gif}")`;
  });

  word.addEventListener("mouseleave", () => {
    page.style.backgroundImage = `url("${defaultGif}")`;
  });
});