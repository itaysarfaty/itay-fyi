export const Navbar = () => {
  return (
    <nav className="flex gap-4 items-center @lg:gap-5">
      <h1 className=" bg-blue  font-semibold pointer-events-none">itay</h1>
      <span className="opacity-50 pointer-events-none">/</span>
      <a href="https://www.linkedin.com/in/itaysarfaty/">linkedin</a>
      <span className="opacity-50 pointer-events-none">/</span>
      <a href="https://github.com/itaysarfaty">github</a>
    </nav>
  )
}
