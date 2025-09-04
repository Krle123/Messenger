import type { IMsgAPIService } from "../../api_services/msg/IMsgAPIService";
import { MessageForm } from "../../components/msg/MessageForm";

interface ChatPageProps {
  msgApi: IMsgAPIService;
}

export default function Chat({ msgApi }: ChatPageProps) {
  const username = "Predrag Maslaric";

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-800/90">
      <div className="w-1/3 max-w-md h-[80vh] bg-white rounded-2xl shadow-lg flex flex-col overflow-hidden">

        <MessageForm msgApi={msgApi} />
      </div>
    </main>
  );
}