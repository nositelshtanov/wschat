# Клиент-серверное приложение wschat

![view](./img.png)

## Описание проекта

**wschat** - это простое клиент-серверное приложение, демонстрирующее возможности web socket'ов на примере real-time чата.

## Обзор приложения

В приложении реализован следующий функционал:
- авторизация под уникальным именем
- создание пользовательских **комнат** (чатов)
- главная комната
- уведомление участников чата о вступлении и выходе из комнаты других участников
- отправка текстовых сообщений
- отображение списка участников чата
- отображение списка комнат

Чтобы попробовать программу, следуйте инструкциям:
- склонируйте репозиторий
- установите node.js и npm ([установить](https://nodejs.org/en/))
- перейдите в католог "server/", введите команду ```npm i```, а затем ```node index.js```
- в каталоге "client/" также установите покеты командой ```npm i```, и запустите клиентское приложение ```npm start```. 
- Откроется браузер с приложением
- Запустите *еще один* процесс браузера и введите "localhost:3000" в адресной строке

## Используемные технологии

Приложение реализовано с помощью **React.js** библиотеки для создания одностраничных клиентских приложений, **node.js** и пакета "ws", который позволяет удобно работать с протоколом Web Socket 

## Информация о разработке

Данная программа разрабатывалась в учебных целях
