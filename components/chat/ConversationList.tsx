import { Conversation } from '@/app/types/chat';
import { format } from 'date-fns';

interface ConversationListProps {
    conversations: Conversation[];
    currentConversation: Conversation | null;
    onSelect: (conversation: Conversation) => void;
}

export function ConversationList({ conversations, currentConversation, onSelect }: ConversationListProps) {
    return (
        <div className="space-y-2">
            {conversations.map((conversation) => (
                <div
                    key={conversation.id}
                    className={`p-3 rounded-lg cursor-pointer hover:bg-gray-100 ${currentConversation?.id === conversation.id ? 'bg-gray-100' : ''
                        }`}
                    onClick={() => onSelect(conversation)}
                >
                    <div className="font-medium">{conversation.title}</div>
                    <div className="text-sm text-gray-500 truncate">
                        {conversation.lastMessage}
                    </div>
                    <div className="text-xs text-gray-400">
                        {format(new Date(conversation.lastMessageAt), 'MMM d, h:mm a')}
                    </div>
                </div>
            ))}
        </div>
    );
} 