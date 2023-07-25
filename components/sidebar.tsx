"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import {usePathname} from 'next/navigation'
import { Montserrat } from "next/font/google";
import {
  LayoutDashboard,
  MessageSquare,
  ImageIcon,
  VideoIcon,
  Music, Code, Settings
} from "lucide-react";
import { cn } from "@/lib/utils";

const routes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
    color: "text-sky-400",
  },
  {
    label: "Conversation",
    icon: MessageSquare,
    href: "/conversation",
    color: "text-violet-500",
  },
  {
    label: "Image Generator",
    icon: ImageIcon,
    href: "/image",
    color: "text-pink-700",
  },
  {
    label: "Video Generator",
    icon: VideoIcon,
    href: "/video",
    color: "text-green-400",
  },
  {
    label: "Music Generator",
    icon: Music,
    href: '/music',
    color: "text-orange-500"
  },
  {
    label: "Code generator",
    icon: Code,
    href: '/code',
    color: "text-blue-400"
  }   ,
  {
    label: "Settings",
    icon: Settings,
    href: '/settings',
    color: "text-gray-400"
  }   
];

const montserrat = Montserrat({ weight: "600", subsets: ["latin"] });

function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white">
      <div className="px-3 py-2 flex-1">
        <Link href="/dashboard" className="flex items-center pl-3 mb-14">
          <div className="relative w-8 h-8 mr-4">
            <Image fill alt="logo" src="/logo.png" />
          </div>
          <h1 className={cn("text-2xl font-bold", montserrat.className)}>
            AI Alex
          </h1>
        </Link>
        <div className="space-y-1">
          {routes.map((route) => {
            return (
              <Link
                href={route.href}
                key={route.href}
                className={cn("text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition", pathname === route.href ? "text-white bg-white/10" : "text-zinc-400")}
              >
                <div className="flex items-center flex-1">
                  <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                  {route.label}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
