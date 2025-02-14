import { fastify } from "fastify";
// import { DatabaseMemory } from "./database-memory.js";
import { DatabasePostgres } from "./database-postgres.js";

const server = fastify();

// const database = new DatabaseMemory();

const database = new DatabasePostgres();

server.post("/videos", async (req, rep) => {
  const { title, description, duration } = req.body;

  await database.create({
    title,
    description,
    duration,
  });

  return rep.status(201).send();
});

// Query
server.get("/videos", async (req) => {
  const search = req.query.search;

  console.log(search);

  const videos = await database.list(search);

  return videos;
});
// Fim query and search

// server.get("/videos", () => {
//   const videos = database.list();

//   return videos;
// });

server.put("/videos/:id", async (req, rep) => {
  const videoId = req.params.id;
  const { title, description, duration } = req.body;

  await database.update(videoId, {
    title,
    description,
    duration,
  });
  return rep.status(204).send();
  // const video = database.get(videoId);
});

server.delete("/videos/:id", async (req, rep) => {
  const videoId = req.params.id;

  await database.delete(videoId);

  return rep.status(204).send();
});

server.listen({
  port: process.env.PORT ?? 3333,
});

//
//
/**
 * backup init
 */

// import { fastify } from "fastify";

// const server = fastify();

// // POST http://localhost:3333/videos

// server.get("/", () => {
//   return "Hello World!";
// });

// server.get("/hello", () => {
//   return "Hello rota 1!";
// });

// server.get("/node", () => {
//   return "Hello rota 2!";
// });

// server.listen({
//   port: 3333,
// });
