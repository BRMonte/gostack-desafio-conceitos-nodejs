const express = require("express");
const cors = require("cors");

const { v4: uuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0,
  };

  repositories.push(repository);

  return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { title, url, techs } = request.body;
  const { id } = request.params;

  const findRepositoryIndex = repositories.findIndex(repository => repository.id === id); //procuro o que quero alterar

  if (findRepositoryIndex === -1) { // qnd algo n existe, diante de uma comparação a resposta é -1. A comparação está 2 linnhas acima
    return response.status(400).json({ error: 'Repository does not exist.' })
  }

  const repository = { //novo repositorio que sobrescrerá o original do ID
    id,
    title,
    url,
    techs,
    likes: repositories[findRepositoryIndex].likes,
  };

  repositories[findRepositoryIndex] = repository

  return response.json(repository);

});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params; //defino o que quero deletar: o ID

  const findRepositoryIndex = repositories.findIndex(repository => repository.id === id); //procuro o que quero deletar

  if (findRepositoryIndex >= 0) { //valido/confirmo o que quero deletar + deleto ou nao deleto
    repositories.splice(findRepositoryIndex, 1);
  } else {
    return response.status(400).json({ error: 'Repo does not exist.' });
  }

  return response.status(204).send(); //dou feedback

});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
});

module.exports = app;
