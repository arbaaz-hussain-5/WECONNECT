import { useParams } from "react-router";
import ChatBoard from "../../components/chat_board/ChatBoard";
function ChatPage() {
  let params = useParams();
  return (
    <div>
      <ChatBoard current_user={params.id} />
    </div>
  );
}

export default ChatPage;
