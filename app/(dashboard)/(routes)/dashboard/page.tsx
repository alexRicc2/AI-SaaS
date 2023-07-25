"use client"

import { Card } from "@/components/ui/card";
import {useRouter} from 'next/navigation'
import {
  ArrowRight,
  Code,
  ImageIcon,
  MessageSquare,
  Music,
  VideoIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
export default function DashboardPage() {

  const router = useRouter()
  const tools = [
    {
      label: "Conversation",
      icon: MessageSquare,
      color: "text-violet-500",
      bgColor: "bg-violet-500/10",
      href: "/conversation",
    },
    {
      label: "Image Generator",
      icon: ImageIcon,
      href: "/image",
      color: "text-pink-700",
      bgColor: "bg-pink-700/10",
    },
    {
      label: "Video Generator",
      icon: VideoIcon,
      href: "/video",
      color: "text-green-400",
      bgColor: "bg-green-400/10",
    },
    {
      label: "Music Generator",
      icon: Music,
      href: "/music",
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
    },
    {
      label: "Code generator",
      icon: Code,
      href: "/code",
      color: "text-blue-400",
      bgColor: "bg-blue-400/10",
    },
  ];

  return (
    <div>
      <div className="mb-8 space-y-4">
        <h2 className="text-2xl md:text-4xl font-bold text-center">
          Explore the power of AI
        </h2>
        <p className="text-muted-foreground font-light text-sm md:text-lg text-center">
          dashboard Page
        </p>
      </div>
      <div className="px-4 md:px-20 lg:px-32 space-y-4">
        {tools.map((tool) => (
          <Card
            key={tool.href}
            className="p-4 border-black/5 flex items-center justify-between hover:shadow-md transition cursor-pointer"
            onClick={()=> router.push(tool.href)}
          >
            <div className="flex items-center gap-x-4">
              <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                <tool.icon className={cn("w-8 h-8", tool.color)}></tool.icon>
              </div>
              <div className="font-semibold">{tool.label}</div>
            </div>
            <ArrowRight className="w-5 h-5" />
          </Card>
        ))}
      </div>
    </div>
  );
}
