export const Header = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <nav className="bg-slate-1 rounded-full">
        <div className="bg-slate-1 rounded-full p-1 flex relative items-center shadow-lg">
          <a href="/" className="px-4 py-2 text-sm font-medium text-slate-12 hover:text-accent transition-colors">
            Home
          </a>
        </div>
      </nav>
    </div>
  )
}
