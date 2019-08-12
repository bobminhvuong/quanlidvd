var express = require('express');
var bodyParser = require('body-parser')
var app = express();
var config = require('./config');
var fileUpload = require('express-fileupload');
var logger = require('morgan');
const db = require("./models");
var cors = require('cors');
const faker = require("faker");
const { times } = require("lodash");
var crypto = require('./utils/crypto');

const http = require('http').Server(app);
const io = require('socket.io')(http);
var messCtrl = require('./controller/message.controller');


//log mỗi khi có api gọi
app.use(logger('dev'));

//cho phép truy cập từ bên ngoài public
app.use('/public', express.static('public'));
app.use(fileUpload());
app.use(cors())

//--------- khởi tạo body paser nhận dữ liệu json chuyển thành object
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

//--------------------

//khởi tạo api

app.use('/api/user', require('./routes/user.route')());
app.use('/api/auth', require('./routes/auth.route')());
app.use('/api/catalog', require('./routes/catalog.route')());
app.use('/api/client', require('./routes/client.route')());
app.use('/api/dvd', require('./routes/dvd.route')());
app.use('/api/dvdDetail', require('./routes/dvdDetail.route')());
app.use('/api/fileUpload', require('./routes/fileUpload.route')());
app.use('/api/order', require('./routes/order.route')());
app.use('/api/message', require('./routes/message.route')());
//-------------------


//{ force: true }
// db.sequelize.sync().then(() => {
db.sequelize.sync().then(async () => {
    // db.user.findOne({ where: { email: 'admin@admin.com' } }).then(r=>{
    //     if(!r){
    //         var user = {
    //             email:"admin@admin.com",
    //             fullName: 'admin',
    //             dob:'2/2/1997',
    //             gender:'male',
    //             address: '610 hà huy giáp',
    //             password: 'admin',
    //             phoneNumber:'0399994511',
    //             note: ''
    //         }
    //         db.user.create(user).then(r=>{
    //             console.log(r.dataValues);
    //         })

    //         var user = {
    //             email:"test@admin.com",
    //             fullName: 'test',
    //             dob:'2/2/1997',
    //             gender:'male',
    //             address: '610 hà huy giáp',
    //             password: '123',
    //             phoneNumber:'0399994512',
    //             note: ''
    //         }
    //         db.user.create(user).then(r=>{
    //             console.log(r.dataValues);
    //         })
    //     }
    // });

    // db.user.bulkCreate(
    //     times(10, () => ({
    //         fullName: faker.name.firstName(),
    //         email: faker.internet.email(),
    //         password: 123,
    //         salt: crypto.genSalt(),
    //         dob: '1997/12/12',
    //         gender: 'male',
    //         phoneNumber: faker.phone.phoneNumber(),
    //         address: faker.address.country()
    //     }))
    // );

    // db.client.bulkCreate(
    //     times(10, () => ({
    //         fullName: faker.name.firstName(),
    //         email: faker.internet.email(),
    //         dob: '1997/12/12',
    //         gender: 'male',
    //         phoneNumber: faker.phone.phoneNumber(),
    //         address: faker.address.country(),
    //         userId: 1
    //     }))
    // );

    // db.catalog.bulkCreate(
    //     times(10, () => ({
    //         name: faker.name.firstName(),
    //         note: faker.internet.userName()
    //     }))
    // );

    // db.dvd.bulkCreate(
    //     times(10, () => ({
    //         name: faker.name.firstName(),
    //         note: faker.internet.userName(),
    //         supplier: faker.lorem.word(),
    //         price: faker.random.number(0, 1000000),
    //         catalogId: 1
    //     }))
    // );

    // db.dvdDetail.bulkCreate(
    //     times(10, () => ({
    //         code: faker.random.number(),
    //         status: 'RENT',
    //         dvdId: 4
    //     }))
    // );



    //socket 
    const documents = {};

    io.on("connection", socket => {
        socket.on('userInit',data=>{
            documents[data.id] =socket.id;
            console.log(documents);
        });

        socket.on('sendMes', async mes=>{
            var newMes = await messCtrl.saveMessage(mes);
            if(newMes){
                mes.time = new Date();
                socket.to(documents[mes.userReceiptId]).emit('newMessage',mes)
            }
        });

        socket.on('disconect',data=>{
            console.log(data);
        })
    });

    http.listen(config.PORT);
    console.log(`serve is listening port ${config.PORT}`)
})

