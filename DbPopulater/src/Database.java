import java.io.IOException;
import java.net.URL;
import java.sql.*;

public class Database {
    private Connection connection;
    private String url = "jdbc:mysql://138.49.184.184:3306/FrontDash?user=webClient&password=FrontDash";

    public void connect() {
        try {
            connection = DriverManager.getConnection(url);
        } 
        catch (SQLException e) {
            System.out.println("Failed to connect to database!");
            System.out.println(e.getMessage());
        }
    }

    public void disconnect() {
        try {
            connection.close();
        } catch (SQLException e) {
            System.out.println("Failed to disconnect database!");
            System.out.println(e.getMessage());
        }
    }

    public ResultSet executeQuery(String query) throws SQLException {
        PreparedStatement stmt = connection.prepareStatement(query);
        return stmt.executeQuery();
    }

    public void executeUpdate(String query) throws SQLException {
        PreparedStatement stmt = connection.prepareStatement(query);
        stmt.executeUpdate();
    }

    public int insertOrder(Business business) {
        Order order = new Order();
        int orderId = -1;
        String sql = """
                INSERT INTO `Order`(time, price, tips, deliveryTime, status)
                VALUES (NOW(), ?, ?, NOW(), ?)""";
        try {
            PreparedStatement stmt = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            stmt.setFloat(1, order.getPrice());
            stmt.setFloat(2, order.getTips());
            stmt.setString(3, order.getStatus());

            stmt.execute();
            ResultSet keys = stmt.getGeneratedKeys();
            keys.next();
            orderId = keys.getInt(1);

            insertCreditCard(order.getCreditCard());
            insertPaidWith(orderId, order.getCreditCard().getCardNumber(), "paid");
            
            int contactId = insertContactInfo(order.getContactInfo());
            insertPlaces(orderId, contactId);

            insertFrom(orderId, business.getId());

            int menuSize = business.getMenu().size();
            for (int i = 0; i < 3; i++) {
                int menuIndex = (int)(Math.random() * menuSize);
                Food item = business.getMenu().get(menuIndex);
                int quantity = (int)(Math.random() * 10);

                insertContains(orderId, item.getId(), quantity);
            }
        }
        catch(SQLException e) {
            System.out.println("Order insert failed!");
            e.printStackTrace();
            disconnect();
        }
        return orderId;
    }

    private void insertContains(int orderId, int foodId, int quantity) {
        String sql = """
                INSERT INTO Contains(orderId, foodId, quantity)
                VALUES (?, ?, ?)""";
        try {
            PreparedStatement stmt = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            stmt.setInt(1, orderId);
            stmt.setInt(2, foodId);
            stmt.setInt(3, quantity);

            stmt.execute();
        }
        catch(SQLException e) {
            System.out.println("Contains insert failed!");
            e.printStackTrace();
            disconnect();
        }
    }

    private void insertFrom(int orderId, int businessId) {
        String sql = """
                INSERT INTO `From`(orderId, businessId)
                VALUES (?, ?)""";
        try {
            PreparedStatement stmt = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            stmt.setInt(1, orderId);
            stmt.setInt(2, businessId);

            stmt.execute();
        }
        catch(SQLException e) {
            System.out.println("From insert failed!");
            e.printStackTrace();
            disconnect();
        }
    }

    private void insertPlaces(int orderId, int contactId) {
        String sql = """
                INSERT INTO Places(orderId, contactId)
                VALUES (?, ?)""";
        try {
            PreparedStatement stmt = connection.prepareStatement(sql);
            stmt.setInt(1, orderId);
            stmt.setInt(2, contactId);

            stmt.execute();
        }
        catch(SQLException e) {
            System.out.println("Places insert failed!");
            e.printStackTrace();
            disconnect();
        }
    }

    private void insertPaidWith(int orderId, String cardNumber, String status) {
        String sql = """
                INSERT INTO PaidWith(orderId, cardNumber, status)
                VALUES (?, ?, ?)""";
        try {
            PreparedStatement stmt = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            stmt.setInt(1, orderId);
            stmt.setString(2, cardNumber);
            stmt.setString(3, status);

            stmt.execute();
        }
        catch(SQLException e) {
            System.out.println("PaidWith insert failed!");
            e.printStackTrace();
            disconnect();
        }
    }

