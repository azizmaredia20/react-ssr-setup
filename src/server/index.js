import path from 'path';
import fs from 'fs';
import express from 'express';

import serverRender from './serverRender';

const app = express();
const port = 4000;

app.use(express.static(path.join(__dirname, '../../public')));

app.get('/*', (req, res) => {
  const app = serverRender(req.path);
  console.log('Final String rendered', app);
  const indexFile = path.resolve('./public/index.html');

  fs.readFile(indexFile, 'utf8', (err, data) => {
    if (err) {
      console.error('Something went wrong:', err);
      return res.status(500).send('Oops, better luck next time!');
    }

    return res.send(
      data.replace('<div id="root"></div>', `<div id="root">${app}</div>`)
    );
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});