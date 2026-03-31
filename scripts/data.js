const projects = [
    {
        id: 1,
        name: "Птичка",
        designer: "OwlForest Embroidery (ООО 'Совиный лес')",
        image: "images/2248036369a45c1555a433.48884101.jpg",
        user: "anna",
        width: 190,
        height: 200,
        totalCross: 10000,
        finishDreamDate: "18.12.2027",
        stitchedCrossBeforeRegistration: 200,
        startDate: "11.06.2025",
        stitchedVal: 1200,
        remains: 8800,
        avgSpeedVal: 300,
        prognosisVal: "12.11.2026",
        procent: 25,
        progress: [
            {
                date: "26.03.2025",
                crossQuantity: 260,
                done: 2930,
                remains: 6990
              },
        ],
        tags: [ "животные", "осень"],
    },
    {
        id: 2,
        name: "Лесная фея",
        designer: "Whispering Woods Collection (ООО 'Шёпоты леса')",
        image: "images/IMG_2173.JPG",
        user: "anna",
        width: 180,
        height: 220,
        totalCross: 12000,
        finishDreamDate: "25.03.2028",
        stitchedCrossBeforeRegistration: 150,
        startDate: "05.08.2025",
        stitchedVal: 3500,
        remains: 12000 - 3500, // 8500
        avgSpeedVal: 250,
        prognosisVal: "15.07.2026",
        procent: 30,
        progress: [
            {
                date: "10.04.2025",
                crossQuantity: 410,
                done: 8030,
                remains: 1890
              },
        ],
        tags: [ "животные", "праздники", "зима", "вода", "лес", "природа"],
    },
    {
        id: 3,
        name: "Лунный кот",
        designer: "Moonlight Paws Series (ООО 'Лапы под луной')",
        image: "images/IMG_2174.JPG",
        user: "anna",
        width: 200,
        height: 190,
        totalCross: 9500,
        finishDreamDate: "10.11.2027",
        stitchedCrossBeforeRegistration: 0,
        startDate: "20.01.2026",
        stitchedVal: 4200,
        remains: 9500 - 4200, // 5300
        avgSpeedVal: 180,
        prognosisVal: "05.05.2027",
        procent: 35,
        progress: [
            {
                date: "15.04.2025",
                crossQuantity: 150,
                done: 9920,
                remains: 0
              },
        ],
        tags: [ "животные", "птицы"],
    },
    {
        id: 4,
        name: "Волшебный единорог",
        designer: "Rainbow Mane Magic (ООО 'Магия радужной гривы')",
        image: "images/IMG_2175.JPG",
        user: "anna",
        width: 160,
        height: 240,
        totalCross: 11500,
        finishDreamDate: "08.06.2028",
        stitchedCrossBeforeRegistration: 300,
        startDate: "12.09.2025",
        stitchedVal: 2800,
        remains: 11500 - 2800, // 8700
        avgSpeedVal: 220,
        prognosisVal: "20.03.2027",
        procent: 37,
        progress: [
            {
                date: "16.04.2025",
                crossQuantity: 0,
                done: 9920,
                remains: 0
              },
              {
                date: "17.04.2025",
                crossQuantity: 0,
                done: 9920,
                remains: 0
              },
        ],
        tags: [ "животные", "природа"],
    },
    {
        id: 5,
        name: "Осенний клён",
        designer: "Autumn Leaves Pattern (ООО 'Узоры осени')",
        image: "images/IMG_2176.JPG",
        user: "anna",
        width: 210,
        height: 170,
        totalCross: 8900,
        finishDreamDate: "30.09.2027",
        stitchedCrossBeforeRegistration: 50,
        startDate: "18.03.2026",
        stitchedVal: 6100,
        remains: 8900 - 6100, // 2800
        avgSpeedVal: 310,
        prognosisVal: "10.02.2027",
        procent: 98,
        progress: [
            {
                date: "11.04.2025",
                crossQuantity: 420,
                done: 8450,
                remains: 1470
              },
              {
                date: "12.04.2025",
                crossQuantity: 430,
                done: 8880,
                remains: 1040
              },
              {
                date: "13.04.2025",
                crossQuantity: 440,
                done: 9320,
                remains: 600
              },
              {
                date: "14.04.2025",
                crossQuantity: 450,
                done: 9770,
                remains: 150
              },              
        ],
        tags: [ ],
    },
    {
        id: 6,
        name: "Морской бриз",
        designer: "Ocean Breeze Stitch (ООО 'Морской стежок')",
        image: "images/IMG_2177.JPG",
        user: "anna",
        width: 175,
        height: 210,
        totalCross: 10500,
        finishDreamDate: "14.12.2027",
        stitchedCrossBeforeRegistration: 75,
        startDate: "03.05.2026",
        stitchedVal: 1900,
        remains: 10500 - 1900, // 8600
        avgSpeedVal: 270,
        prognosisVal: "28.04.2027",
        procent: 99,
        progress: [
            {
                date: "06.04.2025",
                crossQuantity: 370,
                done: 6450,
                remains: 3470
              },
              {
                date: "07.04.2025",
                crossQuantity: 380,
                done: 6830,
                remains: 3090
              },
              {
                date: "08.04.2025",
                crossQuantity: 390,
                done: 7220,
                remains: 2700
              },
              {
                date: "09.04.2025",
                crossQuantity: 400,
                done: 7620,
                remains: 2300
              },              
        ],
        tags: [ "животные", "люди"],
    },
    {
        id: 7,
        name: "Звёздная ночь",
        designer: "Celestial Dreams Embroidery (ООО 'Звёздные сны')",
        image: "images/IMG_2178.JPG",
        user: "anna",
        width: 195,
        height: 185,
        totalCross: 9200,
        finishDreamDate: "22.08.2027",
        stitchedCrossBeforeRegistration: 100,
        startDate: "11.11.2025",
        stitchedVal: 5500,
        remains: 9200 - 5500, // 3700
        avgSpeedVal: 290,
        prognosisVal: "15.01.2027",
        procent: 1,
        progress: [
            {
                date: "01.04.2025",
                crossQuantity: 320,
                done: 4700,
                remains: 5220
              },
              {
                date: "02.04.2025",
                crossQuantity: 330,
                done: 5030,
                remains: 4890
              },
              {
                date: "03.04.2025",
                crossQuantity: 340,
                done: 5370,
                remains: 4550
              },
              {
                date: "04.04.2025",
                crossQuantity: 350,
                done: 5720,
                remains: 4200
              },
              {
                date: "05.04.2025",
                crossQuantity: 360,
                done: 6080,
                remains: 3840
              },
        ],
        tags: [ "новый год", "люди"],
    },
    {
        id: 8,
        name: "Горный орёл",
        designer: "Peak Flyer Collection (ООО 'Покоритель вершин')",
        image: "images/IMG_2179.JPG",
        user: "anna",
        width: 170,
        height: 230,
        totalCross: 11000,
        finishDreamDate: "05.04.2028",
        stitchedCrossBeforeRegistration: 200,
        startDate: "25.06.2026",
        stitchedVal: 3300,
        remains: 11000 - 3300, // 7700
        avgSpeedVal: 240,
        prognosisVal: "12.02.2027",
        procent: 15,
        progress: [
            {
                date: "27.03.2025",
                crossQuantity: 270,
                done: 3200,
                remains: 6720
              },
              {
                date: "28.03.2025",
                crossQuantity: 280,
                done: 3480,
                remains: 6440
              },
              {
                date: "29.03.2025",
                crossQuantity: 290,
                done: 3770,
                remains: 6150
              },
              {
                date: "30.03.2025",
                crossQuantity: 300,
                done: 4070,
                remains: 5850
              },
              {
                date: "31.03.2025",
                crossQuantity: 310,
                done: 4380,
                remains: 5540
              },
        ],
        tags: [ "природа", "цветы"],
    },
    {
        id: 9,
        name: "Цветочная поляна",
        designer: "Blooming Meadow Stitch (ООО 'Цветущий луг')",
        image: "images/IMG_2180.JPG",
        user: "anna",
        width: 205,
        height: 180,
        totalCross: 9800,
        finishDreamDate: "17.10.2027",
        stitchedCrossBeforeRegistration: 80,
        startDate: "07.02.2026",
        stitchedVal: 7200,
        remains: 9800 - 7200, // 2600
        avgSpeedVal: 320,
        prognosisVal: "20.12.2026",
        procent: 7,
        progress: [
            {
                date: "22.03.2025",
                crossQuantity: 220,
                done: 1950,
                remains: 7980
              },
              {
                date: "23.03.2025",
                crossQuantity: 230,
                done: 2180,
                remains: 7750
              },
              {
                date: "24.03.2025",
                crossQuantity: 240,
                done: 2420,
                remains: 7510
              },
              {
                date: "25.03.2025",
                crossQuantity: 250,
                done: 2670,
                remains: 7260
              },              
        ],
        tags: [ "праздники", "цветы"],
    },
    {
        id: 10,
        name: "Зимний олень",
        designer: "Frost Antlers Design (ООО 'Морозные рога')",
        image: "images/IMG_2182.JPG",
        user: "anna",
        width: 185,
        height: 215,
        totalCross: 10800,
        finishDreamDate: "31.05.2028",
        stitchedCrossBeforeRegistration: 120,
        startDate: "19.07.2026",
        stitchedVal: 4500,
        remains: 10800 - 4500, // 6300
        avgSpeedVal: 260,
        prognosisVal: "18.03.2027",
        procent: 5,
        progress: [
            {
                date: "17.03.2025",
                crossQuantity: 180,
                done: 935,
                remains: 8995
              },
              {
                date: "18.03.2025",
                crossQuantity: 190,
                done: 1125,
                remains: 8805
              },
              {
                date: "19.03.2025",
                crossQuantity: 200,
                done: 1325,
                remains: 8605
              },
              {
                date: "20.03.2025",
                crossQuantity: 195,
                done: 1520,
                remains: 8410
              },
              {
                date: "21.03.2025",
                crossQuantity: 210,
                done: 1730,
                remains: 8200
              },
        ],
        tags: [ "природа", "люди"],
    },
    {
        id: 11,
        name: "Солнечный котёнок",
        designer: "Sunbeam Playtime (ООО 'Игры солнечных зайчиков')",
        image: "images/2248036369a45c1555a433.48884101.jpg",
        user: "anna",
        width: 190,
        height: 205,
        totalCross: 9700,
        finishDreamDate: "27.07.2027",
        stitchedCrossBeforeRegistration: 60,
        startDate: "30.10.2025",
        stitchedVal: 6800,
        remains: 9700 - 6800, // 2900
        avgSpeedVal: 305,
        prognosisVal: "15.11.2026",
        procent: 2,
        progress: [
            {
                date: "12.03.2025",
                crossQuantity: 130,
                done: 130,
                remains: 9800,
            },
            {
                date: "13.03.2025",
                crossQuantity: 145,
                done: 275,
                remains: 9655
              },
              {
                date: "14.03.2025",
                crossQuantity: 160,
                done: 435,
                remains: 9495
              },
              {
                date: "15.03.2025",
                crossQuantity: 150,
                done: 585,
                remains: 9345
              },
              {
                date: "16.03.2025",
                crossQuantity: 170,
                done: 755,
                remains: 9175
              },
        ],
        tags: [ "животные", "люди"],
    }
];

const users = [
  {
    login: "anna",
    password: "Anna$111",
    userName: "Анна",
    surname: "Смирнова",
    birthDate: "18.01.1977",
    phone: "89993334455",
    email: "anna@ya.ru",
  },  
  {
    login: "ivan",
    password: "Ivan#222",
    userName: "Иван",
    surname: "Петров",
    birthDate: "15.03.1985",
    phone: "89167778899",
    email: "ivan.petrov@mail.ru"
  },
  {
    login: "maria",
    password: "Maria@333",
    userName: "Мария",
    surname: "Иванова",
    birthDate: "22.07.1990",
    phone: "89261112233",
    email: "maria.ivanova@gmail.com"
  },
  {
    login: "dmitry",
    password: "Dmitry$444",
    userName: "Дмитрий",
    surname: "Сидоров",
    birthDate: "05.11.1982",
    phone: "89034445566",
    email: "dmitry.sidorov@yandex.ru"
  },
  {
    login: "ekaterina",
    password: "Ekaterina%555",
    userName: "Екатерина",
    surname: "Николаева",
    birthDate: "30.04.1979",
    phone: "89128889900",
    email: "ekaterina.nikolaeva@bk.ru"
  }
];
