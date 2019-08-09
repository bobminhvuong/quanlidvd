
module.exports = {
    ERROR_MESSAGE: {
        USER: {
            USER_ERROR: 'USER+ERROR',
            USER_EXIST: 'USER_EXIST',
            EMAIL_EXIST: 'EMAIL_EXIST',
            EMAIL_NOT_FOUND: 'EMAIL_NOT_FOUND',
            PASS_WRONG:'PASS_WRONG'
        },
        RESTAURANT: {
            EXIT: 'RESTAURANT_EXIST',
            NOT_FOND: 'RESTAURANT_NOT_FOUND'
        },
        AUTH: {
            INVALID_TOKEN: 'INVALID_TOKEN',
            PERMISSION: 'PERMISSION',
            NOT_AUTHORIZED: 'NOT_AUTHORIZED',
            INVALID_LOGIN_CREDENTIALS: 'INVALID_LOGIN_CREDENTIALS',
            NOT_SEND_SMS: 'NOT_SEND_SMS'
          },
    },
    SUCCESS_MESSAGE: {
        USER: {
            CREATED: 'USER_CREATE',
            DELETED: 'USER_DELETE',
            SUCCES: 'SUCCES'
        },
        RESTAURANT: {
            CREATED: 'RESTAURANT_CREATE',
            DELETED: 'RESTAURANT_DELETE',
            SUCCES: 'SUCCES'
        }
    },
    STATUS_CODE: {
        SUCCES: 200,
        CREATED: 201,
        ACCEPTED: 202,
        NOT_FOUND: 404,
        ERROR: 400,
        ERROR_SERVER: 500
    }
}