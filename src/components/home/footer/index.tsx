import Image from "next/image";
import useIdentity from "@/hooks/identity/fetch-identity";
import Link from "next/link";
import { Identity } from "@/types/identity";
import { useEffect, useState } from "react";

export default function Footer() {
  const { getIdentity } = useIdentity();
  const [identity, setIdentity] = useState<Identity>();

  useEffect(() => {
    getIdentity().then((data) => {
      setIdentity(data);
    });
  }, []);

  
  return (
    <section className="footer">
        <div className="footer-inner">
          <div className="container">
            <div className="row">
              <div className="col-lg-4">
                <div className="footer-widget-logo">
                  <a href="index-2.html"><Image src="/image/logo-light.png" className="img-fluid"
                      alt="img-25" width="200" height="50" /></a>
                </div>
                <div className="footer-widget-text">
                  <p>Padukuhan Ngasem adalah sebuah padukuhan yang terletak di Desa Tileng, Kecamatan Girisubo, Kabupaten Gunung Kidul, Daerah Istimewa Yogyakarta</p>
                </div>
                <div className="footer-widget-socials">
                  <Link href={identity?.twitter ?? ''} target="_blank"><i className="fa-brands fa-twitter"></i></Link>
                  <Link href={identity?.facebook ?? ''} target="_blank"><i className="fa-brands fa-facebook"></i></Link>
                  <Link href={identity?.instagram ?? ''} target="_blank"><i className="fa-brands fa-instagram"></i></Link>
                </div>
              </div>
              <div className="col-lg-3">
                <div className="footer-widget">
                  <div className="footer-widget-explore">
                    <h4 className="footer-widget-title">Jelahi Web</h4>
                    <ul className="list-unstyled">
                      <li><a href="/umkm">UMKM</a></li>
                      <li><a href="/organisasi">Susunan Organisasi</a></li>
                      <li><a href="/berita">Berita & Artikel</a></li>
                      <li><a href="/kegiatan">Acara & Kegiatan</a></li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-lg-2">
                <div className="footer-widget">
                  <div className="footer-widget-department">
                    <h4 className="footer-widget-title">Tentang Kami</h4>
                    <ul className="list-unstyled">
                      <li><a href="/profil">Profil Padukuhan</a></li>
                      <li><a href="/kontak">Kontak</a></li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-lg-3">
                <div className="footer-widget">
                  <div className="footer-widget-contact">
                    <h4 className="footer-widget-title">Contact</h4>
                    <p>Padukuhan Ngasem, Desa Tileng, Kecamatan Girisubo, Kabupaten Gunung Kidul, Daerah Istimewa Yogyakarta</p>
                  </div>
                  <div className="footer-widget-contact-list">
                    <i className="fa-solid fa-envelope"></i>
                    <div className="footer-widget-contact-item">
                      <Link href={`mailto:${identity?.email}`}>{identity?.email}</Link>
                    </div>
                  </div>
                  <div className="footer-widget-contact-list">
                    <i className="fa-solid fa-phone"></i>
                    <div className="footer-widget-contact-item">
                      <Link href={`tel:${identity?.nomor_telepon}`}>{identity?.nomor_telepon}</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bottom-footer">
          <div className="conatiner">
            <p>© Copyright {new Date().getFullYear()} by <a href="#">Padukuhan Ngasem</a></p>
          </div>
        </div>
    </section>
  );
}