const bcrypt = require("bcryptjs");
const { model, Schema } = require("mongoose");

const UserSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },

        password: {
            type: String,
            required: true,
        },

        profile: {
            type: String,
            default:
                "https://media.istockphoto.com/id/1397556857/vector/avatar-13.jpg?s=612x612&w=0&k=20&c=n4kOY_OEVVIMkiCNOnFbCxM0yQBiKVea-ylQG62JErI=",
        },
    },
    {
        timestamps: true,
    }
);

UserSchema.pre("save", async function (next) {
    if (!this.isModified) return next();

    const salt = await bcrypt.genSalt(10);

    this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.checkPassword = async function (password) {
    return await bcrypt.compare(password.toString(), this.password);
};

const UserModel = model("User", UserSchema);

module.exports = UserModel;
