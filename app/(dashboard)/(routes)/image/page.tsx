"use client";

import React from "react";
import Heading from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Image } from "lucide-react";
import { useState } from "react";
import { Loader } from "@/components/loader";
function ImagePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [prompt, setPrompt] = useState("");

  const onSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch("/api/image", {
        method: "POST",
        headers: { "Content-Type": "application-json" },
        body: JSON.stringify({prompt})
      });
      if(response.ok){
        const body = await response.json()
        console.log('response', body)
      }
    } catch (error) {
      console.log(error);
    }finally{
      setIsLoading(false)
    }
  };

  return (
    <div>
      <Heading
        title="Image generator"
        description="generate anything you have in mind"
        Icon={Image}
        iconColor="text-pink-700"
        bgColor="bg-pink-700/10"
      />
      <div className="px-4 lg:px-8">
        <div>
          <form onSubmit={onSubmit} className="border flex p-2 rounded-lg flex-col lg:flex-row">
            <input
              type="text"
              className="flex-1 outline-none focus:outline-none mb-4 pl-2 lg:mb-0"
              value={prompt}
              placeholder="space dog"
              onChange={(e) => setPrompt(e.target.value)}
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
      </div>
    </div>
  );
}

export default ImagePage;
