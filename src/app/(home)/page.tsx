import MainSlider from '@/components/home/home-wrapper/slider';
import Galeri from '@/components/home/home-wrapper/galeri';
import Tentang from '@/components/home/home-wrapper/about';
import Berita from '@/components/home/home-wrapper/berita';
import InformasiPadukuhan from '@/components/home/home-wrapper/info';

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
        <Tentang />
        <InformasiPadukuhan />
        <Galeri />
        <Berita />
      </div>      
    )
}
