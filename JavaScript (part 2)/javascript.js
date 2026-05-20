
let age = Number(prompt("Введіть ваш вік:"));

if (age >= 0 && age < 12) {
    alert("Ви дитина");
}
else if (age >= 12 && age < 18) {
    alert("Ви підліток");
}
else if (age >= 18 && age < 60) {
    alert("Ви дорослий");
}
else if (age >= 60) {
    alert("Ви пенсіонер");
}
else {
    alert("Некоректний вік");
}


let number = prompt("Введіть число від 0 до 9:");

switch (number) {
    case "1":
        alert("!");
        break;
    case "2":
        alert("@");
        break;
    case "3":
        alert("#");
        break;
    case "4":
        alert("$");
        break;
    case "5":
        alert("%");
        break;
    case "6":
        alert("^");
        break;
    case "7":
        alert("&");
        break;
    case "8":
        alert("*");
        break;
    case "9":
        alert("(");
        break;
    case "0":
        alert(")");
        break;
    default:
        alert("Невірне число");
}


let num = prompt("Введіть тризначне число:");

let a = num[0];
let b = num[1];
let c = num[2];

if (a === b || a === c || b === c) {
    alert("Є однакові цифри");
}
else {
    alert("Однакових цифр немає");
}


let year = Number(prompt("Введіть рік:"));

if ((year % 400 === 0) || (year % 4 === 0 && year % 100 !== 0)) {
    alert("Рік високосний");
}
else {
    alert("Рік не високосний");
}


let palindrome = prompt("Введіть п'ятирозрядне число:");

if (
    palindrome[0] === palindrome[4] &&
    palindrome[1] === palindrome[3]
) {
    alert("Число паліндром");
}
else {
    alert("Число не паліндром");
}


let usd = Number(prompt("Введіть суму в USD:"));
let currency = prompt("Оберіть валюту: EUR, UAH або AZN");

switch (currency.toUpperCase()) {
    case "EUR":
        alert("Сума: " + (usd * 0.92).toFixed(2) + " EUR");
        break;

    case "UAH":
        alert("Сума: " + (usd * 41).toFixed(2) + " UAH");
        break;

    case "AZN":
        alert("Сума: " + (usd * 1.7).toFixed(2) + " AZN");
        break;

    default:
        alert("Невірна валюта");
}


let purchase = Number(prompt("Введіть суму покупки:"));
let discount = 0;

if (purchase >= 200 && purchase < 300) {
    discount = 3;
}
else if (purchase >= 300 && purchase < 500) {
    discount = 5;
}
else if (purchase >= 500) {
    discount = 7;
}

let finalPrice = purchase - (purchase * discount / 100);

alert("Сума до сплати: " + finalPrice.toFixed(2));


let circleLength = Number(prompt("Введіть довжину кола:"));
let squarePerimeter = Number(prompt("Введіть периметр квадрата:"));

let radius = circleLength / (2 * Math.PI);
let diameter = radius * 2;

let squareSide = squarePerimeter / 4;

if (diameter <= squareSide) {
    alert("Коло поміститься у квадрат");
}
else {
    alert("Коло не поміститься у квадрат");
}


let score = 0;

let q1 = prompt("Скільки буде 2 + 2?\n1) 3\n2) 4\n3) 5");

if (q1 === "2") {
    score += 2;
}

let q2 = prompt("Столиця України?\n1) Київ\n2) Львів\n3) Одеса");

if (q2 === "1") {
    score += 2;
}

let q3 = prompt("Скільки днів у тижні?\n1) 5\n2) 6\n3) 7");

if (q3 === "3") {
    score += 2;
}

alert("Ваш результат: " + score + " балів");


let day = Number(prompt("Введіть день:"));
let month = Number(prompt("Введіть місяць:"));
let inputYear = Number(prompt("Введіть рік:"));

let daysInMonth = 31;

if (month === 4 || month === 6 || month === 9 || month === 11) {
    daysInMonth = 30;
}
else if (month === 2) {

    if (
        (inputYear % 400 === 0) ||
        (inputYear % 4 === 0 && inputYear % 100 !== 0)
    ) {
        daysInMonth = 29;
    }
    else {
        daysInMonth = 28;
    }
}

day++;

if (day > daysInMonth) {
    day = 1;
    month++;
}

if (month > 12) {
    month = 1;
    inputYear++;
}

alert(
    "Наступна дата: " +
    day + "." +
    month + "." +
    inputYear
);