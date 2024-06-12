import MainSlider from '@/components/home-wrapper/slider';
import Portfolio from '@/components/home-wrapper/portfolio';
import ProfileLead from '@/components/home-wrapper/profile-lead';
import Department from '@/components/home-wrapper/department';
import About from '@/components/home-wrapper/about';
import Service from '@/components/home-wrapper/service';
import EventBlog from '@/components/home-wrapper/doc';
import Funcfact from '@/components/home-wrapper/funfact';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Padukuhan Ngasem | Eksplorasi Padukuhan Ngasem",
  description: "Padukuhan Ngasem adalah sebuah padukuhan yang terletak di Desa Tileng, Kecamatan Girisubo, Kabupaten Gunung Kidul, Daerah Istimewa Yogyakarta",
};

export default function Home() {
  return (
      <div className="page-wrapper">
        <MainSlider />
        <Department />
        <About />
        <Service />
        <Funcfact />
        <ProfileLead />
        <Portfolio />
        <EventBlog />
      </div>      
    )
}
