// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.set("view engine", "pug");
app.set("views", "./views");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.send("Hello");
});

const todos = ["Đi chợ", "Nấu cơm", "Rửa bát", "Học code tại CodersX"];

app.get("/todos", (req, res) => {
  res.render("index", { todos, q: "" });
});

app.get("/todos/search", (req, res) => {
  var q = req.query.q;
  var matchedTodos = todos.filter(todo => {
    return todo.toLowerCase().indexOf(q.toLowerCase()) >= 0;
  });
  res.render("index", { todos: matchedTodos, q });
});

app.get("/todos/create", (req, res) => {
  res.render("create.pug");
});
app.post("/todos/create", (req, res) => {
  todos.push(req.body.name);
  res.redirect("/todos");
});
// listen for requests :)
app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});
