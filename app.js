//Variables
const input = document.querySelector(".shorten-it input");
const shortItButton = document.querySelector(".shorten-it button");
const shortenItEl = document.querySelector(".shorten-it-results");
const error = document.querySelector(".input span");
//Functions
async function fetchApi(url) {
  const response = await fetch(`https://api.shrtco.de/v2/shorten?url=${url}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });
  const data = await response.json();
  return data;
}

function copyButtonFunction(div) {
  const shortLink = div.querySelector(".short-link");
  const copyButton = div.querySelector(".link-results button");
  copyButton.addEventListener("click", (e) => {
    copyButton.textContent = "Copied";
    copyButton.style.background = "hsl(257, 27%, 26%)";
    navigator.clipboard.writeText(shortLink.textContent);
    setTimeout(() => {
      copyButton.textContent = "Copy";
      copyButton.style.background = "#2acfcf";
    }, 4000);
  });
}

function appendDiv(fullLink, shortLink) {
  const div = document.createElement("div");
  div.classList.add("links");
  div.innerHTML = `
        <span class="main-link">${fullLink}</span>
        <div class="link-results">
        <span class="short-link">${shortLink}</span>
        <button>Copy</button>
        </div>
  `;
  shortenItEl.appendChild(div);
  copyButtonFunction(div);
}
function showErrorMessage() {
  error.classList.remove("not-visible");
  input.classList.add("red-border");
}
function removeErrorMessage() {
  error.classList.add("not-visible");
  input.classList.remove("red-border");
}
async function searchLinks(url) {
  const data = await fetchApi(url);
  if (data.ok === false) {
    showErrorMessage();
  } else {
    removeErrorMessage();
    const shortLink = data.result.full_short_link2;
    appendDiv(url, shortLink);
  }
}

//Event-Listeners
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const value = input.value;
    searchLinks(value);
    input.value = "";
  }
});

shortItButton.addEventListener("click", () => {
  const value = input.value;
  searchLinks(value);
  input.value = "";
});
