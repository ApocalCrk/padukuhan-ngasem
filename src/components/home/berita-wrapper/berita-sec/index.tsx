'use client';
import React, { useEffect, useState } from 'react';
import { Berita } from '@/types/berita';
import useBerita from '@/hooks/pages/useBerita';
import Link from 'next/link';
import { formatContentWithBreaks } from '../../../../utils/sentencePeriod';

export default function BeritaSec() {
    const { getAllBerita } = useBerita();
    const [berita, setBerita] = useState<Array<Berita> | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    
    useEffect(() => {
        const fetchBerita = async () => {
            try {
                const beritaData = await getAllBerita();
                setBerita(beritaData);
            } catch (error) {
                console.error('Error fetching berita:', error);
            }
        };
    
        fetchBerita();
    }, []);
    
    if (!berita) {
        return <section className="berita-section berita-section-two"></section>;
    }
    
    const itemsPerPage = 6;

    if (!berita) {
        return <section className="berita-section berita-section-two"></section>;
    }

    const totalPages = Math.ceil(berita.length/ itemsPerPage);
    const displayedBerita = berita.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    return (
        <section className="berita-section berita-section-two">
            <div className="container">
                <div className="row row-gutter-y-155">
                    {berita.length === 0 && (
                        <div className="col-12 text-center flex items-center justify-center">
                            <h1 className="section-title">Belum ada berita atau artikel</h1>
                        </div>
                    )}
                    {displayedBerita?.map((item, index) => (
                        <div className="col-lg-6 col-xl-4" key={index}>
                            <div className="berita-card">
                                <div className="berita-card-image">
                                    <img src={item.gambar} alt="berita" style={{width: '100%', height: '250px'}} />
                                    <Link href={`/berita/${item.id}`}></Link>
                                </div>
                                <div className="berita-card-date">
                                    <Link href={`/berita/${item.id}`}>{new Intl.DateTimeFormat('id-ID', { day: '2-digit', month: "short", year: '2-digit' }).format(new Date(item.tanggal_post))}</Link>
                                </div>
                                <div className="berita-card-content">
                                    <div className="berita-card-meta">
                                        <span>
                                            <i className="fa fa-user"></i>&nbsp;
                                            Di Posting Oleh {item.user_post}
                                        </span>
                                    </div>
                                    <h4><Link href={`/berita/${item.id}`}>{item.judul}</Link></h4>
                                    <p dangerouslySetInnerHTML={{__html: formatContentWithBreaks(item.konten) || ''}} className='event-details-content'></p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="berita-pagination-outer">
                            <div className="berita-pagination">
                            {currentPage > 1 && (
                                <a className="prev page-numbers" href="#" onClick={() => handlePageChange(currentPage - 1)}>
                                    <b><i className="fa-solid fa-chevron-left"></i></b>
                                </a>
                            )}
                            {[...Array(totalPages)].map((_, pageIndex) => (
                                <a
                                    key={pageIndex}
                                    className={`page-numbers ${currentPage === pageIndex + 1 ? 'current' : ''}`}
                                    href="#"
                                    onClick={() => handlePageChange(pageIndex + 1)}
                                >
                                    <b>{pageIndex + 1}</b>
                                </a>
                            ))}
                            {currentPage < totalPages && (
                                <a className="next page-numbers" href="#" onClick={() => handlePageChange(currentPage + 1)}>
                                    <b><i className="fa-solid fa-chevron-right"></i></b>
                                </a>
                            )}
                            </div>
                        </div>
                    </div>    
                </div>
            </div>
        </section>
    );
}
