import type { IMsgAPIService } from "../../api_services/msg/IMsgAPIService";
import { MessageForm } from "../../components/msg/MessageForm";

interface ChatPageProps {
  msgApi: IMsgAPIService;
}

export default function Chat({ msgApi }: ChatPageProps) {
  const username = "Predrag Maslaric";

  const messages = [
    { id: 1, sender: "user", text: "aaaaaaaaaaa" },
    { id: 2, sender: "other", text: "aaaaaaaaaaaaaaaaaaa" },
    { id: 3, sender: "user", text: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" },
    { id: 4, sender: "other", text: "aaaaaaaaaaaaaaaaaaa" },
    { id: 5, sender: "user", text: "aaaaaaaaaaaaaaaaaaa" },
    { id: 6, sender: "other", text: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" },
    { id: 7, sender: "user", text: "aaaaaaaaaaaaaaaaaaa" },
    { id: 8, sender: "user", text: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" },
    { id: 9, sender: "other", text: "aaaaaaaaaaaaaaaaaaa" },
    { id: 10, sender: "user", text: "aaaaaaaaaaaaaaaaaaa" },
    { id: 11, sender: "user", text: "aaaaaaaaaaaaaaaaaaa" },
    { id: 12, sender: "other", text: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" },
    { id: 13, sender: "user", text: "aaaaaaaaaaaaaaaaaaa" },
    { id: 14, sender: "user", text: "aaaaaaaaaaaaaaaaaaa" },
    { id: 15, sender: "other", text: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" },
    { id: 16, sender: "other", text: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" },
  ];

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-800/90">
      <div className="w-1/3 max-w-md h-[80vh] bg-white rounded-2xl shadow-lg flex flex-col overflow-hidden">
        <div className="grid grid-cols-3 items-center bg-gray-200 p-3">
            <button className="p-2 rounded-full hover:bg-gray-300 justify-self-start">
                <img src="/back.png" alt="Back" className="w-5 h-5" />
            </button>
          <h2 className="text-center font-semibold">{username}</h2>
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

        <MessageForm msgApi={msgApi} />
      </div>
    </main>
  );
}