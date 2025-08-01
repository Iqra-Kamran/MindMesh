import { Home, FileText, Bookmark, Settings } from "lucide-react"
import { Button } from "./ui/button"

export function Sidebar() {
  return (
    <div className="hidden md:flex flex-col w-64 border-r p-4">
      <div className="space-y-1">
        <Button variant="ghost" className="w-full justify-start">
          <Home className="h-4 w-4 mr-2" />
          Home
        </Button>
        <Button variant="ghost" className="w-full justify-start">
          <FileText className="h-4 w-4 mr-2" />
          Notes
        </Button>
        <Button variant="ghost" className="w-full justify-start">
          <Bookmark className="h-4 w-4 mr-2" />
          Bookmarks
        </Button>
      </div>
      <div className="mt-auto space-y-1">
        <Button variant="ghost" className="w-full justify-start">
          <Settings className="h-4 w-4 mr-2" />
          Settings
        </Button>
      </div>
    </div>
  )
}