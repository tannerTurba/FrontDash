public class ContactInfo {
    private String firstName;
    private String lastName;
    private float phoneNumber;
    private String buildingNumber;
    private String street;
    private String unitNumber;
    private String city;
    private String state;
    private String zipCode;

    public ContactInfo(String fn, String ln, float phoneNum, String buildingNum, String street, String unitNum, String city, String state, String zip) {
        firstName = fn;
        lastName = ln;
        phoneNumber = phoneNum;
        buildingNumber = buildingNum;
        this.street = street;
        unitNumber = unitNum;
        this.city = city;
        this.state = state;
        this.zipCode = zip;
    }

    /**
     * @return String return the firstName
     */
    public String getFirstName() {
        return firstName;
    }

    /**
     * @param firstName the firstName to set
     */
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    /**
     * @return String return the lastName
     */
    public String getLastName() {
        return lastName;
    }

    /**
     * @param lastName the lastName to set
     */
    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    /**
     * @return float return the phoneNumber
     */
    public float getPhoneNumber() {
        return phoneNumber;
    }

    /**
     * @param phoneNumber the phoneNumber to set
     */
    public void setPhoneNumber(float phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    /**
     * @return String return the buildingNumber
     */
    public String getBuildingNumber() {
        return buildingNumber;
    }

    /**
     * @param buildingNumber the buildingNumber to set
     */
    public void setBuildingNumber(String buildingNumber) {
        this.buildingNumber = buildingNumber;
    }

    /**
     * @return String return the street
     */
    public String getStreet() {
        return street;
    }

    /**
     * @param street the street to set
     */
    public void setStreet(String street) {
        this.street = street;
    }

    /**
     * @return String return the unitNumber
     */
    public String getUnitNumber() {
        return unitNumber;
    }

    /**
     * @param unitNumber the unitNumber to set
     */
    public void setUnitNumber(String unitNumber) {
        this.unitNumber = unitNumber;
    }

    /**
     * @return String return the city
     */
    public String getCity() {
        return city;
    }

    /**
     * @param city the city to set
     */
    public void setCity(String city) {
        this.city = city;
    }

    /**
     * @return String return the state
     */
    public String getState() {
        return state;
    }

    /**
     * @param state the state to set
     */
    public void setState(String state) {
        this.state = state;
    }

    /**
     * @return String return the zipCode
     */
    public String getZipCode() {
        return zipCode;
    }

    /**
     * @param zipCode the zipCode to set
     */
    public void setZipCode(String zipCode) {
        this.zipCode = zipCode;
    }

}
