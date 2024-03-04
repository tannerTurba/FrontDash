public class Availability {
    private String sunOpen = getRandomTime();
    private String sunClose = getRandomTime();
    private String monOpen = getRandomTime();
    private String monClose = getRandomTime();
    private String tuesOpen = getRandomTime();
    private String tuesClose = getRandomTime();
    private String wedOpen = getRandomTime();
    private String wedClose = getRandomTime();
    private String thurOpen = getRandomTime();
    private String thurClose = getRandomTime();
    private String friOpen = getRandomTime();
    private String friClose = getRandomTime();
    private String satOpen = getRandomTime();
    private String satClose = getRandomTime();

    private String getRandomTime() {
        int hours = (int)(Math.random() * 24);
        int minutes = (int)(Math.random() * 60);
        return String.format("%d:%d", hours, minutes);
    }

    /**
     * @return String return the sunOpen
     */
    public String getSunOpen() {
        return sunOpen;
    }

    /**
     * @param sunOpen the sunOpen to set
     */
    public void setSunOpen(String sunOpen) {
        this.sunOpen = sunOpen;
    }

    /**
     * @return String return the sunClose
     */
    public String getSunClose() {
        return sunClose;
    }

    /**
     * @param sunClose the sunClose to set
     */
    public void setSunClose(String sunClose) {
        this.sunClose = sunClose;
    }

    /**
     * @return String return the monOpen
     */
    public String getMonOpen() {
        return monOpen;
    }

    /**
     * @param monOpen the monOpen to set
     */
    public void setMonOpen(String monOpen) {
        this.monOpen = monOpen;
    }

    /**
     * @return String return the monClose
     */
    public String getMonClose() {
        return monClose;
    }

    /**
     * @param monClose the monClose to set
     */
    public void setMonClose(String monClose) {
        this.monClose = monClose;
    }

    /**
     * @return String return the tuesOpen
     */
    public String getTuesOpen() {
        return tuesOpen;
    }

    /**
     * @param tuesOpen the tuesOpen to set
     */
    public void setTuesOpen(String tuesOpen) {
        this.tuesOpen = tuesOpen;
    }

    /**
     * @return String return the tuesClose
     */
    public String getTuesClose() {
        return tuesClose;
    }

    /**
     * @param tuesClose the tuesClose to set
     */
    public void setTuesClose(String tuesClose) {
        this.tuesClose = tuesClose;
    }

    /**
     * @return String return the wedOpen
     */
    public String getWedOpen() {
        return wedOpen;
    }

    /**
     * @param wedOpen the wedOpen to set
     */
    public void setWedOpen(String wedOpen) {
        this.wedOpen = wedOpen;
    }

    /**
     * @return String return the wedClose
     */
    public String getWedClose() {
        return wedClose;
    }

    /**
     * @param wedClose the wedClose to set
     */
    public void setWedClose(String wedClose) {
        this.wedClose = wedClose;
    }

    /**
     * @return String return the thurOpen
     */
    public String getThurOpen() {
        return thurOpen;
    }

    /**
     * @param thurOpen the thurOpen to set
     */
    public void setThurOpen(String thurOpen) {
        this.thurOpen = thurOpen;
    }

    /**
     * @return String return the thurClose
     */
    public String getThurClose() {
        return thurClose;
    }

    /**
     * @param thurClose the thurClose to set
     */
    public void setThurClose(String thurClose) {
        this.thurClose = thurClose;
    }

    /**
     * @return String return the friOpen
     */
    public String getFriOpen() {
        return friOpen;
    }

    /**
     * @param friOpen the friOpen to set
     */
    public void setFriOpen(String friOpen) {
        this.friOpen = friOpen;
    }

    /**
     * @return String return the friClose
     */
    public String getFriClose() {
        return friClose;
    }

    /**
     * @param friClose the friClose to set
     */
    public void setFriClose(String friClose) {
        this.friClose = friClose;
    }

    /**
     * @return String return the satOpen
     */
    public String getSatOpen() {
        return satOpen;
    }

    /**
     * @param satOpen the satOpen to set
     */
    public void setSatOpen(String satOpen) {
        this.satOpen = satOpen;
    }

    /**
     * @return String return the satClose
     */
    public String getSatClose() {
        return satClose;
    }

    /**
     * @param satClose the satClose to set
     */
    public void setSatClose(String satClose) {
        this.satClose = satClose;
    }

}
