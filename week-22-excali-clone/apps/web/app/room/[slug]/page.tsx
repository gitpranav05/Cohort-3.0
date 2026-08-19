import axios from "axios";
import "dotenv/config";
import { ChatRoom } from "../../../components/ChatRoom";

// eslint-disable-next-line turbo/no-undeclared-env-vars
export const BACKEND_URL = process.env.BACKEND_URL;
// eslint-disable-next-line turbo/no-undeclared-env-vars
export const WS_URL = process.env.WS_URL;
console.log(BACKEND_URL);

async function getRoomId(slug: string) {
  const url = `${BACKEND_URL}/room/${slug}`;
  // console.log(url);
  const response = await axios.get(url);
  // console.log(response.data.room[0].id);
  return response.data.room[0].id;
}

async function ChatRoom1({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}) {
  const { slug } = await params;

  console.log(slug);

  const roomId = await getRoomId(slug);

  return <ChatRoom id={roomId}></ChatRoom>;
}
export default ChatRoom1;
