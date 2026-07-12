# Biblioteca Virtual Canva v2

Esta versão carrega os livros diretamente do Canva por meio de um iframe.

## Arquivos

- `index.html`
- `style.css`
- `script.js`
- pasta `capas`

## Como adicionar um novo livro

Abra o arquivo `script.js` e adicione um objeto dentro de `const books`.

```javascript
{
  id: "nome-do-livro",
  titulo: "Nome do Livro",
  autor: "Nome do Autor",
  capa: "capas/nome-do-livro.jpg",
  embedUrl: "https://www.canva.com/design/ID/TOKEN/view?embed",
  externalUrl: "https://www.canva.com/design/ID/TOKEN/view"
}
```

A capa é opcional. Para não usar uma imagem local, deixe:

```javascript
capa: ""
```

## Publicação no Netlify

1. Envie os arquivos para um repositório no GitHub.
2. No Netlify, escolha **Add new site**.
3. Conecte o repositório.
4. Não informe comando de build.
5. Publique usando a pasta raiz do projeto.

Os arquivos completos dos livros permanecem no Canva, reduzindo muito o peso do deploy.
