import { IConversation, IMessage } from "@repo/database";
import { WebSocket } from "ws";

export type Client = WebSocket;
export interface MessagePayload {
  type:
    | 'join'
    | 'message'
    | 'online'
    | 'offline'
    | 'typing'
    | 'stopTyping'
    | 'delivered'
    | 'read'
    | 'reaction'
    | 'remove-message';

  // General
  conversationId?: string;
  userId?: string;
  messageId?: string;

  // For message payloads
  message?: {
    conversation: IConversation,
    message: IMessage
  }

  // For reaction
  reaction?: string;
}


/**
 * 




//sending new message
{
  type: 'message',
  conversationId: 'conv123',
  message: {
    senderId: 'userA',
    content: 'Hello there!',
  }
}

//sending typing status
{
  type: 'typing',
  conversationId: 'conv123',
  userId: 'userA'
}

//sending message delivered
{
  type: 'delivered',
  conversationId: 'conv123',
  messageId: 'msg456',
  userId: 'userB'
}










*/
