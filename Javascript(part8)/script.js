// Створення об'єкта student
const student = {
    name: "Іван",
    age: 18,
    group: "КН-101",
    favoriteSubjects: [
        "Математика",
        "Інформатика",
        "Фізика"
    ]
};

// Перетворення об'єкта в JSON
const studentJSON = JSON.stringify(student);

// Виведення JSON у консоль
console.log("JSON:");
console.log(studentJSON);

// Відновлення об'єкта з JSON
const restoredStudent = JSON.parse(studentJSON);

// Виведення властивостей відновленого об'єкта
console.log("Ім'я:", restoredStudent.name);
console.log("Вік:", restoredStudent.age);
console.log("Група:", restoredStudent.group);
console.log("Улюблені предмети:", restoredStudent.favoriteSubjects);