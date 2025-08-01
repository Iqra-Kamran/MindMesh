// components/CategoryDropdown.tsx
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

export default function CategoryDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Select Category</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Notes</DropdownMenuItem>
        <DropdownMenuItem>Bookmarks</DropdownMenuItem>
        <DropdownMenuItem>Documents</DropdownMenuItem>
        <DropdownMenuItem>Voice Notes</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
