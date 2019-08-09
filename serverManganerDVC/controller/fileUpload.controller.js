const db = require("./../models");
var path = require('path');
var moment = require('moment')
module.exports = {
  uploadImg: uploadImg
}

async function uploadImg(req, res) {
  let file = req.files.file;
  var urlSaveFile = '../public/images/';
  var fileName = `${moment().year()}${moment().month() + 1}${moment().date()}_${createRamdomNameImg()}.png`;
  
  try {
    file.mv(path.join(__dirname, urlSaveFile + fileName), function (err) {
      var newImg = {
        url: 'public/images/' + fileName,
        size: file.mimetype
      }
      db.image.create(newImg).then(r => {
        res.send(r);
      })
    });
  } catch (error) {
    res.status(400).send({ msg: 'Wrong syntax input!' });
  }
}

function createRamdomNameImg() {
  return 'xxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}