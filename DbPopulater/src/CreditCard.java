public class CreditCard {
    private String cardNumber;
    private String expirationDate;
    private int securityCode;

    public CreditCard(String c, String d, int s) {
        cardNumber = c;
        expirationDate = d;
        securityCode = s;
    }

    /**
     * @return String return the cardNumber
     */
    public String getCardNumber() {
        return cardNumber;
    }

    /**
     * @param cardNumber the cardNumber to set
     */
    public void setCardNumber(String cardNumber) {
        this.cardNumber = cardNumber;
    }

    /**
     * @return String return the expirationDate
     */
    public String getExpirationDate() {
        return expirationDate;
    }

    /**
     * @param expirationDate the expirationDate to set
     */
    public void setExpirationDate(String expirationDate) {
        this.expirationDate = expirationDate;
    }

    /**
     * @return int return the securityCode
     */
    public int getSecurityCode() {
        return securityCode;
    }

    /**
     * @param securityCode the securityCode to set
     */
    public void setSecurityCode(int securityCode) {
        this.securityCode = securityCode;
    }

}
