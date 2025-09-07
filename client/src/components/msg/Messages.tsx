import { useEffect, useRef, useState } from "react";
import type { MsgFormProps } from "../../types/props/msg_form_props/MsgFormProps";
import { getLoggedInUser, type LoggedInUser } from "../../helpers/loggedInUser";
import type { MessageDto } from "../../models/msg/MessageDto";

export function Messages({msgApi, otherUserId}: MsgFormProps) {
    const [user, setUser] = useState<LoggedInUser>({ id: 0, username: "", role: "" });
    const [error, setError] = useState("");
    const [messages, setMessages] = useState<MessageDto[]>([]);

      const messagesEndRef = useRef<HTMLDivElement | null>(null);
      
    useEffect(() => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, [messages]);

    useEffect(() => {
        const currentUser = getLoggedInUser();
        if (!currentUser) {
            setError("User not logged in");
            return;
        }
        setUser(currentUser);

        async function fetchConversation() {
            if(currentUser.id === 0 || otherUserId === 0) 
            {
                console.log("User IDs not set yet");
                return;
            }
            const conv = await msgApi.getConversation(currentUser.id, otherUserId);
            const convData = conv.data;
            if (!conv.success || !convData) {
                setError(conv.message || "Failed to fetch messages");
                return;
            }
            for (let i = 0; i < convData.length; i++) {
                if (convData[i].idRcv === currentUser.id && !convData[i].msgRead) {
                    await msgApi.markAsRead(convData[i].id);
                }
            if (conv) {
            setMessages(convData);
            console.log("API response:", conv);
            }
            else {
            setError("Failed to fetch messages");
            }
        }
      }

      fetchConversation();

      const interval = setInterval(fetchConversation, 200);
      return () => clearInterval(interval);

    }, [msgApi, otherUserId]);
    

if (!messages.length) return <div className="p-4">Loading...</div>;
return (
  <div className="flex-1 p-4 overflow-y-auto space-y-3">
  {messages.map((msg) => (
    <div
      key={msg.id}
      className={`flex ${msg.idSnd === user.id ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`px-4 py-2 rounded-2xl max-w-xs break-words whitespace-pre-wrap ${
          msg.idSnd === user.id
            ? "bg-blue-500 text-white rounded-br-none"
            : "bg-gray-300 text-black rounded-bl-none"
        }`}
      >
        {msg.messageContent}
      </div>
    </div>
  ))}
  <div ref={messagesEndRef} />
</div>
);
}