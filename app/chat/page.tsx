"use client";
import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { conversationsAtom, currentConversationAtom, loadingAtom } from '@/store/chatStore';
import { chatService } from '@/services/chatService';
import { ConversationList } from '@/components/chat/ConversationList';
import { ChatArea } from '@/components/chat/ChatArea';
import { EmptyState } from '@/components/chat/EmptyState';
import { Button } from '@/components/ui/button';
import { useToast } from "@/hooks/use-toast";

export default function ChatPage() {
    const [loading, setLoading] = useAtom(loadingAtom);
    const [conversations, setConversations] = useAtom(conversationsAtom);
    const [currentConversation, setCurrentConversation] = useAtom(currentConversationAtom);
    const { toast } = useToast();

    useEffect(() => {
        const fetchConversations = async () => {
            try {
                setLoading(true);
                // userId o localStorage
                const userId = localStorage.getItem('userId');
                if (!userId) {
                    window.location.href = '/login';
                    return;
                }
                const conversations = await chatService.getUserConversations(userId);
                setConversations(conversations);
            } catch (error) {
                console.error('Error fetching conversations:', error);
                handleError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchConversations();
    }, []);

    const handleError = (error: any) => {
        console.error('Error:', error);
        toast({
            variant: "destructive",
            title: "Error",
            description: error.response?.data?.message || "Something went wrong"
        });
    };

    const handleNewChat = async () => {
        try {
            setLoading(true);
            const userId = localStorage.getItem('userId');
            if (!userId) {
                window.location.href = '/login';
                return;
            }

            const newConversation = await chatService.createConversation({
                userId,
                message: "" // empty message as the first real message will set the title
            });
            setConversations(prev => [...prev, newConversation]);
            setCurrentConversation(newConversation);
        } catch (error) {
            console.error('Error creating conversation:', error);
            handleError(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex h-screen bg-white">
            {loading && (
                <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
                    <div className="bg-white p-4 rounded-lg shadow">Loading...</div>
                </div>
            )}
            {/* Sidebar */}
            <div className="w-1/4 border-r border-gray-200 p-4">
                <div className="mb-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Chat</h1>
                    <Button
                        onClick={handleNewChat}
                        disabled={loading}
                    >
                        New Chat
                    </Button>
                </div>
                <ConversationList
                    conversations={conversations}
                    currentConversation={currentConversation}
                    onSelect={setCurrentConversation}
                />
            </div>

            {/* Main Chat Area */}
            <div className="flex-1 flex flex-col">
                {currentConversation ? (
                    <ChatArea conversation={currentConversation} />
                ) : (
                    <EmptyState />
                )}
            </div>
        </div>
    );
} 