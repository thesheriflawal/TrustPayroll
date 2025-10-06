export const Header = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <nav className="rounded-full">
        <div className="rounded-full p-1 flex relative items-center shadow-lg bg-[#04203E] text-white">
          <a href="/" className="px-4 py-2 text-sm font-medium hover:text-[#27A74A] transition-colors cursor-pointer">
            Home
          </a>
        </div>
      </nav>
    </div>
  )
}
