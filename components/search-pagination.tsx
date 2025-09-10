"use client"

import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SearchPaginationProps {
  currentPage: number
  totalPages: number
  query: string
  cuisine: string
}

export function SearchPagination({ currentPage, totalPages, query, cuisine }: SearchPaginationProps) {
  const createPageUrl = (page: number) => {
    const params = new URLSearchParams()
    if (query.trim()) params.set("q", query.trim())
    if (cuisine && cuisine !== "All Cuisines") params.set("cuisine", cuisine)
    params.set("page", page.toString())
    return `/search?${params.toString()}`
  }

  const getVisiblePages = () => {
    const delta = 2
    const range = []
    const rangeWithDots = []

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i)
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, "...")
    } else {
      rangeWithDots.push(1)
    }

    rangeWithDots.push(...range)

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push("...", totalPages)
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages)
    }

    return rangeWithDots
  }

  if (totalPages <= 1) return null

  const visiblePages = getVisiblePages()

  return (
    <div className="flex items-center justify-center space-x-2">
      {/* Previous Button */}
      <Button variant="outline" size="sm" asChild={currentPage > 1} disabled={currentPage <= 1}>
        {currentPage > 1 ? (
          <Link href={createPageUrl(currentPage - 1)}>
            <ChevronLeft className="h-4 w-4 mr-1" />
            Previous
          </Link>
        ) : (
          <>
            <ChevronLeft className="h-4 w-4 mr-1" />
            Previous
          </>
        )}
      </Button>

      {/* Page Numbers */}
      <div className="flex items-center space-x-1">
        {visiblePages.map((page, index) => {
          if (page === "...") {
            return (
              <span key={`dots-${index}`} className="px-2 py-1 text-muted-foreground">
                ...
              </span>
            )
          }

          const pageNum = page as number
          const isCurrentPage = pageNum === currentPage

          return (
            <Button
              key={pageNum}
              variant={isCurrentPage ? "default" : "outline"}
              size="sm"
              asChild={!isCurrentPage}
              disabled={isCurrentPage}
            >
              {isCurrentPage ? pageNum : <Link href={createPageUrl(pageNum)}>{pageNum}</Link>}
            </Button>
          )
        })}
      </div>

      {/* Next Button */}
      <Button variant="outline" size="sm" asChild={currentPage < totalPages} disabled={currentPage >= totalPages}>
        {currentPage < totalPages ? (
          <Link href={createPageUrl(currentPage + 1)}>
            Next
            <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        ) : (
          <>
            Next
            <ChevronRight className="h-4 w-4 ml-1" />
          </>
        )}
      </Button>
    </div>
  )
}
