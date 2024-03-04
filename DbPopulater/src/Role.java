public class Role {
    private int id;
    private String title;
    public static Role MANAGER = new Role(1, "manager");
    public static Role EMPLOYEE = new Role(3, "employee");

    public Role(int i, String t) {
        id = i;
        title = t;
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

    /**
     * @return String return the title
     */
    public String getTitle() {
        return title;
    }

    /**
     * @param title the title to set
     */
    public void setTitle(String title) {
        this.title = title;
    }

}
