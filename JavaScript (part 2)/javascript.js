// 1
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

// 2
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

// 3
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

// 4
let year = Number(prompt("Введіть рік:"));

if ((year % 400 === 0) || (year % 4 === 0 && year % 100 !== 0)) {
    alert("Рік високосний");
}
else {
    alert("Рік не високосний");
}