    public int insertUser(User user) {
        int userId = -1;
        String sql = """
                INSERT INTO User(username, password, status)
                VALUES (?, ?, ?)""";
        try {
            PreparedStatement stmt = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            stmt.setString(1, user.getUsername());
            stmt.setString(2, user.getPassword());
            stmt.setString(3, user.getStatus());

            stmt.execute();
            ResultSet keys = stmt.getGeneratedKeys();
            keys.next();
            userId = keys.getInt(1);

            int roleId = user.getRole().getId();
            insertWorksAs(userId, roleId, "active");

            CreditCard card = user.getCard();
            insertCreditCard(card);
            insertOwns(userId, card.getCardNumber());

            ContactInfo contactInfo = user.getContactInfo();
            int contactId = insertContactInfo(contactInfo);
            insertReachedAt(userId, contactId);
        }
        catch(SQLException e) {
            System.out.println("User insert failed!");
            e.printStackTrace();
            disconnect();
        }
        return userId;
    }

    public int insertFood(Food food) {
        int foodId = -1;
        String sql = """
                INSERT INTO Food(name, image, price, stock)
                VALUES (?, ?, ?, ?)""";
        try {
            PreparedStatement stmt = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            stmt.setString(1, food.getName());
            stmt.setBlob(2, new URL(food.getImage()).openStream());
            stmt.setFloat(3, food.getPrice());
            stmt.setInt(4, food.getStock());

            stmt.execute();
            ResultSet keys = stmt.getGeneratedKeys();
            keys.next();
            foodId = keys.getInt(1);
            food.setId(foodId);

            int availabilityId = insertAvailability(food.getAvailability());
            insertServedOn(foodId, availabilityId);
        }
        catch(SQLException e) {
            System.out.println("Food insert failed!");
            e.printStackTrace();
            disconnect();
        }
        catch(IOException e) {
            System.out.println("Problem inserting the image.");
            e.printStackTrace();
            disconnect();
        }
        return foodId;
    }

    public int insertBusiness(Business business) {
        int businessId = -1;
        String sql = """
                INSERT INTO Business(name, image, description)
                VALUES (?, ?, ?)""";
        try {
            PreparedStatement stmt = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            stmt.setString(1, business.getName());
            stmt.setBlob(2, new URL(business.getImage()).openStream());
            stmt.setString(3, business.getDescription());

            stmt.execute();
            ResultSet keys = stmt.getGeneratedKeys();
            keys.next();
            businessId = keys.getInt(1);
            business.setId(businessId);

            int availabilityId = insertAvailability(business.getAvailability());
            insertOpenDuring(businessId, availabilityId);

            for (Food food : business.getMenu()) {
                int foodId = insertFood(food);
                insertOffers(businessId, foodId);
            }   
            
            int userId = insertUser(business.getManager());
            insertWorksFor(userId, businessId);
            for (User employee : business.getEmployees()) {
                userId = insertUser(employee);
                insertWorksFor(userId, businessId);
            }

            int contactId = insertContactInfo(business.getContactInfo());
            insertBusinessReachedAt(businessId, contactId);

            for (int i = 0; i < 10; i++) {
                insertOrder(business);
            }
        }
        catch(SQLException e) {
            System.out.println("Business insert failed!");
            e.printStackTrace();
            disconnect();
        }
        catch(IOException e) {
            System.out.println("Problem inserting the image.");
            e.printStackTrace();
            disconnect();
        }
        return businessId;
    }

    private void insertWorksFor(int userId, int businessId) {
        String sql = """
                INSERT INTO WorksFor(userId, businessId)
                VALUES (?, ?)""";
        try {
            PreparedStatement stmt = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            stmt.setInt(1, userId);
            stmt.setInt(2, businessId);

            stmt.execute();
        }
        catch(SQLException e) {
            System.out.println("Offers insert failed!");
            e.printStackTrace();
            disconnect();
        }
    }

