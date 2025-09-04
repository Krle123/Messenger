import { useState } from "react";
import { dataValidationMessage } from "../../api_services/validators/msg/MessageValidator";
import type { MsgFormProps } from "../../types/props/msg_form_props/MsgFormProps";

export function MessageForm({msgApi}: MsgFormProps) {
    const [idRcv, setIdRcv] = useState(0);
    const [idSnd, setIdSnd] = useState(0);
    const [messageContent, setMessageContent] = useState("");
    const [error, setError] = useState("");


    const submitForm = async (e: React.FormEvent) => {
        e.preventDefault();

        const validation = dataValidationMessage(messageContent);
        if (!validation.success) {
            setError(validation.message ?? "Invalid data");
            return;
        }

        const response = await msgApi.sendMessage(idRcv, idSnd, messageContent); // Example IDs
        if (!response.success || !response.data) {
            setError(response.message);
            setMessageContent("");
            return;
        }

        setMessageContent("");
    };

    return (
        <form onSubmit={submitForm}>
            <div className="flex p-3 border-t bg-gray-50">
            <input
                type="text"
                placeholder="Type a message..."
                value={messageContent}
                onChange={(e) => setMessageContent(e.target.value)}
                className="flex-1 border rounded-xl px-3 py-2 focus:outline-none"
            />
            <button type="submit" className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600">
                Send
            </button>
            </div>
        </form>
    );
}