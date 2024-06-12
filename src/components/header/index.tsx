import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return <header className="header">
    <div className="topbar">
      <div className="topbar-inner">
        <div className="topbar-left">
          <div className="topbar-socials">
            <a href="#"><i className="fa-brands fa-twitter"></i></a>
            <a href="#"><i className="fa-brands fa-facebook"></i></a>
            <a href="#"><i className="fa-brands fa-pinterest-p"></i></a>
            <a href="#"><i className="fa-brands fa-instagram"></i></a>
          </div>
          <div className="topbar-info">
            <ul>
              <li>
                <div className="topbar-icon">
                  <i className="fa-solid fa-envelope"></i>
                </div>
                <div className="topbar-text">
                  <a href="mailto:padukuhan.ngasem1@gmail.com">padukuhan.ngasem1@gmail.com</a>
                </div>
              </li>
              <li>
                <div className="topbar-icon">
                  <i className="fa-solid fa-clock"></i>
                </div>
                <div className="topbar-text">
                  <span>Jam Kerja: Senin - Jum'at 08.00 WIB - 16.00 WIB</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="topbar-right">
          <ul>
            <li><a href="about.html">Tentang</a></li>
            <li><a href="departments.html">Susunan Organisasi</a></li>
            <li><a href="contact.html">Kontak</a></li>
          </ul>
        </div>
      </div>
    </div>
    <div className={`main-menu sticky-header ${scrolled ? 'sticky-fixed sticky-header--cloned' : ''}`}>
      <div className="main-menu-inner">
        <div className="main-menu-left">
          <div className="main-menu-logo">
            <a href="/"><Image src="/image/logo-ngasem.png" alt="img-145" width="200" height={50} /></a>
          </div>
          <div className="navigation">
            <ul className="main-menu-list list-unstyled">
              <li className="active">
                <a href="/">Beranda</a>
              </li>
              <li>
                <a href="#">Profil Padukuhan</a>
              </li>
              <li>
                <a href="#">Pelayanan Online</a>
              </li>
              <li>
                <a href="#">Acara & Kegiatan</a>
              </li>
              <li>
                <a href="#">Berita & Artikel</a>
              </li>
              <li>
                <a href="contact.html">Kontak</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="main-menu-right">
          <div className="mobile-menu-button mobile-nav-toggler">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className="search-box">
            <a href="#" className="search-toggler">
              <i className="flaticon-search-interface-symbol"></i>
            </a>
          </div>
          <div className="main-menu-right-button">
            <a href="contact.html" className="btn btn-primary">Laporkan Masalah</a>
          </div>
        </div>
      </div>
    </div>
  </header>
}