class ExpressError extends Error { //we extend Error to use other methods from Error-regular built-in error
    constructor(message, statusCode) {
        super(); //reference to what we are extending from(Error)
        this.message = message;
        this.statusCode = statusCode;
    }
}

module.exports = ExpressError;