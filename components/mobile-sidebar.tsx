"use client";
import React, { useEffect, useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Menu } from "lucide-react";
import Sidebar from "./sidebar";

function Mobilesidebar() {

  const [ isMounted, setIsMounted] = useState(false)
  useEffect(()=>{
    setIsMounted(true)
  },[])

  if(!isMounted){
    return null
  }

  return (
    <Sheet>
      <SheetTrigger>
        <div className="md:hidden">
          <Menu />
        </div>
      </SheetTrigger>
      <SheetContent side="left" className="p-0">
        <Sidebar/>
      </SheetContent>
    </Sheet>
  );
}

export default Mobilesidebar;
