import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Profil | Eksplorasi Padukuhan Ngasem",
    description: "Padukuhan Ngasem adalah sebuah padukuhan yang terletak di Desa Tileng, Kecamatan Girisubo, Kabupaten Gunung Kidul, Daerah Istimewa Yogyakarta",
};

export default function Profil() {
  return (
    <div>
      <h1>Profil</h1>
      <p>Ini adalah halaman profil</p>
    </div>
  );
}