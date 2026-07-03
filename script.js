/*
  COMO CADASTRAR UM LIVRO:

  1. Crie uma pasta dentro de /livros
     Exemplo: livros/meu-livro

  2. Coloque as imagens numeradas assim:
     1.jpg = capa
     2.jpg = primeira página
     3.jpg = segunda página
     4.jpg = terceira página

  3. Cadastre abaixo o título, a pasta e o totalArquivos.
     Se o livro vai de 1.jpg até 20.jpg, use totalArquivos: 20
*/

const livros = [
  {
    id: "livro-exemplo",
    titulo: "Livro de Exemplo",
    pasta: "livros/livro-exemplo",
    totalArquivos: 6,
    descricao: "Um exemplo de cadastro. Troque pelo seu livro."
  }
  {
    id: "A-Luz-do-Mundo",
    titulo: "A Luz do Mundo",
    pasta: "livros/A-Luz-do-Mundo",
    totalArquivos: 18,
    descricao: "A vida de Jesus Cristo para crianças com imagens para colorir.."
  }

  // Para adicionar outro livro, copie o modelo abaixo:
  // ,{
  //   id: "segundo-livro",
  //   titulo: "Segundo Livro",
  //   pasta: "livros/segundo-livro",
  //   totalArquivos: 18,
  //   descricao: "Descrição curta do livro."
  // }
];

const biblioteca = document.getElementById("biblioteca");
const leitor = document.getElementById("leitor");
const estante = document.getElementById("estante");
const totalLivros = document.getElementById("totalLivros");
const tituloLivro = document.getElementById("tituloLivro");
const contadorPaginas = document.getElementById("contadorPaginas");
const imagemPagina = document.getElementById("imagemPagina");

const btnVoltar = document.getElementById("btnVoltar");
const btnAnterior = document.getElementById("btnAnterior");
const btnProxima = document.getElementById("btnProxima");
const btnAnteriorRodape = document.getElementById("btnAnteriorRodape");
const btnProximaRodape = document.getElementById("btnProximaRodape");

let livroAtual = null;
let arquivoAtual = 2;

function carregarEstante() {
  estante.innerHTML = "";
  totalLivros.textContent = `${livros.length} livro(s)`;

  livros.forEach((livro) => {
    const card = document.createElement("article");
    card.className = "card-livro";

    card.innerHTML = `
      <img src="${livro.pasta}/1.jpg" alt="Capa do livro ${livro.titulo}" onerror="this.src=''; this.alt='Capa não encontrada';" />
      <div class="card-conteudo">
        <h3>${livro.titulo}</h3>
        <p>${livro.descricao || "Livro digital disponível para leitura."}</p>
        <button class="btn" type="button">Ler agora</button>
      </div>
    `;

    card.querySelector("button").addEventListener("click", () => abrirLivro(livro));
    estante.appendChild(card);
  });
}

function abrirLivro(livro) {
  livroAtual = livro;
  arquivoAtual = 2;

  biblioteca.classList.add("oculto");
  leitor.classList.remove("oculto");

  mostrarPagina();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function mostrarPagina() {
  if (!livroAtual) return;

  imagemPagina.src = `${livroAtual.pasta}/${arquivoAtual}.jpg`;
  imagemPagina.alt = `${livroAtual.titulo} - página ${arquivoAtual - 1}`;

  tituloLivro.textContent = livroAtual.titulo;
  contadorPaginas.textContent = `Página ${arquivoAtual - 1} de ${livroAtual.totalArquivos - 1}`;

  atualizarBotoes();
}

function atualizarBotoes() {
  const estaNaPrimeiraPagina = arquivoAtual <= 2;
  const estaNaUltimaPagina = arquivoAtual >= livroAtual.totalArquivos;

  btnAnterior.disabled = estaNaPrimeiraPagina;
  btnAnteriorRodape.disabled = estaNaPrimeiraPagina;
  btnProxima.disabled = estaNaUltimaPagina;
  btnProximaRodape.disabled = estaNaUltimaPagina;
}

function paginaAnterior() {
  if (arquivoAtual > 2) {
    arquivoAtual--;
    mostrarPagina();
  }
}

function proximaPagina() {
  if (livroAtual && arquivoAtual < livroAtual.totalArquivos) {
    arquivoAtual++;
    mostrarPagina();
  }
}

function voltarBiblioteca() {
  leitor.classList.add("oculto");
  biblioteca.classList.remove("oculto");
  livroAtual = null;
  arquivoAtual = 2;
  window.scrollTo({ top: 0, behavior: "smooth" });
}

btnVoltar.addEventListener("click", voltarBiblioteca);
btnAnterior.addEventListener("click", paginaAnterior);
btnAnteriorRodape.addEventListener("click", paginaAnterior);
btnProxima.addEventListener("click", proximaPagina);
btnProximaRodape.addEventListener("click", proximaPagina);

// Navegação pelo teclado em computador.
document.addEventListener("keydown", (evento) => {
  if (!livroAtual) return;

  if (evento.key === "ArrowLeft") paginaAnterior();
  if (evento.key === "ArrowRight") proximaPagina();
  if (evento.key === "Escape") voltarBiblioteca();
});

carregarEstante();
