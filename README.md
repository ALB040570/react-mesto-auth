# Проект 14: REACT-MESTO-AUTH

- Описание проекта
- Функциональность
- Использованные технологии

**Описание проекта**
Проект на Реакте с авторизацией и регистрацией выполнен по итогам 14-го спринта.
Использованы предыдущие наработки по проекту Mesto - работа 11-го спринта. 
Все запросы на авторизацию, регистрацию и проверку токена  работают через сервис `https://auth.nomoreparties.co`. Остальные запросы, не относящиеся к этой проектной работе работают через сервис из предыдущих спринтов.


**Функциональность**
- Созданы нужные роуты и описаны перенаправления. Если неавторизованный пользователь приходит на сайт, он попадает на страницу входа, на какой бы роут он не пришёл;
- Сверстаны необходимые компоненты: 
    - Login — компонент авторизации пользователя с необходимыми стейт-переменными.
    - Register — компонент регистрации пользователя с необходимыми стейт-переменными.
    - HOC ProtectedRoute — этим компонентом защитите роут /, чтобы на него не смогли перейти неавторизованные пользователи
    - InfoTooltip — компонент модального окна,который информирует пользователя об успешной (или не очень) регистрации.
- Реализована аутентификация пользователя;
- Реализована работа с локальным хранилищем и токеном;
- На странице отрисовывается информация о пользователе и карточки;
- Модальные окна открываются при нажатии на соответствующий элемент интерфейса;
- Модальные окна закрываются при нажатии на иконку закрытия.
- Работа модальных окон настроена: есть возможность редактирования аватара и профиля, добавления новой карточки.
- В форму редактирования профиля подставляются текущие данные.
- Реализовано добавление/удаление лайка.
- Реализовано удаление собственной карточки.


**Использованные технологии**
- React (JavaScript-библиотека для разработки пользовательского интерфейса).
- хуки в React (useState, useEffect, useRef, useHistory)
- поднятие стейта
- маршрутизация
- авторизация и регистрация
