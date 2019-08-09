test("Два плюс два равно четыре", function() {
  expect(2 + 2).toBe(4);
});

test("Корень из 36 это 6", function() {
  // Arrange - создаём переменные
  const number = 36;
  const expectedSqrt = 6;
  // Act - тестируемое действие и получение реального результата
  const realSqrt = Math.sqrt(number);
  // Assert - сравнение, совпал ли ожидаемый и реальный результат
  expect(realSqrt).toBe(expectedSqrt);
});
// ============================================
// в тесте лучше не использовать несколько expect!!! здесь просто пример нескольких функций-матчеров
test('1)Ожидаем, что строка будет иметь длину 6; 2)Ожидаем, что число будет больше или равно 25; 3) Ожидаем, что имя не будет содержать символа "-"', function() {
  expect("string").toHaveLength(6);
  expect(57).toBeGreaterThanOrEqual(25);
  expect(name).not.toContain("-");
});
// ============================================
// Самая основная проверка, которая используется в 3/4 тестов - toBe().
// toBe() сравнивает полученное значение с ожидаемым, по подобию оператора ===.
// Т.е. строгое сравнение для примитивов, и ссылочное сравнение для объектов.
const item = {
  name: "Сливочное масло",
  mass: 250
};
test("Весит 250 грамм", function() {
  expect(item.mass).toBe(250);
});
test('Называется "Сливочное масло"', () => {
  expect(item.name).toBe("Сливочное масло");
});

// Матчер toBe() не подойдёт, если нужно сравнить по значению два объекта с разными ссылками
function getCart() {
  return {
    name: "Сливочное масло",
    mass: 250
  };
}
test("В корзине находится указанная пачка масла", function() {
  const expectedItem = {
    name: "Сливочное масло",
    mass: 250
  };
  const cartItem = getCart();
  // Упсс... Тест не проходит
  expect(cartItem).toBe(expectedItem);
});
// ============================================
// Для сравнения объектов по значению нужно использовать матчер toEqual().
// toEqual() рекурсивно сравнивает все ключи и значения между двумя объектами.
function getCart1() {
  return {
    name: "Сливочное масло",
    mass: 250
  };
}
test("В корзине находится указанная пачка масла", function() {
  const expectedItem = {
    name: "Сливочное масло",
    mass: 250
  };
  const cartItem = getCart1();
  // Все работает!
  expect(cartItem).toEqual(expectedItem);
});

test("В Jest есть много матчеров, которые сравнивают полученный результат с какими-то константными значениями. Можно обойтись и без них, используя универсальный toBe(), но они позволяют упростить чтение теста и сделать код чище. Например, матчер toBeFalsy():", function() {
  expect(1 === 8).toBeFalsy();
});
// ============================================
function divide(a, b) {
  return a / b;
}

test("Целочисленное деление", function() {
  const a = 32;
  const b = 2;
  const expected = 16;
  const result = divide(a, b);
  expect(result).toBe(expected);
});
test("Деление нуля", function() {
  const a = 0;
  const b = 2;
  const expected = 0;
  const result = divide(a, b);
  expect(result).toBe(expected);
});
test("Деление на ноль", function() {
  const a = 32;
  const b = 0;
  const expected = Infinity;
  const result = divide(a, b);
  expect(result).toBe(Infinity);
});
test("Деление непонятно чего непонятно на что", function() {
  const a = [1, 2, 3, 4, 5, 6];
  const b = ",";
  const result = divide(a, b);
  expect(result).toBeNaN();
});
// ============================================
function bestFlavor() {
  return "картошка";
}

test("Лучший вкус - не кокос", function() {
  const flavor = bestFlavor();
  expect(flavor).not.toBe("кокос");
});
test("Лучший вкус - не банан", function() {
  const flavor = bestFlavor();
  expect(flavor).not.toBe("банан");
});
// ============================================
function getRandomInt(min, max) {
  return Math.ceil(min) + Math.floor(Math.random() * max);
}

