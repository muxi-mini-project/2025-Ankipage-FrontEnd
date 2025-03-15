import Search from "react:~assets/search.svg"

export default function SearchBar() {
  return (
    <div className="w-full bg-white p-2 font-noto-sc">
      <div className="relative mx-auto max-w-screen-xl">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="搜索标签"
          className="w-full rounded-full bg-gray-100 py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-gray-200"
        />
      </div>
    </div>
  )
}
