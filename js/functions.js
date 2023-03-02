const checkLimit = (string, length) => string.length <= length;

const isPalindrome = (string) => {
  string = string.toLowerCase().replaceAll(' ', '');
  return string === string.split('').reverse().join('');
};

const extractNumber = (string) => {
  string = String(string).replace(/\D/g, '');
  return parseInt(string, 10);
};

const getPadString = (string, minLength, pad) => {
  while (string.length < minLength) {
    string = pad.slice(0, minLength - string.length) + string;
  }
  return string;
};

checkLimit('проверяемая строка', 20);
isPalindrome('топот');
extractNumber('2023 год');
getPadString('q', 4, 'we');
