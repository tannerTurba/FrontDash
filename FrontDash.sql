CREATE TABLE `Employee` (
  `id` integer PRIMARY KEY,
  `firstName` varchar(255),
  `lastName` varchar(255),
  `username` varchar(255),
  `password` varchar(255),
  `status` varchar(255)
);

CREATE TABLE `WORKS_FOR` (
  `employeeId` varchar(255),
  `businessId` integer,
  `role` varchar(255)
);

CREATE TABLE `Business` (
  `id` integer PRIMARY KEY,
  `name` varchar(255),
  `image` image,
  `description` varchar(255),
  `representative` varchar(255),
  `buildingNumber` varchar(255),
  `street` varchar(255),
  `unitNumber` varchar(255),
  `city` varchar(255),
  `state` varchar(255),
  `zipCode` varchar(255)
);

CREATE TABLE `OFFERS` (
  `businessId` integer,
  `foodId` integer
);

CREATE TABLE `Food` (
  `id` integer PRIMARY KEY,
  `name` varchar(255),
  `image` image,
  `price` double,
  `stock` integer
);

CREATE TABLE `SERVED_ON` (
  `foodId` integer,
  `availabilityId` integer
);

CREATE TABLE `Availability` (
  `id` integer PRIMARY KEY,
  `sunOpen` time,
  `sunClose` time,
  `monOpen` time,
  `monClose` time,
  `tuesOpen` time,
  `tuesClose` time,
  `wedOpen` time,
  `wedClose` time,
  `thurOpen` time,
  `thurClose` time,
  `friOpen` time,
  `friClose` time,
  `satOpen` time,
  `satClose` time
);

CREATE TABLE `OPEN_DURING` (
  `availabilityId` integer,
  `businessId` integer
);

CREATE TABLE `Contact` (
  `id` integer PRIMARY KEY,
  `firstName` varchar(255),
  `lastName` varchar(255),
  `phoneNumber` integer,
  `buildingNumber` varchar(255),
  `street` varchar(255),
  `unitNumber` varchar(255),
  `city` varchar(255),
  `state` varchar(255),
  `zipCode` varchar(255)
);

CREATE TABLE `SUPPORTS` (
  `contactId` integer,
  `businessId` integer
);

CREATE TABLE `Order` (
  `id` integer PRIMARY KEY,
  `date` date,
  `time` time,
  `price` double,
  `tips` double,
  `deliveryTime` time,
  `status` varchar(255)
);

CREATE TABLE `PLACES` (
  `orderId` integer,
  `contactId` integer
);

CREATE TABLE `CONTAINS` (
  `orderId` integer,
  `foodId` integer,
  `quantity` integer
);

CREATE TABLE `CreditCard` (
  `cardNumber` integer PRIMARY KEY,
  `firstName` varchar(255),
  `lastName` varchar(255),
  `expirationDate` date,
  `securityCode` integer,
  `buildingNumber` varchar(255),
  `street` varchar(255),
  `unitNumber` varchar(255),
  `city` varchar(255),
  `state` varchar(255),
  `zipCode` varchar(255)
);

CREATE TABLE `PAIDWITH` (
  `orderId` integer,
  `cardNumber` integer,
  `status` varchar(255)
);

CREATE TABLE `FROM` (
  `orderId` integer,
  `businessId` integer
);

ALTER TABLE `Employee` ADD FOREIGN KEY (`id`) REFERENCES `WORKS_FOR` (`employeeId`);

ALTER TABLE `Business` ADD FOREIGN KEY (`id`) REFERENCES `WORKS_FOR` (`businessId`);

ALTER TABLE `Business` ADD FOREIGN KEY (`id`) REFERENCES `OFFERS` (`businessId`);

ALTER TABLE `OFFERS` ADD FOREIGN KEY (`foodId`) REFERENCES `Food` (`id`);

ALTER TABLE `SERVED_ON` ADD FOREIGN KEY (`foodId`) REFERENCES `Food` (`id`);

ALTER TABLE `SERVED_ON` ADD FOREIGN KEY (`availabilityId`) REFERENCES `Availability` (`id`);

ALTER TABLE `OPEN_DURING` ADD FOREIGN KEY (`availabilityId`) REFERENCES `Availability` (`id`);

ALTER TABLE `OPEN_DURING` ADD FOREIGN KEY (`businessId`) REFERENCES `Business` (`id`);

ALTER TABLE `SUPPORTS` ADD FOREIGN KEY (`contactId`) REFERENCES `Contact` (`id`);

ALTER TABLE `SUPPORTS` ADD FOREIGN KEY (`businessId`) REFERENCES `Business` (`id`);

ALTER TABLE `Order` ADD FOREIGN KEY (`id`) REFERENCES `PLACES` (`orderId`);

ALTER TABLE `PLACES` ADD FOREIGN KEY (`contactId`) REFERENCES `Contact` (`id`);

ALTER TABLE `CONTAINS` ADD FOREIGN KEY (`orderId`) REFERENCES `Order` (`id`);

ALTER TABLE `Food` ADD FOREIGN KEY (`id`) REFERENCES `CONTAINS` (`foodId`);

ALTER TABLE `PAIDWITH` ADD FOREIGN KEY (`cardNumber`) REFERENCES `CreditCard` (`cardNumber`);

ALTER TABLE `Order` ADD FOREIGN KEY (`id`) REFERENCES `PAIDWITH` (`orderId`);

ALTER TABLE `Order` ADD FOREIGN KEY (`id`) REFERENCES `FROM` (`orderId`);

ALTER TABLE `Business` ADD FOREIGN KEY (`id`) REFERENCES `FROM` (`businessId`);
