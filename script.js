const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");

let apiQuotes = [];

function newQuote() {
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

  if (!quote.author) {
    authorText.textContent = "Unkown";
  } else {
    authorText.textContent = quote.author;
  }

  if (quote.quote.length > 50) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }

  quoteText.textContent = quote.quote;
}

async function getQuotes() {
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
    // alert("No Quotes Found");
  }
}


function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

//Even Listners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote)

getQuotes();
