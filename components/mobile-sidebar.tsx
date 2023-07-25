"use client";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
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
        <Button className="md:hidden" variant="ghost" size="icon">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0">
        <Sidebar/>
      </SheetContent>
    </Sheet>
  );
}

export default Mobilesidebar;
