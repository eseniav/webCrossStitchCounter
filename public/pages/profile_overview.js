export default {
    title: "Обзор профиля",
    content: "<div>Страница обзора профиля</div>",
    url: "/profile/:userId/overview",
    init: function(params) {
        console.log("Обзор профиля для пользователя:", params.userId);
        // Здесь логика загрузки данных обзора
    }
};
