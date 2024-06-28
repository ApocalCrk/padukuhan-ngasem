'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import SearchBar from '../search-bar';
import useIdentity from '@/hooks/identity/fetch-identity';
import { Identity } from '@/types/identity';

interface HeaderProps {
  handleToggle: () => void;
}

export default function Header({ handleToggle }: HeaderProps) {
  const { getIdentity } = useIdentity();
  const [scrolled, setScrolled] = useState(false);
  const [searchBar, setSearchBar] = useState(false);
  const [active, setActive] = useState('/');
  const [identity, setIdentity] = useState<Identity>();

  useEffect(() => {
    getIdentity().then((data) => {
      setIdentity(data);
    });
  }, []);

  const onChangePage = (page: string) => {
    setActive(page);
  }

  const searchToggle = () => {
    setSearchBar(!searchBar);
    document.body.classList.toggle('locked');
  }

  return (
    <>
      <header className="header">
        <div className="topbar">
          <div className="topbar-inner">
            <div className="topbar-left">
              <div className="topbar-socials">
                <Link href={identity?.twitter ?? ''} target="_blank"><i className="fa-brands fa-twitter"></i></Link>
                <Link href={identity?.facebook ?? ''} target="_blank"><i className="fa-brands fa-facebook"></i></Link>
                <Link href={identity?.instagram ?? ''} target="_blank"><i className="fa-brands fa-instagram"></i></Link>
              </div>
              <div className="topbar-info">
                <ul>
                  <li>
                    <div className="topbar-icon">
                      <i className="fa-solid fa-envelope"></i>
                    </div>
                    <div className="topbar-text">
                      <a href={`mailto:${identity?.email}`}>{identity?.email}</a>
                    </div>
                  </li>
                  <li>
                    <div className="topbar-icon">
                      <i className="fa-solid fa-clock"></i>
                    </div>
                    <div className="topbar-text">
                      <span>Jam Kerja: {identity?.jam_kerja}</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="topbar-right">
              <ul>
                <li><Link href="/profil">Profil Padukuhan</Link></li>
                <li><Link href="/umkm">UMKM</Link></li>
                <li><Link href="/kontak">Kontak</Link></li>
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
                  <li className={active === '/' ? 'active' : ''}>
                    <Link href="/" onClick={() => onChangePage('/')}>Beranda</Link>
                  </li>
                  <li className={active === '/profil' ? 'active' : ''}>
                    <Link href="/profil" onClick={() => onChangePage('/profil')}>Profil Padukuhan</Link>
                  </li>
                  <li className={active == '/umkm' ? 'active' : ''}>
                    <Link href="/umkm" onClick={() => onChangePage('/umkm')}>UMKM</Link>
                  </li>
                  <li className={active === '/kegiatan' ? 'active' : ''}>
                    <Link href="/kegiatan" onClick={() => onChangePage('/kegiatan')}>Acara & Kegiatan</Link>
                  </li>
                  <li className={active === '/berita' ? 'active' : ''}>
                    <Link href="/berita" onClick={() => onChangePage('/berita')}>Berita & Artikel</Link>
                  </li>
                  <li className={active === '/kontak' ? 'active' : ''}>
                    <Link href="/kontak" onClick={() => onChangePage('/kontak')}>Kontak</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="main-menu-right">
              <div className="mobile-menu-button mobile-nav-toggler" onClick={handleToggle}>
                <span></span>
                <span></span>
                <span></span>
              </div>
              {/* <div className="search-box">
                <a href="#" className="search-toggler" onClick={() => searchToggle()}>
                  <i className="flaticon-search-interface-symbol"></i>
                </a>
              </div> */}
              <div className="main-menu-right-button">
                <Link href="/kontak" className="btn btn-primary">Laporkan Masalah</Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* <SearchBar show={searchBar} setShown={searchToggle} /> */}
    </>
  );
}
