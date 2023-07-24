const { model, Schema, default: mongoose } = require("mongoose");

const ChatSchema = Schema(
    {
        name: {
            type: String,
            trim: true,
        },

        isGroupChat: {
            type: Boolean,
            default: false,
        },
        users: [
            {
                type: mongoose.Types.ObjectId,
                ref: "User",
            },
        ],
        latestMessage: [
            {
                type: mongoose.Types.ObjectId,
                ref: "Message",
            },
        ],

        groupAdmin: {
            type: mongoose.Types.ObjectId,
            ref: "User",
        },
    },
    {
        timestamps: true,
    }
);

const ChatModel = model("Chat", ChatSchema);

module.exports = ChatModel;
