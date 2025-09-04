import { useEffect, useState } from "react";
import type { MsgFormProps } from "../../types/props/msg_form_props/MsgFormProps";
import { getLoggedInUser, type LoggedInUser } from "../../helpers/loggedInUser";
import { usersApi } from "../../api_services/users/UsersAPIService";

export function Messages({msgApi}: MsgFormProps) {
    const [idRcv, setIdRcv] = useState(0);
    const [idSnd, setIdSnd] = useState(1);
    const [messageContent, setMessageContent] = useState("");
    const [user, setUser] = useState<LoggedInUser | null>(null);
    const [error, setError] = useState("");

    const OtherID = 2;
    const otherUsername = usersApi.getUserById(OtherID).then(user => user?.username ?? "Unknown");
    const messages = msgApi.getConversation(OtherID, user?.id ?? 0).then(msgs => msgs?.map(msg => ({
        id: msg.id,
        text: msg.messageContent,
        sender: msg.idSnd === (user?.id ?? 0) ? "user" : "other"
    })) ?? []);
        // Get current logged-in user on mount
    useEffect(() => {
    const currentUser = getLoggedInUser();
    if (!currentUser) {
        setError("User not logged in");
        return;
    }
    setUser(currentUser);
    }, []);

    


    return (
        <div>
            <div className="grid grid-cols-3 items-center bg-gray-200 p-3">
                <button className="p-2 rounded-full hover:bg-gray-300 justify-self-start">
                    <img src="/back.png" alt="Back" className="w-5 h-5" />
                </button>
            <h2 className="text-center font-semibold">{otherUsername}</h2>
            <div className="w-9" />
            </div>

            <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {messages.map((msg) => (
                <div
                key={msg.id}
                className={`flex ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
                >
                <div
                    className={`px-4 py-2 rounded-2xl max-w-xs break-words whitespace-pre-wrap ${
                    msg.sender === "user"
                        ? "bg-blue-500 text-white rounded-br-none"
                        : "bg-gray-300 text-black rounded-bl-none"
                    }`}
                >
                    {msg.text}
                </div>
                </div>
            ))}
            </div>
        </div>
    );
}