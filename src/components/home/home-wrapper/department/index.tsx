'use client';
import useBerita from "@/hooks/pages/useBerita";
import { Berita } from "@/types/berita";
import { useEffect, useState } from "react";
import dynamic from 'next/dynamic';


const Select = dynamic(() => import('react-select'), { ssr: false });

export default function Department() {
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
    <section className="department-section">
      <div className="container">
        <div className="department-section-inner">
          <div className="row row-gutter-y-40">
            <div className="col-xl-2 col-lg-4 col-md-6">
              <div className="department-card">
                <div className="department-card-icon">
                  <a href="departments.html"><i className="flaticon-farmer"></i></a>
                </div>
                <div className="department-card-content">
                  <h5><a href="department-details.html">Pertanian & Perkebunan</a></h5>
                </div>
              </div>
            </div>
            <div className="col-xl-2 col-lg-4 col-md-6">
              <div className="department-card">
                <div className="department-card-icon">
                  <a href="departments.html"><i className="flaticon-briefcase"></i></a>
                </div>
                <div className="department-card-content">
                  <h5><a href="department-details.html">Pekerjaan & Karir</a></h5>
                </div>
              </div>
            </div>
            <div className="col-xl-2 col-lg-4 col-md-6">
              <div className="department-card">
                <div className="department-card-icon">
                  <a href="departments.html"><i className="flaticon-lake"></i></a>
                </div>
                <div className="department-card-content">
                  <h5><a href="department-details.html">UMKM & Pariwisata</a></h5>
                </div>
              </div>
            </div>
            <div className="col-xl-2 col-lg-4 col-md-6">
              <div className="department-card">
                <div className="department-card-icon">
                  <a href="departments.html"><i className="flaticon-transportation"></i></a>
                </div>
                <div className="department-card-content">
                  <h5><a href="department-details.html">Akses Jalan & Transportasi</a></h5>
                </div>
              </div>
            </div>
            <div className="col-xl-2 col-lg-4 col-md-6">
              <div className="department-card">
                <div className="department-card-icon">
                  <a href="departments.html"><i className="flaticon-agriculture"></i></a>
                </div>
                <div className="department-card-content">
                  <h5><a href="department-details.html">Budaya & Rekreasi</a></h5>
                </div>
              </div>
            </div>
            <div className="col-xl-2 col-lg-4 col-md-6">
              <div className="department-card">
                <div className="department-card-icon">
                  <a href="departments.html"><i className="flaticon-clinic"></i></a>
                </div>
                <div className="department-card-content">
                  <h5><a href="department-details.html">Kesehatan & Kesejahteraan</a></h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="department-search-section">
        <div className="container">
          <form className="department-search-form" onSubmit={(e) => {
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