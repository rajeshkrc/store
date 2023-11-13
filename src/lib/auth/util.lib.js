/**
 * Funtion prepares response object
 * @param {Number} statusCode 
 * @param {String} successMsg 
 * @param {[String] || String} errMsg 
 * @param {Object} data 
 * @returns 
 */
module.exports.getResponseObject = (statusCode, successMsg, errMsg, data) => {
    const resData = { statusCode };

    if (successMsg) {
        resData.message = successMsg;
    }

    if (errMsg) {
        resData.errorMessage = Array.isArray(errMsg) ? errMsg : [errMsg];
    }

    if (data) {
        resData.data = data;
    }

    return resData;
};
