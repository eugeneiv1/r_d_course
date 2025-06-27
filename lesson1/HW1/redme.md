# Habit Tracker CLI

> Консольний застосунок на з використанням node.js
> Архітектура: 
>   Router: Визначає, яку команду викликати (add, list, done, delete, stats, etc.)
>   Controller: Обробка CLI-параметрів
>   Service: Бізнес-логіка: створення, фільтрація, статистика
>   Model: Читання і запис db.json
> Дані зберігаються у `db.json`


---

## Запуск

> npm install         # створює lock-файл, хоча залежностей немає
> node server.js ...   # запуск команди CLI


## Приклад команд CLI

> node server.js add --name "<назва>" --freq <daily|weekly|monthly>
> node server.js list
> node server.js done --id <id>
> node server.js stats
> node server.js delete --id <id>
> node server.js update --id <id> --name "<нова назва>" --freq <daily|weekly|monthly>

## Структура звички 

````
{
"id": "1750070376881",
"name": "Drink water",
"freq": "daily",
"log": ["2025-06-15", "2025-06-16"]
}
````
> freq -> регулярність daily, weekly, monthly
> log -> масив дат, коли звичка виконувалась

