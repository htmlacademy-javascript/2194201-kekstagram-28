<<<<<<< HEAD
const isStringLength = (string, length) => {
  return string.length <= length;
};

// console.log(isStringLength("проверяемая строка", 10));

const isPalindrom = (string) => {
  string = string.toLowerCase().replaceAll(" ", "");
  let reverseString = "";

  for (let i = string.length - 1; i >= 0; i--) {
    reverseString += string.at(i);
  }

  return string === reverseString;
};

// console.log(isPalindrom("Лёша на полке клопа нашёл "));

const getNumber = (string) => {
  if (typeof string === "number") {
    return Math.abs(parseInt(string.toString().replace(".", ""), 10));
  }

  let number = "";

  for (let i = 0; i < string.length; i++) {
    if (Number.isNaN(parseInt(string.at(i), 10))) continue;
    number += string.at(i);
  }
};

// console.log(getNumber("2023 год"));
=======
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
>>>>>>> ca24d7b586a130ff0e8b9748ef3b1b618c55f775
