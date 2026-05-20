// 1
let data = prompt("Введіть будь-які дані:");
alert("Ви ввели: " + data);

// 2
let name = prompt("Введіть ваше ім'я:");
alert("Привіт, " + name + "!");

// 3
const currentYear = 2026;

let birthYear = prompt("Введіть ваш рік народження:");
let age = currentYear - birthYear;

alert("Ваш вік: " + age);

// 4
let side = prompt("Введіть довжину сторони квадрата:");
let perimeter = side * 4;

alert("Периметр квадрата: " + perimeter);

// 5
let radius = prompt("Введіть радіус кола:");
let area = Math.PI * radius * radius;

alert("Площа кола: " + area.toFixed(2));

// 6
let distance = prompt("Введіть відстань між містами (км):");
let hours = prompt("За скільки годин хочете дістатися?");

let speed = distance / hours;

alert("Потрібна швидкість: " + speed.toFixed(2) + " км/год");

// 7
const rate = 0.92;

let dollars = prompt("Введіть суму в доларах:");
let euros = dollars * rate;

alert("У євро: " + euros.toFixed(2));

// 8
let flashGB = prompt("Введіть обсяг флешки у ГБ:");
let flashMB = flashGB * 1024;

let files = Math.floor(flashMB / 820);

alert("Вміститься файлів: " + files);

// 9
let money = prompt("Скільки грошей у гаманці?");
let chocolatePrice = prompt("Вартість однієї шоколадки:");

let chocolates = Math.floor(money / chocolatePrice);
let change = money % chocolatePrice;

alert(
    "Ви можете купити " +
    chocolates +
    " шоколадок.\nЗдача: " +
    change
);

// 10
let number = prompt("Введіть тризначне число:");

let hundreds = Math.floor(number / 100);
let tens = Math.floor((number % 100) / 10);
let ones = number % 10;

let reversed = "" + ones + tens + hundreds;

alert("Паліндром: " + reversed);

// 11
let num = prompt("Введіть ціле число:");

alert(
    (num % 2 === 0 && "Парне") ||
    (num % 2 !== 0 && "Непарне")
);