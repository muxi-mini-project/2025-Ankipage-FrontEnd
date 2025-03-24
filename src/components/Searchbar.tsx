import { forwardRef } from "react"
import Search from "react:~assets/search.svg"

const SearchBar = forwardRef<HTMLInputElement, { className?: string }>(
  ({ className = "" }, ref) => {
    return (
      <div className={`w-full bg-transparent p-2 font-noto-sc ${className}`}>
        <div className="relative mx-auto max-w-screen-xl">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            ref={ref}
            type="text"
            placeholder="搜索标签"
            className="w-full rounded-full bg-gray-100 py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-gray-200"
          />
        </div>
      </div>
    )
  }
)

SearchBar.displayName = "SearchBar"

export default SearchBar
