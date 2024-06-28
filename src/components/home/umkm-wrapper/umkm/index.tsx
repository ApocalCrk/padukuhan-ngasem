'use client';
import { useState, useEffect } from 'react';
import { UMKM } from '@/types/umkm';
import useUmkm from '@/hooks/pages/useUmkm';
import Link from 'next/link';

export default function Umkm() {
    const { getAllUmkm } = useUmkm();

    const [umkm, setUmkm] = useState<UMKM[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getAllUmkm();
            setUmkm(data);
        }
        fetchData();
    }, []);
    
    return (
        <section className="service-one-section">
            <div className="container">
                <div className="row row-gutter-30">
                    {umkm.map((item, index) => (
                        <div className="col-xxl-4 col-xl-6" key={index}>
                            <div className="service-one-card">
                                <div className="service-one-icon">
                                    <i className="flaticon-coverage"></i>
                                </div>
                                <div className="service-one-card-content">
                                    <h3><a href="service-details.html">{item.nama_umkm}</a></h3>
                                    <p>Nama Pemilik UMKM <b>{item.pemilik_umkm}</b></p>
                                    <p>No Telepon <b>{item.no_telepon}</b></p>
                                    <div className="service-one-detail">
                                        <Link href={`https://wa.me/${item.no_telepon}?text=Halo%20saya%20ingin%20bertanya%20tentang%20produk%20anda`}><span>Hubungi UMKM</span><i className="fa-solid fa-arrow-right-long"></i></Link>
                                        <i className="flaticon-coverage"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}