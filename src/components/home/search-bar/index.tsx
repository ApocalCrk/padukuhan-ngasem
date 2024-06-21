export default function SearchBar({show, setShown} : {show:boolean, setShown: () => void}) {
    return (
      <div className={`search-popup ${show ? 'active' : ''}`}>
      <div className="search-popup-overlay search-toggler" onClick={() => setShown()}></div>
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
  );
}