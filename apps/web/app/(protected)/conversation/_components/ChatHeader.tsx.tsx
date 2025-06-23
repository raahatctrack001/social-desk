"use client";

import { Video, Phone, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { IConversation } from "@/types/conversations/conversation.types";
import { useAppSelector } from "@/lib/store/hooks";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ChatHeader() {
  const { currentUser } = useAppSelector((state) => state.user);
  const { activeConversation } = useAppSelector((state) => state.conversation);
  const { users: onlineUsers } = useAppSelector((state) => state.onlineStatus);
  const [onlineStatus, setOnlineStatus] = useState<{
    isOnline: boolean;
    lastSeen: Date | null;
  }>();

  useEffect(() => {
    if (!activeConversation || activeConversation.isGroup) return;

    const otherParticipantId = activeConversation.participants.find(
      (id) => id.toString() !== currentUser?._id
    );

    if (otherParticipantId) {
      const status = onlineUsers[otherParticipantId.toString()];
      setOnlineStatus(status);
    }
  }, [activeConversation, onlineUsers, currentUser]);

  if (!activeConversation) return null;

  // for group user display
  const users = "see you later!"
  // "activeConversation.isGroup
  //   ? activeConversation.participants
  //       .filter((id) => id.toString() !== currentUser?._id)
  //       .map((id) => {
  //         const status = onlineUsers[id];
  //         return `${id.slice(0, 6)}: ${status?.isOnline ? "Online" : "Offline"}`;
  //       })
  //       .join(", ")
  //   : "";

  return (
    <div className="border-b px-4 py-3 w-full flex items-center justify-between gap-3 bg-background">
      <Link
        href={`/profile/${
          activeConversation.isGroup
            ? "groupId"
            : activeConversation.participants.find((id) => id.toString() !== currentUser?._id)
        }`}
        className="flex items-center gap-2"
      >
        <Image
          src={
            activeConversation.conversationImage ??
            process.env.NEXT_PUBLIC_FALLBACK_IMAGE_URL ??
            "/fallback-cover.jpg"
          }
          alt="cover"
          width={100}
          height={100}
          className="h-10 w-10 object-cover rounded-full"
        />

        <div>
          <div className="font-semibold text-lg truncate">
            {activeConversation.isGroup
              ? activeConversation.conversationName
              : activeConversation.customNickname?.[currentUser?._id as string] || "Social Media"}
          </div>

          <p className="flex text-muted-foreground truncate">
            {!activeConversation.isGroup ? (
              <span>
                {onlineStatus?.isOnline
                  ? "Online"
                  : onlineStatus?.lastSeen
                  ? `last seen: ${new Date(onlineStatus.lastSeen)?.toLocaleString()?.split(",")[1]}`
                  : "Offline"}
              </span>
            ) : (
              <span className="truncate max-w-2xs sm:max-w-sm md:max-w-md lg:max-w-xl">
                {users}
              </span>
            )}
          </p>
        </div>
      </Link>

      <div className="flex items-center md:gap-2">
        <Button variant="ghost" size="lg" className="rounded-full" title="Voice Call">
          <Phone size={18} />
        </Button>

        <Button variant="ghost" size="lg" className="rounded-full" title="Video Call">
          <Video size={20} />
        </Button>

        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            size={16}
          />
          <Input
            type="text"
            placeholder="Search messages…"
            className={cn("pl-8 h-9 w-48 rounded-md hidden sm:inline")}
          />
        </div>
      </div>
    </div>
  );
}
