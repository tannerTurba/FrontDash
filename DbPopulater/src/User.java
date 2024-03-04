public class User {
    private int id = -1;
    private String username;
    private String password;
    private String status;
    private ContactInfo contactInfo;
    private Role role;
    private CreditCard card;

    public User(String u, String p, String s) {
        username = u;
        password = p;
        status = s;
    }

    public User(int i, String u, String p, String s) {
        id = i;
        username = u;
        password = p;
        status = s;
    }

    public User(String u, String p, String s, ContactInfo contactInfo, Role role, CreditCard card) {
        username = u;
        password = p;
        status = s;
        this.contactInfo = contactInfo;
        this.role = role;
        this.card = card;
    }

    public ContactInfo getContactInfo() {
        return contactInfo;
    }

    /**
     * @return String return the username
     */
    public String getUsername() {
        return username;
    }

    /**
     * @param username the username to set
     */
    public void setUsername(String username) {
        this.username = username;
    }

    /**
     * @return String return the password
     */
    public String getPassword() {
        return password;
    }

    /**
     * @param password the password to set
     */
    public void setPassword(String password) {
        this.password = password;
    }

    /**
     * @return String return the status
     */
    public String getStatus() {
        return status;
    }

    /**
     * @param status the status to set
     */
    public void setStatus(String status) {
        this.status = status;
    }

    /**
     * @param contactInfo the contactInfo to set
     */
    public void setContactInfo(ContactInfo contactInfo) {
        this.contactInfo = contactInfo;
    }


    /**
     * @return Role return the role
     */
    public Role getRole() {
        return role;
    }

    /**
     * @param role the role to set
     */
    public void setRole(Role role) {
        this.role = role;
    }


    /**
     * @return CreditCard return the card
     */
    public CreditCard getCard() {
        return card;
    }

    /**
     * @param card the card to set
     */
    public void setCard(CreditCard card) {
        this.card = card;
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
