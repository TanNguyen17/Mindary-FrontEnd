import { useState } from 'react';
import { Conversation, ChatMessage } from '@/app/types/chat';
import { useAtom } from 'jotai';
import { messagesAtom } from '@/store/chatStore';
import { chatService } from '@/services/chatService';
import { MessageList } from './MessageList';
import { MessageInput } from './MessageInput';

interface ChatAreaProps {
    conversation: Conversation;
}

export function ChatArea({ conversation }: ChatAreaProps) {
    const [messages, setMessages] = useAtom(messagesAtom);
    const [sending, setSending] = useState(false);

    const handleSendMessage = async (content: string) => {
        if (!content.trim()) return;

        try {
            setSending(true);
            const response = await chatService.sendMessage(conversation.id, {
                userId: conversation.userId,
                message: content
            });

            setMessages((prev) => [...prev, response]);
        } catch (error) {
            console.error('Error sending message:', error);
        } finally {
            setSending(false);
        }
    };

    return (
        <div className="flex-1 flex flex-col">
            <div className="p-4 border-b">
                <h2 className="text-xl font-semibold">{conversation.title}</h2>
            </div>

            <MessageList messages={messages} />

            <MessageInput onSend={handleSendMessage} disabled={sending} />
        </div>
    );
} 