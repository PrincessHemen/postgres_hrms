/**
 *  @desc Send any success response
 * 
 *  @param {string} message
 * 
 *  @param {object | array} results
 * 
 *  @param {number} status code
 */

export const showSuccess = (message, results, statusCode) => {
    return {
        message, 
        error: false,
        code: statusCode,
        results
    }
}

/**
 *  @desc Send any error response
 * 
 *  @param {string} message
 * 
 *  @param {number} status code
 */

export const showError = (message, statusCode) => {
    /**
     * List of common HTTP request codes
     * 
     * @note You can add more HTTP codes in here
     */
    const codes = [200, 201, 400, 401, 404, 403, 422, 500]

    //Get matched code
    const findCode = codes.find((code) => code === statusCode)

    if (!findCode) statusCode = 500
    else statusCode = findCode

    return {
        message, 
        code: statusCode,
        error: true
    }

}

/**
 *  @desc Send any error response
 * 
 *  @param {string} message
 * 
 *  @param {number} status code
 */

export const showValidation = (errors) => {
    return {
        message: "validation errors",
        error: true,
        code: 422,
        errors
    }
}


