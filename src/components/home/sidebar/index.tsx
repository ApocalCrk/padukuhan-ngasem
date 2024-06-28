'use client';
import Image from "next/image";
import { useState, useEffect } from 'react';
import useIdentity from "@/hooks/identity/fetch-identity";
import Link from "next/link";
import { Identity } from "@/types/identity";

export default function Sidebar({ isExpanded, handleToggle } : { isExpanded: boolean, handleToggle: () => void }) {
  const { getIdentity } = useIdentity();
  const [identity, setIdentity] = useState<Identity>();

  useEffect(() => {
    getIdentity().then((data) => {
      setIdentity(data);
    });
  }, []);
  
  return (
    <div className={`mobile-nav-wrapper ${isExpanded ? 'expanded' : ''}`}>
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
            <Link href={`tel:${identity?.nomor_telepon}`}>{identity?.nomor_telepon}</Link>
          </li>
          <li>
            <i className="fa-solid fa-envelope"></i>
            <Link href={`mailto:${identity?.email}`}>{identity?.email}</Link>
          </li>
          <li>
            <i className="fa-solid fa-map-marker-alt"></i>
            <span>{identity?.alamat}</span>
          </li>
        </ul>
      </div>
    </div>
  );
}