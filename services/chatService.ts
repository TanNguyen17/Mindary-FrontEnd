import axiosInstance from '@/apiConfig';
import { ChatRequest, Conversation, ChatMessage } from '@/app/types/chat';

export const chatService = {
    // Create new conversation
    createConversation: async (request: ChatRequest) => {
        const response = await axiosInstance.post('/chat/conversations', request);
        return response.data;
    },

    // Get user's conversations
    getUserConversations: async (userId: string) => {
        const response = await axiosInstance.get<Conversation[]>(`/chat/conversations/user/${userId}`);
        return response.data;
    },

    // Get conversation messages
    getConversationMessages: async (conversationId: string) => {
        const response = await axiosInstance.get<ChatMessage[]>(`/chat/conversations/${conversationId}/messages`);
        return response.data;
    },

    // Send message in conversation
    sendMessage: async (conversationId: string, request: ChatRequest) => {
        const response = await axiosInstance.post<ChatMessage>(`/chat/conversations/${conversationId}/messages`, request);
        return response.data;
    },

    // Delete conversation
    deleteConversation: async (conversationId: string) => {
        const response = await axiosInstance.delete(`/chat/conversations/${conversationId}`);
        return response.data;
    },

    // Delete message
    deleteMessage: async (conversationId: string, messageId: string) => {
        await axiosInstance.delete(`/chat/conversations/${conversationId}/messages/${messageId}`);
    }
}; 