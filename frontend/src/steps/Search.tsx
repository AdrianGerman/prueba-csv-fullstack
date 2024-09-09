import { useEffect, useState } from "react"
import { Data } from "../types"

export const Search = ({ initialData }: { initialData: Data }) => {
  const [data, setData] = useState<Data>(initialData)
  const [search, setSeatch] = useState<string>("")

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSeatch(event.target.value)
  }

  useEffect(() => {
    const newPathname =
      search === "" ? window.location.pathname : `?q=${search}`

    window.history.pushState({}, "", newPathname)
  }, [search])

  return (
    <div>
      <h1>Search</h1>
      <form>
        <input
          onChange={handleSearch}
          type="search"
          placeholder="Buscar información..."
        />
      </form>
    </div>
  )
}
