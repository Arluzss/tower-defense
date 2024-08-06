import express, { Request, Response } from 'express';
import { exec } from 'child_process';
import cors from 'cors';
import data from '../atlas/atlas.json' assert { type: "json" };

const app = express();

app.use(cors());
const port = 3000;

const width = 150;
const height = 150;

const montage = "magick montage ./atlas/tiles/*.png -background transparent -tile 10x8 -geometry 150X150 ./atlas/batata.png";
const composite = "magick composite -gravity northwest ./atlas/batata.png ./atlas/background.png ./public/images/teste.png";
const del = 'del .\\atlas\\batata.png && del .\\atlas\\tiles\\*.png';

const tiles = [
  [2, 47, 47, 47, 47, 47, 47, 47, 47, 47],
  [2, 47, 47, 47, 47, 55, 47, 47, 47, 47],
  [2, 47, 47, 47, 47, 46, 46, 47, 47, 47],
  [30, 3, 3, 3, 3, 3, 3, 3, 3, 3],
  [47, 42, 47,47, 46, 46, 51, 52, 53, 55],
  [47, 47, 47, 47, 47, 47, 47, 47, 47, 47]
];

app.get('/create', (req: Request, res: Response) => {
  res.json(data);
  console.log('OKAY :)');
  testando();
});

app.get('/delete', (req: Request, res: Response) => {
  res.send('Hello World!');
  final(del);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

function testando() {
  let k = 0;
  for (let i = 0; i < tiles.length; i++) {
    for (let j = 0; j < tiles[i].length; j++) {
      test(k, data.tiled[tiles[i][j]].x, data.tiled[tiles[i][j]].y);
      k++;
    }
  }
  setTimeout(() => final(montage), 3000);
  setTimeout(() => final(composite), 5000);
  setTimeout(() => final(del), 15000);
  console.log(data.tiled)
}

function test(index: number, x: number, y: number) {
  let tields = `magick ./atlas/atlas.png -crop ${width}x${height}+${x}+${y} ./atlas/tiles/tile${index + 10}.png`;

  exec(tields, (error, stdout, stderr) => {
    if (error) {
      console.error(`Erro: ${error.message}`);
      return;
    }

    if (stderr) {
      console.log(`Stdout: x ${x} - y ${y} ${stdout}`);
      return;
    }

    if (stdout) {
      console.log(`Stdout: x ${x} - y ${y} ${stdout}`);
    }

  });
}

function final(comando: string) {
  exec(comando, (error, stdout, stderr) => {
    if (error) {
      console.error(`Erro: ${error.message}`);
      return;
    }

    if (stderr) {
      console.error(`Stderr: ${stderr}`);
      return;
    }

    if (stdout) {
      console.log(`Stdout: ${stdout}`);
    }

    console.log('Comando Realizado com Sucesso');
  });
}