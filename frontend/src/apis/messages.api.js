import api from "../lib/api";

export const fetchMessages = async () => {
  const response = await api.get("/messages");
  if (response.data.status !== 200) {
    throw new Error(response.data.message || "Failed to load messages");
  }
  return response.data.data;
};

export const deleteMessage = async (id) => {
  const response = await api.delete(`/messages/${id}`);
  if (response.data.status !== 200) {
    throw new Error(response.data.message || "Failed to delete message");
  }
  return response.data;
};

export const sendAnonymousMessage = async (content, receiverId) => {
  const response = await api.post("/messages", { content, receiverId });
  if (response.data.status !== 201) {
    throw new Error(response.data.message || "Failed to send message");
  }
  return response.data;
};
