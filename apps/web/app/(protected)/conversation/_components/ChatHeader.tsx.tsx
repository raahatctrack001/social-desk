"use client";

import { Video, Phone, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { IConversation } from "@/types/conversations/conversation.types";
import { useAppSelector } from "@/lib/store/hooks";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useWebSocket } from "@/lib/context/WebSocketContext";
import { safeSend } from "@/lib/context/safeSend";

interface ChatHeaderProps {
  activeConversation: IConversation|null;
  // onSearchMessage: (query: string) => void;
}

export default function ChatHeader(){
  const { currentUser } = useAppSelector((state) => state.user);
  const [conversation, setConversation] = useState<IConversation|null>(null);
  const users = conversation?.participants?.slice(0, 5).join(", ");

  const { activeConversation } = useAppSelector(state=>state.conversation);
  useEffect(()=> {
    setConversation(activeConversation);
  }, [activeConversation])
  
  
  

  if(!conversation)
      return;
  return (
    <div className="border-b px-4 py-3 w-full flex items-center justify-between gap-3 bg-background">
      {/* Conversation Name */}
      <Link 
      href={`/profile/${activeConversation?.isGroup ? 
        ('groupId'): 
        (activeConversation?.participants[0] === currentUser?._id ? activeConversation?.participants[1] : activeConversation?.participants[0])}`}
      className="flex justify-cent`er items-center gap-2">
        <Image
          src={
            activeConversation?.conversationImage ??
            process.env.NEXT_PUBLIC_FALLBACK_IMAGE_URL ??
            "/fallback-cover.jpg"
          }
          alt="cover"
          width={100}
          height={100}
          className="h-10 w-10 object-cover rounded-full "
        />
        <div>

        <div className="font-semibold text-lg truncate">
          {activeConversation?.isGroup
            ? activeConversation?.conversationName
            : activeConversation?.customNickname?.[currentUser?._id as string] ||
            "social media"}
        </div>
        <p className=" flex text-muted-foreground truncate"> 
          {
            !conversation?.isGroup ? <span className=""> last seen: zyx </span> :
            <span className="truncate max-w-2xs sm:max-w-sm md:max-w-md lg:max-w-xl"> {users} </span>
          }
        </p>
        </div>
      </Link>

      {/* Action Buttons */}
      <div className="flex items-center md:gap-2">
        <Button
          variant="ghost"
          size="lg"
          className="rounded-full"
          title="Voice Call"
        >
          <Phone size={18} />
        </Button>

        <Button
          variant="ghost"
          size="lg"
          className="rounded-full"
          title="Video Call"
        >
          <Video size={20} />
        </Button>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
          <Input
            type="text"
            placeholder="Search messages…"
            // onChange={(e) => onSearchMessage(e.target.value)}
            className={cn("pl-8 h-9 w-48 rounded-md hidden sm:inline")}
          />
        </div>
      </div>
    </div>
  );
}
