export default {
    title: "Избранное профиля",
    content: "<div>Избранное пользователя</div>",
    url: "/profile/:userId/favorite",
    init: function(params) {
        console.log("Избранное профиля для пользователя:", params.userId);
        // Логика загрузки избранного
    }
};
