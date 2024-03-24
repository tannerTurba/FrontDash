public class Order {
    private float price = (float)(Math.random() * 200);
    private float tips = (float)(Math.random() * 50);
    private String status = "delivered";
    private CreditCard creditCard = DataGenerator.createCreditCard();
    private ContactInfo contactInfo = DataGenerator.getContactInfo();

    /**
     * @return float return the price
     */
    public float getPrice() {
        return price;
    }

    /**
     * @param price the price to set
     */
    public void setPrice(float price) {
        this.price = price;
    }

    /**
     * @return float return the tips
     */
    public float getTips() {
        return tips;
    }

    /**
     * @param tips the tips to set
     */
    public void setTips(float tips) {
        this.tips = tips;
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
     * @return CreditCard return the creditCard
     */
    public CreditCard getCreditCard() {
        return creditCard;
    }

    /**
     * @param creditCard the creditCard to set
     */
    public void setCreditCard(CreditCard creditCard) {
        this.creditCard = creditCard;
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

}
