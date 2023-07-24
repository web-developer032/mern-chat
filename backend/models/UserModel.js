const { model, Schema, default: mongoose } = require("mongoose");

const UserSchema = Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
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

const UserModel = model("User", UserSchema);

module.exports = UserModel;
