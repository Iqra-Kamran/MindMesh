"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Button } from "../ui/button";
import Image from "next/image";
import mindmeshLogo from "@/public/puzzle club (1).png";
import { useAuthModalStore } from "@/lib/store/authModalStore";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { useState } from "react";
import { Upload } from "lucide-react";
import { useUploadModalStore } from "@/lib/store/uploadModalStore";

export default function Header() {
  const { data: session, status } = useSession();
  const {openModal} = useAuthModalStore();
  const [open, setOpen] = useState(false);
  const openUploadModal = useUploadModalStore((state) => state.open);

  console.log("Session status:", status); // Check loading state
  console.log("Session data:", session); // Check what's in the session

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="w-full flex h-16 items-center justify-between px-3">
        {/* Left: Logo and site name */}
        <Link href="/" className="flex items-center space-x-2 font-bold mr-4">
          <Image src={mindmeshLogo} alt="MindMesh Logo" width={40} height={40} />
          <span>MindMesh</span>
        </Link>

        {/* Center: Welcome message */}
       {session?.user && (
          <div className="flex items-center gap-4">
            <span className="text-purple-100 ">
              Welcome, {session.user.name?.toUpperCase()}
            </span>
          </div>
        )}

        {/* Right: Navigation buttons */}
        <nav className="flex items-center space-x-4">
          {status === "loading" ? (
            <div className="h-8 w-20 animate-pulse rounded-md bg-gray-200" />
          ) : session ? (
            <>
                
             <Button
              onClick={openUploadModal}
              variant="secondary"
              className="ml-2 flex items-center gap-1"
            >
              <Upload className="w-4 h-4" />
              Upload
            </Button>
              {/* Sign Out with Confirmation Popover */}
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button variant="outline">Sign Out</Button>
                </PopoverTrigger>
                <PopoverContent className="w-60 bg-gradient-to-r from-black to-purple-900">
                  <div className="text-sm text-white-800 mb-3">
                    Are you sure you want to sign out?
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button variant="ghost" size="sm" onClick={() => setOpen(false)} >
                      Cancel
                    </Button>
                    <Button
                    
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setOpen(false);
                        signOut({ redirect: false });
                      }}
                    >
                      Yes, Sign Out
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            </>
          ) : (
            <Button variant="outline" onClick={openModal}>
              Sign In
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
}
