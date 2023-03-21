const REMOVE_TIME = 10000;
const BASE_URL = 'https://28.javascript.pages.academy/kekstagram';
const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};
const Method = {
  GET: 'GET',
  POST: 'POST',
};
const ErrorText = {
  GET_DATA: 'Не удалось загрузить фотографии. Попробуйте обновить страницу!',
  SEND_DATA: 'Не удалось отправить форму. Попробуйте ещё раз!',
};

const addErrorMessage = (element) => document.body.append(element);

const removeErrorMessage = (element) => setTimeout(() => element.remove(), REMOVE_TIME);

export const createErrorMessage = (message) => {
  const div = document.createElement('div');
  div.classList.add('error-message');
  div.textContent = message;
  addErrorMessage(div);
  removeErrorMessage(div);
};

const load = (route, errorText, method = Method.GET, body = null) =>
  fetch(BASE_URL + route, { method, body })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error();
    })
    .catch(() => {
      throw new Error(errorText);
    });

export const getData = () => load(Route.GET_DATA, ErrorText.GET_DATA);
