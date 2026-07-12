/*
  BIBLIOTECA VIRTUAL COM LIVROS DO CANVA

  Para cadastrar outro livro, copie um dos objetos abaixo e altere:
  - id
  - titulo
  - autor
  - capa
  - embedUrl
  - externalUrl

  "capa" pode ficar vazia. Nesse caso, o site cria uma capa automática.
*/

const books = [
  {
    id: "magico-de-oz",
    titulo: "O Mágico de Oz",
    autor: "L. Frank Baum",
    capa: "",
    embedUrl:
      "https://www.canva.com/design/DAGRUNuRx1U/85TKi6IBIb75k03D2chN-g/view?embed",
    externalUrl:
      "https://www.canva.com/design/DAGRUNuRx1U/85TKi6IBIb75k03D2chN-g/view"
  }

  /*
  Para adicionar outro livro, coloque uma vírgula depois do objeto acima
  e cole este modelo:

  ,
  {
    id: "novo-livro",
    titulo: "Título do novo livro",
    autor: "Nome do autor",
    capa: "capas/novo-livro.jpg",
    embedUrl: "LINK_DO_IFRAME_DO_CANVA",
    externalUrl: "LINK_DE_VISUALIZACAO_DO_CANVA"
  }
  */
];

const ui = {
  librarySection: document.getElementById("librarySection"),
  readerSection: document.getElementById("readerSection"),
  bookGrid: document.getElementById("bookGrid"),
  emptyMessage: document.getElementById("emptyMessage"),
  searchInput: document.getElementById("searchInput"),
  backButton: document.getElementById("backButton"),
  readerTitle: document.getElementById("readerTitle"),
  readerAuthor: document.getElementById("readerAuthor"),
  readerArea: document.getElementById("readerArea"),
  externalLink: document.getElementById("externalLink")
};

function normalizeText(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function createPlaceholder(book) {
  const element = document.createElement("div");
  element.className = "cover-placeholder";
  element.textContent = book.titulo;
  return element;
}

function createCover(book) {
  if (!book.capa) return createPlaceholder(book);

  const image = document.createElement("img");
  image.className = "book-cover";
  image.src = book.capa;
  image.alt = `Capa do livro ${book.titulo}`;
  image.loading = "lazy";

  image.addEventListener("error", () => {
    image.replaceWith(createPlaceholder(book));
  });

  return image;
}

function createBookCard(book) {
  const card = document.createElement("article");
  card.className = "book-card";

  const content = document.createElement("div");
  content.className = "book-content";

  const title = document.createElement("h3");
  title.textContent = book.titulo;

  const author = document.createElement("p");
  author.className = "muted";
  author.textContent = book.autor || "Autor não informado";

  const readButton = document.createElement("button");
  readButton.className = "button button--primary";
  readButton.type = "button";
  readButton.textContent = "Ler agora";
  readButton.addEventListener("click", () => openBook(book));

  content.append(title, author, readButton);
  card.append(createCover(book), content);

  return card;
}

function renderBooks(list = books) {
  ui.bookGrid.innerHTML = "";

  if (!list.length) {
    ui.emptyMessage.classList.remove("hidden");
    return;
  }

  ui.emptyMessage.classList.add("hidden");

  const fragment = document.createDocumentFragment();
  list.forEach((book) => fragment.appendChild(createBookCard(book)));
  ui.bookGrid.appendChild(fragment);
}

function openBook(book) {
  if (!book.embedUrl) {
    alert("Este livro ainda não possui um link de leitura.");
    return;
  }

  ui.readerTitle.textContent = book.titulo;
  ui.readerAuthor.textContent = book.autor || "Autor não informado";
  ui.externalLink.href =
    book.externalUrl || book.embedUrl.replace("?embed", "");

  ui.readerArea.innerHTML = `
    <div class="canva-frame">
      <iframe
        loading="lazy"
        src="${book.embedUrl}"
        title="Leitor do livro ${book.titulo}"
        allowfullscreen="allowfullscreen"
        allow="fullscreen">
      </iframe>
    </div>
  `;

  ui.librarySection.classList.add("hidden");
  ui.readerSection.classList.remove("hidden");
  ui.backButton.classList.remove("hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function closeBook() {
  ui.readerArea.innerHTML = "";
  ui.readerSection.classList.add("hidden");
  ui.librarySection.classList.remove("hidden");
  ui.backButton.classList.add("hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function searchBooks() {
  const term = normalizeText(ui.searchInput.value);

  if (!term) {
    renderBooks(books);
    return;
  }

  const result = books.filter((book) =>
    normalizeText(`${book.titulo} ${book.autor}`).includes(term)
  );

  renderBooks(result);
}

ui.searchInput.addEventListener("input", searchBooks);
ui.backButton.addEventListener("click", closeBook);

renderBooks();