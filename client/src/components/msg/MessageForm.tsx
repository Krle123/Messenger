import { useEffect, useState } from "react";
import type { MsgFormProps } from "../../types/props/msg_form_props/MsgFormProps";
import { getLoggedInUser } from "../../helpers/loggedInUser";

export function MessageForm({msgApi, otherUserId}: MsgFormProps) {
    const [idRcv, setIdRcv] = useState(1);
    const [idSnd, setIdSnd] = useState(2);
    const [messageContent, setMessageContent] = useState("");


    const handleSend = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (!messageContent.trim()) return;
        await msgApi.sendMessage(idRcv, idSnd, messageContent);

        setMessageContent("");
  };

    useEffect(() => {
        const user = getLoggedInUser();
        setIdSnd(user.id);                                             
        setIdRcv(otherUserId);
    }, []);

  return (
    <form
      onSubmit={handleSend} // 👈 handles Enter press
      className="p-3 border-t flex items-center gap-2"
    >
      <input
        type="text"
        value={messageContent}
        onChange={(e) => setMessageContent(e.target.value)}
        placeholder="Type a message..."
        className="flex-1 border rounded-xl px-3 py-2 focus:outline-none"
      />
      <button
        type="submit" // 👈 submit on Enter
        disabled={!messageContent.trim()}
        className={`px-4 py-2 rounded-xl font-semibold ${
          messageContent.trim()
            ? "bg-blue-500 text-white hover:bg-blue-600"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
      >
        Send
      </button>
    </form>
  );
}