'use client'

import { Command } from "cmdk"
import { Search } from "lucide-react"
import { useEffect, useState } from "react"
import { Button } from "./ui/button"

export function CommandMenu() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  return (
    <>
      <Button
        variant="outline"
        onClick={() => setOpen(true)}
        className="flex items-center gap-2"
      >
        <Search className="h-4 w-4" />
        <span>Search...</span>
        <kbd className="ml-8 text-xs bg-muted px-2 py-1 rounded">⌘K</kbd>
      </Button>

      <Command.Dialog open={open} onOpenChange={setOpen}>
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        <div className="fixed top-1/4 left-1/2 -translate-x-1/2 w-[600px] max-w-[95vw] bg-background border rounded-lg shadow-lg overflow-hidden">
          <Command.Input 
            placeholder="Search or create..."
            className="w-full p-4 border-b bg-transparent outline-none"
          />
          <Command.List className="p-2 max-h-[300px] overflow-auto">
            <Command.Empty>No results found.</Command.Empty>
            
            <Command.Group heading="Actions">
              <Command.Item className="p-2 rounded text-sm cursor-pointer hover:bg-accent">
                New Note
              </Command.Item>
              <Command.Item className="p-2 rounded text-sm cursor-pointer hover:bg-accent">
                New Task
              </Command.Item>
            </Command.Group>
          </Command.List>
        </div>
      </Command.Dialog>
    </>
  )
}