const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiQuotes = [];

//Show loading
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function complete() {
  if (!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}

function newQuote() {
  loading();
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

  try {
    if (!quote.author) {
      authorText.textContent = "Unkown";
    } else {
      authorText.textContent = quote.author;
    }
    if (quote.quote.length > 120) {
      quoteText.classList.add("long-quote");
    } else {
      quoteText.classList.remove("long-quote");
    }
    //set quote, hide loader
    quoteText.textContent = quote.quote;
    complete();
  } catch (error) {
    console.log(error + "error");
  }
}

async function getQuotes() {
  loading();
  const apiUrl = "https://dummyjson.com/quotes";
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log("data", data);
    apiQuotes = data.quotes;
    console.log(apiQuotes);
    newQuote();
  } catch (error) {
    console.log("error" + error);
    getQuotes();
  }
}

function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
}

//Even Listners
newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);

getQuotes();
loading();
