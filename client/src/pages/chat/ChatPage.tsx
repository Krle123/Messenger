import type { IMsgAPIService } from "../../api_services/msg/IMsgAPIService";
import { MessageForm } from "../../components/msg/MessageForm";
import { Messages } from "../../components/msg/Messages";
import { useLocation } from "react-router-dom";

interface ChatPageProps {
  msgApi: IMsgAPIService;
}

export default function Chat({ msgApi }: ChatPageProps) {

const location = useLocation();
const { username, id } = location.state;


  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-800/90">
      <div className="w-full max-w-md h-[80vh] bg-white rounded-2xl shadow-lg flex flex-col overflow-hidden">
                  <div className="grid grid-cols-3 items-center bg-gray-200 p-3">
                <button className="p-2 rounded-full hover:bg-gray-300 justify-self-start">
                  <a href="/select">
                    <img src="/back.png" alt="Back" className="w-5 h-5" />
                  </a>
                </button>
            <h2 className="text-center font-semibold">{username}</h2>
            <div className="w-9" />
            </div>

        <Messages msgApi={msgApi} otherUserId={id} />
        <MessageForm msgApi={msgApi} otherUserId={id} />
      </div>
    </main>
  );
}