import MainSlider from '@/components/home/home-wrapper/slider';
import Portfolio from '@/components/home/home-wrapper/portfolio';
import Department from '@/components/home/home-wrapper/department';
import About from '@/components/home/home-wrapper/about';
import EventBlog from '@/components/home/home-wrapper/doc';
import Funcfact from '@/components/home/home-wrapper/funfact';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Padukuhan Ngasem | Eksplorasi Padukuhan Ngasem",
  description: "Padukuhan Ngasem adalah sebuah padukuhan yang terletak di Desa Tileng, Kecamatan Girisubo, Kabupaten Gunung Kidul, Daerah Istimewa Yogyakarta",
  keywords: ["Padukuhan Ngasem", "Yogyakarta", "Girisubo"]
};

export default function Home() {
  return (
      <div className="page-wrapper">
        <MainSlider />
        <Department />
        <About />
        <Funcfact />
        <Portfolio />
        <EventBlog />
      </div>      
    )
}
