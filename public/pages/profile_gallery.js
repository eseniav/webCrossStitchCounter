export default {
    title: "Галерея профиля",
    content: "<div>Галерея пользователя</div>",
    url: "/profile/:userId/gallery",
    init: function(params) {
        console.log("Галерея профиля для пользователя:", params.userId);
        // Логика загрузки галереи
    }
};
