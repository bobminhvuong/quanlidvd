var router = require('express').Router();
var fileUploadCtr = require('./../controller/fileUpload.controller');
module.exports = function () {
    router.post('/image', fileUploadCtr.uploadImg);
    return router;
}