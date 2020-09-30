const links = document.querySelectorAll("a");

function handleClick(event) {
  event.preventDefault();
  
  handleFetchUrl(event.target.href);
  window.history.pushState(null, null, event.target.href);
}

async function handleFetchUrl(url) {
  document.querySelector('.content').innerText = 'Carregando';
  const pageResults = await fetch(url);
  const pageText = await pageResults.text();

  handleReplaceHtml(pageText);
}

function handleReplaceHtml(newText) {
  const newHtml = document.createElement('div');
  newHtml.innerHTML = newText;

  const oldContent = document.querySelector('.content');
  const newContent = newHtml.querySelector('.content');

  oldContent.innerHTML = newContent.innerHTML;
  document.title = newHtml.querySelector('title').innerText;
}

window.addEventListener('popstate', () => {
  handleFetchUrl(window.location.href);
});

links.forEach((link) => {
  link.addEventListener("click", handleClick);
});
