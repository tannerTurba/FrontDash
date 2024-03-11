public class DbPopulater {
    public static void main(String[] args) {
        Database db = new Database();
        db.connect();

        for(int i = 0; i < 10; i++) {
            Business business = DataGenerator.createBusiness();
            db.insertBusiness(business);
        }
        db.disconnect();
    }
}
