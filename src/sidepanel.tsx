import "./style.css"

import SearchBar from "~components/Searchbar"

const SidePanel = () => {
  return (
    <div>
      <AnkiList></AnkiList>
    </div>
  )
}

export default SidePanel

const AnkiList = () => {
  return (
    <div>
      <SearchBar></SearchBar>
      <h1>Hello, World!</h1>
    </div>
  )
}
