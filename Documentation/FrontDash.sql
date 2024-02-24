CREATE TABLE IF NOT EXISTS ContactInfo (
  id INT PRIMARY KEY AUTO_INCREMENT,
  firstName VARCHAR(20) NOT NULL,
  lastName VARCHAR(20) NOT NULL,
  phoneNumber INT,
  buildingNumber VARCHAR(20),
  street VARCHAR(30),
  unitNumber VARCHAR(20),
  city VARCHAR(30),
  state VARCHAR(20),
  zipCode VARCHAR(20)
);

CREATE TABLE IF NOT EXISTS `User` (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(30),
  password VARCHAR(30),
  status VARCHAR(20)
);

CREATE TABLE IF NOT EXISTS Business (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(30),
  image BLOB,
  description VARCHAR(1000)
);

CREATE TABLE IF NOT EXISTS Role (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(20)
);

CREATE TABLE IF NOT EXISTS Food (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(20),
  image BLOB,
  price FLOAT,
  stock INT
);

CREATE TABLE IF NOT EXISTS Availability (
  id INT PRIMARY KEY AUTO_INCREMENT,
  sunOpen TIME,
  sunClose TIME,
  monOpen TIME,
  monClose TIME,
  tuesOpen TIME,
  tuesClose TIME,
  wedOpen TIME,
  wedClose TIME,
  thurOpen TIME,
  thurClose TIME,
  friOpen TIME,
  friClose TIME,
  satOpen TIME,
  satClose TIME
);

CREATE TABLE IF NOT EXISTS `Order` (
  id INT PRIMARY KEY AUTO_INCREMENT,
  time DATETIME,
  price FLOAT,
  tips FLOAT,
  deliveryTime DATETIME,
  status VARCHAR(20)
);

CREATE TABLE IF NOT EXISTS CreditCard (
  cardNumber INT PRIMARY KEY NOT NULL,
  expirationDate DATETIME NOT NULL,
  securityCode INT NOT NULL
);

CREATE TABLE IF NOT EXISTS ReachedAt (
  userId INT,
  contactId INT,
  FOREIGN KEY (userId) REFERENCES `User`(id),
  FOREIGN KEY (contactId) REFERENCES ContactInfo(id)
);

CREATE TABLE IF NOT EXISTS WorksFor (
  userId INT,
  businessId INT,
  FOREIGN KEY (userId) REFERENCES `User`(id),
  FOREIGN KEY (businessId) REFERENCES Business(id)
);

CREATE TABLE IF NOT EXISTS WorksAs (
  userId INT,
  roleId INT,
  status VARCHAR(20),
  FOREIGN KEY (userId) REFERENCES `User`(id),
  FOREIGN KEY (roleId) REFERENCES Role(id)
);

CREATE TABLE IF NOT EXISTS Offers (
  businessId INT,
  foodId INT,
  FOREIGN KEY (businessId) REFERENCES Business(id),
  FOREIGN KEY (foodId) REFERENCES Food(id)
);

CREATE TABLE IF NOT EXISTS ServedOn (
  foodId INT,
  availabilityId INT,
  FOREIGN KEY (foodId) REFERENCES Food(id),
  FOREIGN KEY (availabilityId) REFERENCES Availability(id)
);

CREATE TABLE IF NOT EXISTS OpenDuring (
  availabilityId INT,
  businessId INT,
  FOREIGN KEY (availabilityId) REFERENCES Availability(id),
  FOREIGN KEY (businessId) REFERENCES Business(id)
);

CREATE TABLE IF NOT EXISTS Places (
  orderId INT,
  contactId INT,
  FOREIGN KEY (orderId) REFERENCES `Order`(id),
  FOREIGN KEY (contactId) REFERENCES Contact(id)
);

CREATE TABLE IF NOT EXISTS Contains (
  orderId INT,
  foodId INT,
  quantity INT NOT NULL,
  FOREIGN KEY (orderId) REFERENCES `Order`(id),
  FOREIGN KEY (foodId) REFERENCES Food(id)
);

CREATE TABLE IF NOT EXISTS PaidWith (
  orderId INT,
  cardNumber INT,
  status VARCHAR(20),
  FOREIGN KEY (orderId) REFERENCES `Order`(id),
  FOREIGN KEY (cardNumber) REFERENCES CreditCard(cardNumber)
);

CREATE TABLE IF NOT EXISTS `From` (
  orderId INT,
  businessId INT,
  FOREIGN KEY (orderId) REFERENCES `Order`(id),
  FOREIGN KEY (businessId) REFERENCES Business(id)
);

CREATE TABLE IF NOT EXISTS Owns (
  userId INT,
  cardNumber INT,
  FOREIGN KEY (userId) REFERENCES `User`(id),
  FOREIGN KEY (cardNumber) REFERENCES CreditCard(cardNumber)
);
