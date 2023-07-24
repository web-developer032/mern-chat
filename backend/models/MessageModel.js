const { model, Schema, default: mongoose } = require("mongoose");

const MessageSchema = Schema(
    {
        message: {
            type: String,
            trim: true,
        },

        chat: {
            type: mongoose.Types.ObjectId,
            ref: "Chat",
        },

        sender: [
            {
                type: mongoose.Types.ObjectId,
                ref: "User",
            },
        ],
    },
    {
        timestamp: true,
    }
);

const MessageModel = model("Chat", MessageSchema);

module.exports = MessageModel;
