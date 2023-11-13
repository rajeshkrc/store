const bcrypt = require("bcrypt");

class Hash {

    async generateSalt(saltNum = 10) {
        return await bcrypt.genSalt(saltNum);
    }

    /**
     * Method encrypt the plain text.
     * It takes two argumnets string and number
     * @param {String} text 
     * @param {Number} saltNum 
     * @returns {String} encrypted string
     */
    async hashText(text = '', saltNum = 10) {
        try {
            if (!text) 
                throw err;

            const salt = await this.generateSalt(saltNum);
            const hasedText = await bcrypt.hash(text, salt);

            return hasedText;
        } catch (err) {
            throw err;
        }
        
    }

    /**
     * Method compaires plain password text with encrypted string
     * It takes two string type arguments
     * @param {String} password 
     * @param {String} hashText 
     * @returns {Object}
     */
    async compareText(password, hashText) {
        try {
            const isPasswordMatch = await bcrypt.compare(password, hashText);

            return isPasswordMatch;
        } catch (err) {
            throw err;
        }
    }
}

module.exports = new Hash();
