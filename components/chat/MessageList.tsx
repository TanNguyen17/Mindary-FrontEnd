import { ChatMessage } from '@/app/types/chat';
import { format } from 'date-fns';

interface MessageListProps {
    messages: ChatMessage[];
}

export function MessageList({ messages }: MessageListProps) {
    return (
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
                <div
                    key={message.id}
                    className={`flex ${message.type === 'USER' ? 'justify-end' : 'justify-start'}`}
                >
                    <div
                        className={`max-w-[70%] rounded-lg p-3 ${message.type === 'USER'
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-100 text-gray-900'
                            }`}
                    >
                        <div className="text-sm">{message.message}</div>
                        <div className="text-xs mt-1 opacity-70">
                            {format(new Date(message.timestamp), 'h:mm a')}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
} 