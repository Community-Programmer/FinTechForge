import React, { useEffect,useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

import {
  Hash,
  MessageCircle,
  HelpCircle,
  Megaphone,
  FileText,
  Calendar,
  User,
  Edit3,
  AlertCircle,
} from "lucide-react";

type Channel = {
  id: number;
  name: string;
  type: "main" | "side";
};

type Message = {
  id: number;
  user: string;
  content: string;
  timestamp: string;
};

const channelIcons: Record<string, React.ReactNode> = {
  general: <Hash size={20} />,
  help: <HelpCircle size={20} />,
  "off-topic": <MessageCircle size={20} />,
  announcements: <Megaphone size={20} />,
  rules: <FileText size={20} />,
  events: <Calendar size={20} />,
  introduction: <User size={20} />,
  feedback: <Edit3 size={20} />,
  issues: <AlertCircle size={20} />,
};

const hardcodedChannels: Channel[] = [
  { id: 1, name: "general", type: "main" },
  { id: 2, name: "help", type: "main" },
  { id: 5, name: "off-topic", type: "side" },
  { id: 6, name: "announcements", type: "side" },
  { id: 7, name: "rules", type: "side" },
  { id: 8, name: "events", type: "side" },
  { id: 9, name: "introduction", type: "main" },
  { id: 10, name: "issues", type: "main" },
];

const Community: React.FC = () => {

const [activeChannel, setActiveChannel] = useState<Channel | null>(hardcodedChannels[0]);
const [messageInput, setMessageInput] = useState("");
const [messages, setMessages] = useState<Message[]>([]);

// Function to fetch messages from backend
const fetchMessages = async (channelId: number) => {
  try {
    // code to fetch 
  } catch (err: any) {
    console.error("Error fetching messages:", err);
  }
};

const postMessage = async () => {
  if (!messageInput.trim() || !activeChannel) return;

  try {
    // code to post the message to backend
  } catch (err) {
    console.error("Error sending message:", err);
  }
};


useEffect(() => {
  if (activeChannel) {
    fetchMessages(activeChannel.id);
  }
}, [activeChannel,messages]);


  return (
    <div className="flex h-screen bg-[#121212] text-white">
      {/* Sidebar */}
      <div className="w-64 border-r border-gray-800 bg-[#1e1e1e] p-4">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          Channels
        </h2>
        <ScrollArea className="h-[85vh] pr-2">
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-bold text-gray-400 uppercase">Main</h3>
              {hardcodedChannels
                .filter((c) => c.type === "main")
                .map((channel) => (
                  <div
                    key={channel.id}
                    onClick={() => setActiveChannel(channel)}
                    className={`cursor-pointer flex items-center gap-2 px-2 py-1 rounded hover:bg-[#2a2a2a] ${
                      activeChannel?.id === channel.id ? "bg-[#333]" : ""
                    }`}
                  >
                    <span className="text-gray-400">
                      {channelIcons[channel.name] || null}
                    </span>
                    <span>{channel.name}</span>
                  </div>
                ))}
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-400 uppercase">Side</h3>
              {hardcodedChannels
                .filter((c) => c.type === "side")
                .map((channel) => (
                  <div
                    key={channel.id}
                    onClick={() => setActiveChannel(channel)}
                    className={`cursor-pointer flex items-center gap-2 px-2 py-1 rounded hover:bg-[#2a2a2a] ${
                      activeChannel?.id === channel.id ? "bg-[#333]" : ""
                    }`}
                  >
                    <span className="text-gray-400">
                      {channelIcons[channel.name] || null}
                    </span>
                    <span>{channel.name}</span>
                  </div>
                ))}
            </div>
          </div>
        </ScrollArea>
      </div>

      {/* Main Feed */}
      <div className="flex flex-col flex-1">
        <div className="border-b border-gray-800 px-6 py-4 bg-[#1a1a1a] text-xl font-semibold flex items-center gap-2">
          <span className="text-gray-400">
            {activeChannel ? channelIcons[activeChannel.name] : null}
          </span>
           {activeChannel?.name}
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 px-6 py-4 space-y-4 bg-[#121212]">
          {messages.map((msg) => (
            <Card key={msg.id} className="bg-[#1e1e1e] border-none text-white">
              <CardContent className="p-4">
                <div className="text-sm text-gray-400 mb-1">
                  {msg.user} • {msg.timestamp}
                </div>
                <div className="text-base">{msg.content}</div>
              </CardContent>
            </Card>
          ))}
        </ScrollArea>

        <div className="border-t border-gray-800 p-4 bg-[#1a1a1a]">
          <form
           className="flex gap-2 items-center"
          onSubmit={(e) => {
            e.preventDefault();
            postMessage(); 
          }}
          >
            <Input
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              placeholder={`Message #${activeChannel?.name}`}
              className="flex-1 resize-none bg-[#2a2a2a] border border-gray-700 text-white placeholder-gray-500"
            />
            <Button
              type="submit"
              className=" bg-blue-500 hover:bg-blue-600 text-white cursor-pointer"
            >
              Send
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Community;
