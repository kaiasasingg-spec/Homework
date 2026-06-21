function getRandomNumber() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const randomNumber = Math.floor(Math.random() * 100) + 1;

            // 10% шанс помилки для демонстрації try...catch
            if (Math.random() < 0.1) {
                reject("Сталася помилка!");
            } else {
                resolve(randomNumber);
            }
        }, 2000);
    });
}

document.getElementById("btn").addEventListener("click", async () => {
    const result = document.getElementById("result");

    result.textContent = "Очікування...";

    try {
        const number = await getRandomNumber();
        result.textContent = `Випадкове число: ${number}`;
    } catch (error) {
        result.textContent = `Помилка: ${error}`;
    }
});