test("Случайное число из диапазона положительных чисел", function() {
  const min = 20;
  const max = 30;
  const value = getRandomInt(min, max);
  expect(value).toBeGreaterThanOrEqual(min);
  expect(value).toBeLessThanOrEqual(max);
});
test("Случайное число из диапазона отрицательных чисел", function() {
  const min = -50;
  const max = -10;
  const value = getRandomInt(min, max);
  expect(value).toBeGreaterThanOrEqual(min);
  expect(value).toBeLessThanOrEqual(max);
});
// ============================================
// Из-за своей природы, в JavaScript нельзя надёжно сравнивать два вещественных числа. Поэтому и матчер toBe() здесь не подходит.
// Вещественные (дробные) числа нужно всегда сравнивать с помощью матчера toBeCloseTo()!
test("0.1 плюс 0.2 не равно 0.3 в JS", function() {
  // Тест пройдёт, 0.1 + 0.2 действительно НЕ равно 0.3
  expect(0.1 + 0.2).not.toBe(0.3);
});
test("0.1 плюс 0.2 равно примерно 0.3", function() {
  // Такой тест будет работать
  expect(0.1 + 0.2).toBeCloseTo(0.3);
});
// ============================================
// Строки можно проверять на соответствие регулярному выражению через матчер toMatch()
function generateRandomName() {
  const surnames = [
    "Пётр",
    "Владислав",
    "Евгений",
    "Марат",
    "Николай",
    "Валерий",
    "Василий"
  ];
  const lastnames = [
    "Мельчиков",
    "Доргало",
    "Крючочкин",
    "Дикай",
    "Ломоносов",
    "Скорожевский",
    "Вепрь",
    "Степной"
  ];
  const randomSurname = surnames[Math.floor(Math.random() * surnames.length)];
  const randomLastname =
    lastnames[Math.floor(Math.random() * lastnames.length)];
  return randomSurname + " " + randomLastname;
}
test("Имя состоит из двух слов", function() {
  const newName = generateRandomName();
  expect(newName).toMatch(/^[А-ЯЁ][а-яё]+ [А-ЯЁ][а-яё]+$/);
});
test("Тот же тест, только в профиль", function() {
  const pattern = new RegExp("^[А-ЯЁ][а-яё]+ [А-ЯЁ][а-яё]+$");
  const newName = generateRandomName();
  expect(newName).toMatch(pattern);
});
// ============================================
// С помощью матчера toContain() и toContainEqual() проверяется вхождение элемента в коллекцию (массив, строку, или другое перечисление).
// При использовании этого матчера, в expect() нужно передавать само перечисление, а в toContain() - значение, наличие которого в предыдущем перечислении нужно проверить.
const arr = [2, 53, 11, 8, 25];
function addToArr(value) {
  arr.push(value);
}
test("Добавление в массив работает корректно", function() {
  const newItem = 17;
  addToArr(newItem);
  expect(arr).toContain(newItem);
});
// ============================================
// toHaveLength
function makeLongString(char, length) {
  return char.repeat(length);
}
test("Получается строка верной длины", function() {
  const desiredLength = 20;
  const resultStr = makeLongString("0", desiredLength);
  expect(resultStr).toHaveLength(desiredLength);
});
// ============================================
// Объекты можно проверять на наличие "под-объектов", или, если выразиться иначе, на соответствие шаблона объекта.
// Т.е. можно задать объект, и ожидать, что этот объект (его ключи и значения по ним), будет содержаться внутри другого проверяемого объекта.
// Это производится с помощью матчера toMatchObject().
const houseForSale = {
  bath: true,
  bedrooms: 4,
  kitchen: {
    amenities: ["плита", "духовка", "стиральная машина"],
    area: 20,
    wallColor: "белый"
  }
};

test("the house has my desired features", function() {
  const desiredHouse = {
    bath: true,
    kitchen: {
      // Интересность
      amenities: expect.arrayContaining(["плита"]),
      wallColor: expect.stringMatching(/белый|желтый/)
    }
  };
  expect(houseForSale).toMatchObject(desiredHouse);
});
// ============================================
// Матчер toHaveProperty() используется для проверки объекта на наличие в нём указанного свойства (ключа).
const houseForSale1 = {
  bath: true,
  bedrooms: 4,
  kitchen: {
    amenities: ["плита", "духовка", "стиральная машина"],
    area: 20,
    wallColor: "белый",
    "nice.oven": true
  },
  "ceiling.height": 2
};

test("в этом доме есть всё что нужно", function() {
  // Обычный синтаксис
  expect(houseForSale1).toHaveProperty("bath");
  expect(houseForSale1).toHaveProperty("bedrooms", 4);

  expect(houseForSale1).not.toHaveProperty("pool");

  // Используя точечную нотацию
  expect(houseForSale1).toHaveProperty("kitchen.area", 20);
  expect(houseForSale1).toHaveProperty("kitchen.amenities", [
    "плита",
    "духовка",
    "стиральная машина"
  ]);

  expect(houseForSale1).not.toHaveProperty("kitchen.open");
});
// ============================================
let compile = function() {
  console.log([].join.call(arguments, " -> ")); // [].join.call([1,2,3,4,5], ' -> ') Console: "1 -> 2 -> 3 -> 4 -> 5"
};
function drink(something) {
  if (something === "чернила осьминога") {
    compile = function() {
      if (arguments.length === 3) {
        const includes = [].includes.bind(arguments);
        if (
          includes("волосы козы") &&
          includes("гнилая груша") &&
          includes("муравьиный яд")
        ) {
          throw Error("Ктулху");
        }
      }
    };
  } else {
    console.log("Bueeeh..");
  }
}

test("вызов Ктулху", function() {
  expect(function() {
    drink("чернила осьминога");
    compile("волосы козы", "муравьиный яд");
  }).toThrow("Ктулху");
});
// ============================================
// ПРИМЕР С ВНЕШНИМ СНАПШОТОМ
// Тестируемая функция
function getDataById(id) {
  if (id === 1) {
    return { name: "The Great Gatsby", year: 1925, genre: "novel" };
  } else if (id === 2) {
    return { name: "Ulysses", year: 1918, genre: "modernist novel" };
  } else {
    return null;
  }
}

test("Получение данных по id", function() {
  const id = 1;
  const data = getDataById(id);
  expect(data).toMatchSnapshot();
});

test("Получение данных по id", function() {
  const id = 2;
  const data = getDataById(id);
  expect(data).toMatchInlineSnapshot(`
    Object {
      "genre": "modernist novel",
      "name": "Ulysses",
      "year": 1918,
    }
  `);
});
// ============================================
// ПРИМЕР СО ВСТРОЕННЫМ СНАПШОТОМ, prettier
// при вызове теста, в параметр ф-ции toMatchInlineSnapshot запишется объект ниже в комментарии
test("Получение данных по id", function() {
  const id = 2;
  const data = getDataById(id);
  expect(data).toMatchInlineSnapshot(`
    Object {
      "genre": "modernist novel",
      "name": "Ulysses",
      "year": 1918,
    }
  `);
  //     expect(data).toMatchInlineSnapshot(`
  //     Object {
  //       "genre": "modernist novel",
  //       "name": "Ulysses",
  //       "year": 1918,
  //     }
  //   `);
});

// !!!!!!!!!!!!!!!!! Для обновления снапшота npm test -- --updateSnapshot !!!!!!!!!!!!!!!!!!!!!!!!
