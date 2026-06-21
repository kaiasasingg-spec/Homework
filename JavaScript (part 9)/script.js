const form = document.getElementById("carForm");
const carTable = document.getElementById("carTable");
const totalCars = document.getElementById("totalCars");

const cars = [];

function updateCounter() {
    totalCars.textContent = `Загальна кількість автомобілів: ${cars.length}`;
}

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const brand = document.getElementById("brand").value.trim();
    const model = document.getElementById("model").value.trim();
    const year = document.getElementById("year").value.trim();
    const price = document.getElementById("price").value.trim();

    if (!brand || !model || !year || !price) {
        alert("Заповніть усі поля");
        return;
    }

    const car = { brand, model, year, price };
    cars.push(car);

    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${brand}</td>
        <td>${model}</td>
        <td>${year}</td>
        <td>${price}</td>
        <td><button class="delete-btn">Видалити</button></td>
    `;

    row.querySelector(".delete-btn").addEventListener("click", function () {
        const index = cars.indexOf(car);
        if (index !== -1) {
            cars.splice(index, 1);
        }
        row.remove();
        updateCounter();
    });

    carTable.appendChild(row);

    form.reset();
    updateCounter();
});