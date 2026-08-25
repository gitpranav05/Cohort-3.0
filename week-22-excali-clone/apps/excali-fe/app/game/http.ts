import axios from "axios";
const NEXT_PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function getExistingShapes(roomId: string) {
  const res = await axios.get(`${NEXT_PUBLIC_BACKEND_URL}/chat/${roomId}`);
  const messages = res.data.messages;

  const shapes = messages.flatMap((x: { message: string }) => {
    try {
      const messageData = JSON.parse(x.message);
      return messageData.shape ? [messageData.shape] : [];
    } catch {
      return [];
    }
  });

  return shapes;
}
