const bcrypt = require("bcryptjs");
const { model, Schema } = require("mongoose");
const validator = require("validator");

const UserSchema = new Schema(
    {
        name: {
            type: String,
            trim: true,
            required: [true, "Please tell your user name."],
            min: [3, "Name must be atleast 3 characters."],
            max: [3, "Name must be less than or equal to 15 characters."],
        },
        email: {
            type: String,
            unique: true,
            lowercase: true,
            required: [true, "Please provide your email."],
            validate: [validator.isEmail, "Incorrect email!"],
        },

        password: {
            type: String,
            select: false,
            required: [true, "Please enter your password."],
            minLength: [6, "Password must be atleast 6 characters."],
        },

        profile: {
            type: String,
            default:
                "https://media.istockphoto.com/id/1397556857/vector/avatar-13.jpg?s=612x612&w=0&k=20&c=n4kOY_OEVVIMkiCNOnFbCxM0yQBiKVea-ylQG62JErI=",
        },
        active: {
            type: Boolean,
            default: true,
            select: false,
        },

        passwordChangedAt: Date,
        passwordResetToken: String,
        passwordResetExpires: Date,
    },
    {
        timestamps: true,
    }
);

UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    const salt = await bcrypt.genSalt(10);

    this.password = await bcrypt.hash(this.password, salt);
});

// Query Middleware
UserSchema.pre(/^find/, function (next) {
    this.find({ active: { $ne: false } });
    next();
});

UserSchema.methods.checkPassword = async function (password) {
    return await bcrypt.compare(password.toString(), this.password);
};

UserSchema.methods.changedPassword = function (JWTTimeStamp) {
    if (this.passwordChangedAt) {
        const changedTimeStamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
        return JWTTimeStamp < changedTimeStamp;
    }

    return false; // MEANS PASSWORD NOT CHANGED.
};

const UserModel = model("User", UserSchema);

module.exports = UserModel;
