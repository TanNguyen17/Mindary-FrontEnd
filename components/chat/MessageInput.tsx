import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface MessageInputProps {
    onSend: (message: string) => void;
    disabled?: boolean;
}

export function MessageInput({ onSend, disabled }: MessageInputProps) {
    const [message, setMessage] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (message.trim() && !disabled) {
            onSend(message);
            setMessage('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 border-t">
            <div className="flex gap-2">
                <Textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 resize-none"
                    rows={1}
                    disabled={disabled}
                />
                <Button type="submit" disabled={disabled || !message.trim()}>
                    Send
                </Button>
            </div>
        </form>
    );
} 