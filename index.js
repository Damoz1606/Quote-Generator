const quoteText = document.querySelector(".quote");
const quoteButton = document.querySelector(".quote-button");
const authorName = document.querySelector(".author .name");
const copyButton = document.querySelector(".copy");
const speechButton = document.querySelector(".speech");
const synth = speechSynthesis;

const randomQuote = () => {
    quoteButton.classList.add("loading");
    quoteButton.innerHTML = "Loading Quote...";
    fetch("http://api.quotable.io/random")
        .then(response => response.json())
        .then(result => {
            quoteText.innerHTML = result.content;
            authorName.innerHTML = result.author;
            quoteButton.classList.remove("loading");
            quoteButton.innerHTML = "New Quote";
        });
}

const speechQuote = () => {
    if (!quoteButton.classList.contains("loading")) {
        const utterance = new SpeechSynthesisUtterance(`${quoteText.innerHTML} by ${authorName.innerHTML}`);
        synth.speak(utterance);
        setInterval(() => {
            !synth.speaking
                ? speechButton.classList.remove("active")
                : speechButton.classList.add("active");
        }, 10);
    }
}

const copyQuote = () => {
    navigator.clipboard.writeText(quoteText.innerHTML);
}

speechButton.addEventListener("click", speechQuote);
copyButton.addEventListener("click", copyQuote);
quoteButton.addEventListener("click", randomQuote);
randomQuote();