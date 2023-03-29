const BASE_URL = 'https://28.javascript.pages.academy/kekstagram';
const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/s',
};
const Method = {
  GET: 'GET',
  POST: 'POST',
};

const load = (route, method, body = null) =>
  fetch(BASE_URL + route, { method, body })
    .then((response) => response.json())
    .catch(() => {
      throw new Error('Не удалось загрузить фотографии. Попробуйте обновить страницу!');
    });

const getData = () => load(Route.GET_DATA, Method.GET);

const sendData = (body) => load(Route.SEND_DATA, Method.POST, body);

export { getData, sendData };
