const bcrypt = require("bcrypt");

class Hash {

    async generateSalt(saltNum = 10) {
        return await bcrypt.genSalt(saltNum);
    }

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
