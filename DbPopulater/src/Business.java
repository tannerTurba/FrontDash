import java.util.ArrayList;

public class Business {
    private int id;
    private String name;
    private String image;
    private String description;
    private Availability availability = new Availability();
    private ArrayList<Food> menu = new ArrayList<>();
    private User manager = DataGenerator.createManager();
    private ArrayList<User> employees = new ArrayList<>();
    private ContactInfo contactInfo = DataGenerator.getContactInfo();

    public Business(String n, String image, String d) {
        name = n;
        this.image = image;
        description = d;

        int numOfEmployees = 4;
        for (int i = 0; i < numOfEmployees; i++) {
            employees.add(DataGenerator.createEmployee());
        }

        for (int i = 0; i < 20; i++) {
            menu.add(DataGenerator.createFood());
        }
    }

    /**
     * @return String return the name
     */
    public String getName() {
        return name;
    }

    /**
     * @param name the name to set
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * @return String return the image
     */
    public String getImage() {
        return image;
    }

    /**
     * @param image the image to set
     */
    public void setImage(String image) {
        this.image = image;
    }

    /**
     * @return String return the description
     */
    public String getDescription() {
        return description;
    }

    /**
     * @param description the description to set
     */
    public void setDescription(String description) {
        this.description = description;
    }


    /**
     * @return Availability return the availability
     */
    public Availability getAvailability() {
        return availability;
    }

    /**
     * @param availability the availability to set
     */
    public void setAvailability(Availability availability) {
        this.availability = availability;
    }


    /**
     * @return ArrayList<Food> return the menu
     */
    public ArrayList<Food> getMenu() {
        return menu;
    }

    /**
     * @param menu the menu to set
     */
    public void setMenu(ArrayList<Food> menu) {
        this.menu = menu;
    }


    /**
     * @return User return the manager
     */
    public User getManager() {
        return manager;
    }

    /**
     * @param manager the manager to set
     */
    public void setManager(User manager) {
        this.manager = manager;
    }

    /**
     * @return ArrayList<User> return the employees
     */
    public ArrayList<User> getEmployees() {
        return employees;
    }

    /**
     * @param employees the employees to set
     */
    public void setEmployees(ArrayList<User> employees) {
        this.employees = employees;
    }

    /**
     * @return ContactInfo return the contactInfo
     */
    public ContactInfo getContactInfo() {
        return contactInfo;
    }

    /**
     * @param contactInfo the contactInfo to set
     */
    public void setContactInfo(ContactInfo contactInfo) {
        this.contactInfo = contactInfo;
    }


    /**
     * @return int return the id
     */
    public int getId() {
        return id;
    }

    /**
     * @param id the id to set
     */
    public void setId(int id) {
        this.id = id;
    }

}
