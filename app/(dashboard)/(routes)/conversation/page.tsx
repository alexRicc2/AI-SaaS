"use client";

import axios from "axios";
import { MessageSquare } from "lucide-react";
import { useState } from "react";
import { ChatCompletionRequestMessage } from "openai";
import { BotAvatar } from "@/components/bot-avatar";
import Heading from "@/components/heading";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader } from "@/components/loader";
import { UserAvatar } from "@/components/user-avatar";

//TODO - fix writing message css, put the assistant message in the correct place, make the AI model selectable, make the conversation available only to premium users

const ConversationPage = () => {
  const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([]);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [writtingMessage, setWrittingMessage] = useState("");
  const onSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");
    try {
      const userMessage: ChatCompletionRequestMessage = {
        role: "user",
        content: message,
      };
      const newMessages = [...messages, userMessage];

      // const response: any = await axios.post("/api/conversation", {
      //   messages: newMessages,
      // });
      const response = await fetch("/api/conversation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          newMessages,
        }),
      });
      console.log("response no try", response)
      if (!response.ok) throw new Error(response.statusText);

      const data = response.body;
      if (!data) {
        return;
      }
      const reader = data.getReader();
      const decoder = new TextDecoder();
      let done = false;
      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chuckValue = decoder.decode(value);
        setWrittingMessage((prev) => prev + chuckValue);
      }

      setMessages((current) => [
        ...current,
        userMessage,
        { role: "assistant", content: writtingMessage },
      ]);
    } catch (error: any) {
      console.log("catch in front");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Heading
        title="Conversation"
        description="Our text models"
        Icon={MessageSquare}
        iconColor="text-violet-500"
        bgColor="bg-violet-500/10"
      />
      <div className="px-4 lg:px-8">
        <div>
          <form
            onSubmit={onSubmit}
            className="border flex p-2 rounded-lg flex-col lg:flex-row"
          >
            <input
              type="text"
              className="flex-1 outline-none focus:outline-none mb-4 pl-2 lg:mb-0"
              value={message}
              placeholder="2 + 2 ?"
              onChange={(e) => setMessage(e.target.value)}
            />
            <Button type="submit">
              {isLoading ? (
                <div className="rounded-lg flex items-center justify-center">
                  <Loader />
                </div>
              ) : (
                "Ask!"
              )}
            </Button>
          </form>
        </div>
        <div className="space-y-4 mt-4">
          {/* {messages.length === 0 && !isLoading && (
            <Empty label="No conversation started." />
          )} */}
          <div className="flex flex-col-reverse gap-y-4">
            {messages.map((message) => (
              <div
                key={message.content}
                className={cn(
                  "p-8 w-full flex items-start gap-x-8 rounded-lg",
                  message.role === "user"
                    ? "bg-white border border-black/10"
                    : "bg-muted"
                )}
              >
                {message.role === "user" ? <UserAvatar /> : <BotAvatar />}
                <p className="text-sm">{message.content}</p>
              </div>
            ))}
            {writtingMessage}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversationPage;
