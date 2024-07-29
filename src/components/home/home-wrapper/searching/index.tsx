'use client';
import useBerita from "@/hooks/pages/useBerita";
import { Berita } from "@/types/berita";
import { useEffect, useState } from "react";
import dynamic from 'next/dynamic';


const Select = dynamic(() => import('react-select'), { ssr: false });

export default function Searching() {
  const { getAllBerita } = useBerita();

  interface BeritaOption {
    value: string;
    label: string;
  }
  
  const [berita, setBerita] = useState<BeritaOption[]>([]);

  useEffect(() => {
    const fetchBerita = async () => {
      try {
        const beritaData = await getAllBerita();
        setBerita(beritaData.map((item: Berita) => ({
          value: item.id,
          label: item.judul
        })));
      } catch (error) {
        console.error('Error fetching berita:', error);
      }
    };

    fetchBerita();
  }, []);


  return (
    <section className="searching-section">
      <div className="searching-search-section">
        <div className="container">
          <form className="searching-search-form" onSubmit={(e) => {
            e.preventDefault();
            const searchBerita = document.getElementById('search-berita') as HTMLInputElement;
            window.location.href = `/berita/${searchBerita.value}`;
          }}>
            <input type="hidden" name="search-berita" id="search-berita" />
            <Select
              options={berita}
              isSearchable={true}
              isClearable={true}
              isLoading={berita.length === 0}
              className="basic-single"
              classNamePrefix="select"
              placeholder="Cari Berita atau Artikel"
              onChange={(selectedOption) => {
                const selectedBerita = selectedOption as BeritaOption;
                document.getElementById('search-berita')?.setAttribute('value', selectedBerita?.value || '');
              }}
              />
            <button type="submit">Lihat</button>
          </form>
        </div>
      </div>
    </section>
  );
}