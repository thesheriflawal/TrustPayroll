import { Home } from 'lucide-react'

export const Header = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <nav className="rounded-full">
        <div className="rounded-full p-1 flex relative items-center shadow-md bg-[color:var(--card)] text-[color:var(--card-foreground)]">
          <a href="/" className="flex items-center gap-2 px-4 py-2 text-sm font-medium hover:text-[color:var(--primary)] transition-colors cursor-pointer">
            <Home size={16} aria-hidden />
            <span>Home</span>
          </a>
        </div>
      </nav>
    </div>
  )
}
