// Массив доменов, с которых разрешены кросс-доменные запросы
const allowedCors = [
  'https://mesto.ivanovann.nomoredomains.work',
  'http://mesto.ivanovann.nomoredomains.work',
  'localhost:3000',
  'https://localhost:3000',
  'http://localhost:3000',
];

const cors = function cors(req, res, next) {
  // Сохраняем источник запроса в переменную origin
  const { origin } = req.headers;
  const requestHeaders = req.headers['access-control-request-headers'];
  // Сохраняем тип запроса (HTTP-метод) в соответствующую переменную
  const { method } = req;
  // проверяем, что источник запроса есть среди разрешённых
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  // Значение для заголовка Access-Control-Allow-Methods по умолчанию (разрешены все типы запросов)
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

  // Если это предварительный запрос, добавляем нужные заголовки
  if (method === 'OPTIONS') {
    // разрешаем кросс-доменные запросы любых типов (по умолчанию)
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    // разрешаем кросс-доменные запросы с этими заголовками
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }
  return next();
};

module.exports = cors;
