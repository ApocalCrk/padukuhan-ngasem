import Image from "next/image";

export default function Sidebar({ isExpanded, handleToggle } : { isExpanded: boolean, handleToggle: () => void }) {
    return <div className={`mobile-nav-wrapper ${isExpanded ? 'expanded' : ''}`}>
    <div className="mobile-nav-overlay mobile-nav-toggler"></div>
    <div className="mobile-nav-content">
      <a href="#" className="mobile-nav-close mobile-nav-toggler" onClick={handleToggle}>
        <span></span>
        <span></span>
      </a>
      <div className="logo-box">
        <a href="/"><Image src="/image/logo-light.png" alt="img-145" width="200" height={50} /></a>
      </div>
      <div className="mobile-nav-container"></div>
      <ul className="mobile-nav-contact list-unstyled position-absolute bottom-0">
        <li>
          <i className="fa-solid fa-phone"></i>
          <a href="tel:+8898006802">+62 812-3456-7890</a>
        </li>
        <li>
          <i className="fa-solid fa-envelope"></i>
          <a href="mailto:needhelp@company.com">padukuhan.ngasem1@gmail.com</a>
        </li>
        <li>
          <i className="fa-solid fa-map-marker-alt"></i>
          <span>Padukuhan Ngasem, Desa Tileng, Kecamatan Girisubo</span>
        </li>
      </ul>
    </div>
  </div>
}