import http from "http";
import fs from "fs";
import path from "path";
import { PORT, HOST, MESSAGE } from "./env.js";

const STATIC_PATH = './';

// Функция для определения MIME-типа по расширению файла
const mimeType = (filePath) => {
  const ext = path.extname(filePath).toLowerCase();
  const types = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.png': 'image/png',
    '.jpg': 'image/jpeg'
  };

  return types[ext] || 'application/octet-stream'; // Для неизвестных расширений — бинарные данные
}

const server = http.createServer((req, res) => {
  const filePath = path.join(STATIC_PATH, req.url === '/' ? 'index.html' : req.url);

  const requestUrl = new URL( req.url, `http://${req.headers.host || 'localhost'}` );

  if ( requestUrl.pathname === '/api/config' && req.method === 'GET' ) {
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', });
    res.end(JSON.stringify({ text: MESSAGE || 'Текст не задан', }));

    return;
  }

  fs.access(filePath, fs.constants.F_OK, (exists) => {
    if (!exists) {
      // Читаем файл и отправляем с правильными заголовками
      fs.readFile(filePath, 'utf-8', (err, data) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', mimeType(filePath)); // Определяем тип MIME
        res.end(data)
      });
    } else {
      // Файл не найден — отправляем 404
      res.statusCode = 404;
      res.end('404 Not Found');
    }
  });
});

server.listen(PORT, HOST, () => {
  console.log(`Сервер запущен по адресу http://${HOST}:${PORT}/`);
});