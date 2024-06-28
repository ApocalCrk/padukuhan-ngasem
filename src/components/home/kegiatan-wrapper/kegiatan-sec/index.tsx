'use client';
import React, { useEffect, useState } from 'react';
import useKegiatan from '@/hooks/pages/useKegiatan';
import Link from 'next/link';
import { Kegiatan } from '@/types/kegiatan';

export default function KegiatanSec() {
    const { getAllKegiatan } = useKegiatan();
    const [kegiatan, setKegiatan] = useState<Array<Kegiatan> | null>(null);

    useEffect(() => {
        const fetchKegiatan = async () => {
            const data = await getAllKegiatan();
            setKegiatan(data);
        }

        fetchKegiatan();
    }, []);

    
    return (
        <section className="event-three-section">
            <div className="event-section-outer">
                <div className="container">
                    <div className="row row-gutter-y-30">
                        { kegiatan === null ? (
                            <div className="col-12">
                                <p>Loading...</p>
                            </div>
                        ) : kegiatan.length === 0 ? (
                            <div className="col-12 text-center h-[20vh] flex items-center justify-center" style={{minHeight: '20vh'}}>
                                <h1 className="section-title">Belum ada acara atau kegiatan</h1>
                            </div>
                        ) : kegiatan?.map((kegiatan, index) => (
                            <div className="col-12 col-lg-6 col-xl-6" key={index}>
                                <div className="event-card">
                                    <div className="event-card-image">
                                        <div className="event-card-image-inner">
                                            <Link href={`/kegiatan/${kegiatan.id}`}>
                                                <img src={kegiatan.gambar} alt="event" style={{width: '250px', height: '250px'}} />
                                            </Link>		
                                            <div className="event-card-meta">
                                                <div className="event-meta-number">
                                                    <span>{new Intl.DateTimeFormat('id-ID', { day: '2-digit' }).format(new Date(kegiatan.tanggal))}</span>
                                                </div>
                                                <div className="event-meta-date">
                                                    <span>{new Intl.DateTimeFormat('id-ID', { month: 'long', year: 'numeric' }).format(new Date(kegiatan.tanggal))}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="event-card-content">
                                        <div className="event-card-info">
                                            <ul className="list-unstyled">
                                                <li>
                                                    <i className="fa-solid fa-clock"></i>
                                                    <span>{kegiatan.waktu_mulai}</span>
                                                </li>
                                                <li>
                                                    <i className="fa-sharp fa-solid fa-location-pin"></i>
                                                    <span>{kegiatan.lokasi}</span>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="event-card-title">
                                            <h4><Link href={`/kegiatan/${kegiatan.id}`}>{kegiatan.judul}</Link></h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}