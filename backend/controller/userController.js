const catchAsync = require("../utils/catchAsync");
const UserModel = require("../models/UserModel");

const getUser = catchAsync(async (req,res,next) => {
    res.json({
        status:true,
        data: {
            name: "Mubasher"
        }
    })
})

module.exports = {
    getUser
}