const isStringLength = (string, length) => string.length <= length;

const isPalindrom = (string) => {
  string = string.toLowerCase().replaceAll(' ', '');
  let reverseString = '';

  for (let i = string.length - 1; i >= 0; i--) {
    reverseString += string.at(i);
  }

  return string === reverseString;
};

const getNumber = (string) => {
  if (typeof string === 'number') {
    return Math.abs(parseInt(string.toString().replace('.', ''), 10));
  }

  let number = '';

  for (let i = 0; i < string.length; i++) {
    if (Number.isNaN(parseInt(string.at(i), 10))) {
      continue;
    }
    number += string.at(i);
  }

  return parseInt(number, 10);
};

const getPadString = (string, minLength, pad) => {
  const newPad = minLength - string.length;

  if (0 >= newPad) {
    return string;
  }

  return (
    pad.slice(0, newPad % pad.length) + pad.repeat(newPad / pad.length) + string
  );
};

isStringLength('проверяемая строка', 20);
isPalindrom('топот');
getNumber('2023 год');
getPadString('1', 2, '0');
