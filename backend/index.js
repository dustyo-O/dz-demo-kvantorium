const cors = require('cors');
const express = require('express');
const app = express();
const jsonfile = require('jsonfile');

console.dir()
app.use(cors());
app.options('*', cors());

const port = 3000;
const ticketsFile = './tickets.json';

const tickets = jsonfile.readFileSync(ticketsFile);

app.get('/ping', (req, res) => {
  res.send('pong');
});

app.get('/ticket/put/:id', (req, res) => {
  if (tickets[req.params.id]) {
    res.json({ "status": "error" });

    return;
  }

  tickets[req.params.id] = true;

  jsonfile.writeFileSync(ticketsFile, tickets);
  res.json({ "status": "ok" });
});

app.get('/ticket/check/:id', (req, res) => {
  if (!tickets[req.params.id]) {
    res.json({ "status": "error" });

    return;
  }

  tickets[req.params.id] = undefined;
  jsonfile.writeFileSync(ticketsFile, tickets);

  res.json({ "status": "ok" });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})
