export default function SearchBar() {
    return <div className="search-popup">
    <div className="search-popup-overlay search-toggler"></div>
    <div className="search-popup-content">
      <form action="#">
        <label htmlFor="search" className="sr-only">search here</label>
        <input type="text" id="search" placeholder="Search Here..."/>
        <button type="submit" aria-label="search submit" className="search-btn">
          <span><i className="flaticon-search-interface-symbol"></i></span>
        </button>
      </form>
    </div>
  </div>
}