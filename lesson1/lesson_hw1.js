const input = process.argv[2];
if (!input) {
    console.error('Будь ласка, передайте масив як аргумент. Приклад: node getSum.js "[1, 2, [3, 4, [5]], 6]"');
    process.exit(1);
}

let array;

try {
    array = JSON.parse(input);
} catch (error) {
    console.error('Помилка: Невірний формат JSON. Переконайтесь, що ви передали правильний масив, наприклад: "[1, 2, [3]]"');
    process.exit(1);
}

const getSum = (arr) => {
    return arr.reduce((acc, item) => {
        if(Array.isArray(item)) {
            return acc + getSum(item)
        }
        return acc + item
    }, 0)
}

const result = getSum(array)
console.log(result)