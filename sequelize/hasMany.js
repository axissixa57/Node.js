const Product = sequelize.define("product", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    price: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

const Company = sequelize.define("company", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

Company.hasMany(Product); // Company.hasMany(Product, { onDelete: "cascade" });

// Executing (default): CREATE TABLE IF NOT EXISTS `companies` (`id` INTEGER NOT NULL auto_increment , `name` VARCHAR(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB;
// Executing (default): CREATE TABLE IF NOT EXISTS `products` (`id` INTEGER NOT NULL auto_increment , `name` VARCHAR(255) NOT NULL, `price` INTEGER NOT NULL,
//  `companyId` INTEGER, PRIMARY KEY (`id`), FOREIGN KEY (`companyId`) REFERENCES `companies` (`id`) ON DELETE SET NULL ON UPDATE CASCADE) ENGINE=InnoDB;

// =======================================================================================================================================================================
// =======================================================================================================================================================================
// =======================================================================================================================================================================

// Основные операции:
// Рассмотим некоторые базовые операции, которые могут вызвать затруднения при работе с моделями со связью один-ко-многим.

//создаем одну компанию
Company.create({ name: "Apple" }).then(res => {

    // получаем id созданной компании
    const compId = res.id;
    //создаем пару товаров для этой компании
    Product.create({ name: "iPhone XS", price: 400, companyId: compId }).catch(err => console.log(err));
    Product.create({ name: "iPhone XR", price: 350, companyId: compId }).catch(err => console.log(err));

}).catch(err => console.log(err));
// =======================================================================================================================================================================
// Есть другой способ добавления зависимой модели - через главную модель. 
// У главной модели для этого неявно определяется метод по имени createЗАВИСИМАЯ_МОДЕЛЬ() (например, createProduct()):

// найдем компанию с id=1
Company.findByPk(1).then(company=>{
    if(!company) return console.log("Company not found");
    console.log(company);
    // и добавим для нее один объект
    company.createProduct({name:"iPhone X", price: 300,}).catch(err=>console.log(err));
}).catch(err=>console.log(err));
// =======================================================================================================================================================================
// Для получения всех связанных объектов зависимой модели у главной модели определяется 
// метод по имени getЗАВИСИМАЯ_МОДЕЛЬs() (например, getProducts()). 
// Например, получим все товары компании с id=1:

Company.findByPk(1).then(company=>{
   
  if(!company) return console.log("Company not found");
  company.getProducts()
  .then(res=>{
    for(let i=0; i<res.length;i++)
      console.log(res[i].name, " - ", company.name);
  })
  .catch(err=>console.log(err));
}).catch(err=>console.log(err));