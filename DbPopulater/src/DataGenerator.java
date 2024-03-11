import com.github.javafaker.*;

public class DataGenerator {
    private static Faker faker = new Faker();

    public static User createEmployee() {
        String username = faker.name().username();
        String password = "$2b$10$BxvwN20g2NClIRDG6a5Up.IU7NgPAfzu69RXobi020astv.q9CUj2";
        ContactInfo contactInfo = getContactInfo();
        Role role = Role.EMPLOYEE;
        CreditCard creditCard = createCreditCard();

        return new User(username, password, "active", contactInfo, role, creditCard);
    }

    public static User createManager() {
        String username = faker.name().username();
        String password = "$2b$10$BxvwN20g2NClIRDG6a5Up.IU7NgPAfzu69RXobi020astv.q9CUj2";
        ContactInfo contactInfo = getContactInfo();
        Role role = Role.MANAGER;
        CreditCard creditCard = createCreditCard();

        return new User(username, password, "active", contactInfo, role, creditCard);
    }

    public static ContactInfo getContactInfo() {
        Address addy = faker.address();
        Name name = faker.name();

        String firstName = name.firstName();
        String lastName = name.lastName();
        String phoneNum = faker.phoneNumber().phoneNumber();
        String phoneNumber = "";
        for (char character : phoneNum.toCharArray()) {
            if (character == 'x') {
                break;
            }
            try {
                if (Character.isDigit(character)) {
                    phoneNumber += String.format("%c", character);
                }
            }
            catch (NumberFormatException e) {

            }
        }
        if (phoneNumber.length() > 10) {
            phoneNumber = phoneNumber.substring(0, 10);
        }
        String buildingNumber = addy.buildingNumber();
        String street = addy.streetName();
        String unitNumber = addy.buildingNumber();
        String city = addy.cityName();
        String state = addy.state();
        String zipCode = addy.zipCode();

        return new ContactInfo(firstName, lastName, (float)Double.parseDouble(phoneNumber), buildingNumber, street, unitNumber, city, state, zipCode);
    }

    public static Food createFood() {
        com.github.javafaker.Food food = faker.food();
        String name = food.dish();
        String image = "https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM=";
        float price = (float)(Math.random() * 100.0);
        int stock = (int)(Math.random() * 100.0);

        return new Food(name, image, price, stock);
    }

    public static Business createBusiness() {
        String businessName = faker.company().name();
        String image = "https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM=";
        String description = faker.company().bs();

        return new Business(businessName, image, description);
    }

    public static CreditCard createCreditCard() {
        String cardNumber = faker.finance().creditCard();
        int month = (int)(Math.random() * 12);
        int year = (int)(Math.random() * 10) + 2024;
        String expirationDate = String.format("%d/%d", month, year);
        int securityCode = (int)(Math.random() * 999);

        return new CreditCard(cardNumber, expirationDate, securityCode);
    }
}