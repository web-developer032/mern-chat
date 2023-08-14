import React, { useEffect } from "react";
import ChatServices from "@/services/Chat";

function Chat() {
    useEffect(() => {
        const fetchAllChats = async () => {
            const chats = await ChatServices.fetchAllChats();
            console.log("ALL CHATS: ", chats);
            return chats;
        };

        fetchAllChats();
    }, []);

    return <div>Chat</div>;
}

export default Chat;