    private void insertOffers(int businessId, int foodId) {
        String sql = """
                INSERT INTO Offers(businessId, foodId)
                VALUES (?, ?)""";
        try {
            PreparedStatement stmt = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            stmt.setInt(1, businessId);
            stmt.setInt(2, foodId);

            stmt.execute();
        }
        catch(SQLException e) {
            System.out.println("Offers insert failed!");
            e.printStackTrace();
            disconnect();
        }
    }

    private void insertOpenDuring(int businessId, int availabilityId) {
        String sql = """
                INSERT INTO OpenDuring(availabilityId, businessId)
                VALUES (?, ?)""";
        try {
            PreparedStatement stmt = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            stmt.setInt(1, availabilityId);
            stmt.setInt(2, businessId);

            stmt.execute();
        }
        catch(SQLException e) {
            System.out.println("OpenDuring insert failed!");
            e.printStackTrace();
            disconnect();
        }
    }

    private void insertServedOn(int foodId, int availabilityId) {
        String sql = """
                INSERT INTO ServedOn(foodId, availabilityId)
                VALUES (?, ?)""";
        try {
            PreparedStatement stmt = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            stmt.setInt(1, foodId);
            stmt.setInt(2, availabilityId);

            stmt.execute();
        }
        catch(SQLException e) {
            System.out.println("ServedOn insert failed!");
            e.printStackTrace();
            disconnect();
        }
    }

    private int insertAvailability(Availability availability) {
        int foodId = -1;
        String sql = """
                INSERT INTO Availability(sunOpen, sunClose, monOpen, monClose, tuesOpen, tuesClose, wedOpen, wedClose, thurOpen, thurClose, friOpen, friClose, satOpen, satClose)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)""";
        try {
            PreparedStatement stmt = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            stmt.setTime(1, new Time(getMilliseconds(availability.getSunOpen())));
            stmt.setTime(2, new Time(getMilliseconds(availability.getSunClose())));
            stmt.setTime(3, new Time(getMilliseconds(availability.getMonOpen())));
            stmt.setTime(4, new Time(getMilliseconds(availability.getMonClose())));
            stmt.setTime(5, new Time(getMilliseconds(availability.getTuesOpen())));
            stmt.setTime(6, new Time(getMilliseconds(availability.getTuesClose())));
            stmt.setTime(7, new Time(getMilliseconds(availability.getWedOpen())));
            stmt.setTime(8, new Time(getMilliseconds(availability.getWedClose())));
            stmt.setTime(9, new Time(getMilliseconds(availability.getThurOpen())));
            stmt.setTime(10, new Time(getMilliseconds(availability.getThurClose())));
            stmt.setTime(11, new Time(getMilliseconds(availability.getFriOpen())));
            stmt.setTime(12, new Time(getMilliseconds(availability.getFriClose())));
            stmt.setTime(13, new Time(getMilliseconds(availability.getSatOpen())));
            stmt.setTime(14, new Time(getMilliseconds(availability.getSatClose())));

            stmt.execute();
            ResultSet keys = stmt.getGeneratedKeys();
            keys.next();
            foodId = keys.getInt(1);
        }
        catch(SQLException e) {
            System.out.println("Availability insert failed!");
            e.printStackTrace();
            disconnect();
        }
        return foodId;
    }

    private long getMilliseconds(String timeString) {
        int hours = Integer.parseInt(timeString.split(":")[0]);
        int minutes = Integer.parseInt(timeString.split(":")[1]);

        long milli = hours * 60 * 60 * 1000;
        milli += minutes * 60 * 1000;
        return milli;
    }

    private void insertReachedAt(int userId, int contactId) {
        String sql = """
                INSERT INTO ReachedAt(userId, contactId)
                VALUES (?, ?)""";
        try {
            PreparedStatement stmt = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            stmt.setInt(1, userId);
            stmt.setInt(2, contactId);

            stmt.execute();
        }
        catch(SQLException e) {
            System.out.println("ReachedAt insert failed!");
            System.out.println(String.format("userId: %s\ncontactId: %s", userId, contactId));
            e.printStackTrace();
            disconnect();
        }
    }

