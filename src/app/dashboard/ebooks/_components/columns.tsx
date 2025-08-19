'use client'

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"

export type Ebook = {
  id: number
  title: string
  category: string
  price: string
  rate: number
  createdAt: string
}

export const columns: ColumnDef<Ebook>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Titre
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "category",
    header: "Catégorie",
  },
  {
    accessorKey: "price",
    header: "Prix",
  },
  {
    accessorKey: "rate",
    header: "Note",
  },
  {
    accessorKey: "createdAt",
    header: "Date de création",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const ebook = row.original
      const router = useRouter()

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Ouvrir le menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => router.push(`/dashboard/ebooks/${ebook.id}`)}>
              Voir les détails
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push(`/dashboard/ebooks/edit/${ebook.id}`)}>
              Modifier
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
] 