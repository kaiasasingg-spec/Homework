
const student = {
    name: "Іван",
    age: 16,
    group: "a-1",
    favoriteSubjects: [
        "Математика",
        "Інформатика",
        "Фізкультура"
    ]
};

const studentJSON = JSON.stringify(student);

console.log("JSON:");
console.log(studentJSON);

const restoredStudent = JSON.parse(studentJSON);

console.log("Ім'я:", restoredStudent.name);
console.log("Вік:", restoredStudent.age);
console.log("Група:", restoredStudent.group);
console.log("Улюблені предмети:", restoredStudent.favoriteSubjects);