    private void insertBusinessReachedAt(int businessId, int contactId) {
        String sql = """
                INSERT INTO ReachedAt(businessId, contactId)
                VALUES (?, ?)""";
        try {
            PreparedStatement stmt = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            stmt.setInt(1, businessId);
            stmt.setInt(2, contactId);

            stmt.execute();
        }
        catch(SQLException e) {
            System.out.println("ReachedAt insert failed!");
            System.out.println(String.format("userId: %s\ncontactId: %s", businessId, contactId));
            e.printStackTrace();
            disconnect();
        }
    }

    private int insertContactInfo(ContactInfo contactInfo) {
        int contactId = -1;
        String sql = """
                INSERT INTO ContactInfo(firstName, lastName, phoneNumber, buildingNumber, street, unitNumber, city, state, zipCode)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)""";
        try {
            PreparedStatement stmt = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            stmt.setString(1, contactInfo.getFirstName());
            stmt.setString(2, contactInfo.getLastName());
            stmt.setFloat(3, contactInfo.getPhoneNumber());
            stmt.setString(4, contactInfo.getBuildingNumber());
            stmt.setString(5, contactInfo.getStreet());
            stmt.setString(6, contactInfo.getUnitNumber());
            stmt.setString(7, contactInfo.getCity());
            stmt.setString(8, contactInfo.getState());
            stmt.setString(9, contactInfo.getZipCode());

            stmt.execute();
            ResultSet keys = stmt.getGeneratedKeys();
            keys.next();
            contactId = keys.getInt(1);
        }
        catch(SQLException e) {
            System.out.println("ContactInfo insert failed!");
            e.printStackTrace();
            disconnect();
        }
        return contactId;
    }

    private void insertOwns(int userId, String cardNumber) {
        String sql = """
                INSERT INTO Owns(userId, cardNumber)
                VALUES (?, ?)""";
        try {
            PreparedStatement stmt = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            stmt.setInt(1, userId);
            stmt.setString(2, cardNumber);

            stmt.execute();
        }
        catch(SQLException e) {
            System.out.println("Owns insert failed!");
            e.printStackTrace();
            disconnect();
        }
    }

    private void insertCreditCard(CreditCard card) {
        String sql = """
                INSERT INTO CreditCard(cardNumber, expirationDate, securityCode)
                VALUES (?, ?, ?)""";
        try {
            PreparedStatement stmt = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            stmt.setString(1, card.getCardNumber());
            stmt.setString(2, card.getExpirationDate());
            stmt.setInt(3, card.getSecurityCode());

            stmt.execute();
        }
        catch(SQLException e) {
            System.out.println("CreditCard insert failed!");
            e.printStackTrace();
            disconnect();
        }
    }

    private void insertWorksAs(int userId, int roleId, String status) {
        String sql = """
                INSERT INTO WorksAs(userId, roleId, status)
                VALUES (?, ?, ?)""";
        try {
            PreparedStatement stmt = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            stmt.setInt(1, userId);
            stmt.setInt(2, roleId);
            stmt.setString(3, status);

            stmt.execute();
        }
        catch(SQLException e) {
            System.out.println("WorksAs insert WorksAs!");
            e.printStackTrace();
            disconnect();
        }
    }

    public User getRandomUser(String role) {
        User rando = null;
        String sql = """
            SELECT User.id, User.username, User.password, User.status
            FROM User JOIN WorksAs JOIN Role
                ON User.id = WorksAs.userId
                    AND Role.id = WorksAs.roleId
            WHERE Role.title LIKE '?'
            ORDER BY RAND()
            LIMIT 1;""";
        try {
            PreparedStatement stmt = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            stmt.setString(1, role);
            ResultSet keys = executeQuery(sql);
            keys.next();
            int id = keys.getInt("id");
            String username = keys.getString("username");
            String password = keys.getString("password");
            String status = keys.getString("status");
            rando = new User(id, username, password, status);
        }
        catch(SQLException e) {
            System.out.println("Could not select random User!");
            e.printStackTrace();
            disconnect();
        }
        return rando;
    }

    public void removeAllRows() {
        String[] tables = {"Customer", "SCHEDULED_WITH", "ServiceProvider"};
        try {
            for (String table : tables) {
                String sql = "DELETE FROM " + table;
                connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS).execute();
            }
        }
        catch (SQLException e) {
            System.out.println("Failed to wipe tables!");
            e.printStackTrace();
            disconnect();
        }
    }
}