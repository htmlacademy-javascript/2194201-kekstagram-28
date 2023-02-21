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
