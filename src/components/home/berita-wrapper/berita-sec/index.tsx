'use client';
import React, { useEffect, useState } from 'react';
import { Berita } from '@/types/berita';
import useBerita from '@/hooks/pages/useBerita';
import Link from 'next/link';
import { formatContentWithBreaks } from '../../../../utils/sentencePeriod';

export default function BeritaSec() {
    const { getAllBerita } = useBerita();
    const [berita, setBerita] = useState<Array<Berita> | null>(null);
    
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
        return <section className="blog-section blog-section-two"></section>;
    }
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    if (!berita) {
        return <section className="blog-section blog-section-two"></section>;
    }

    const totalPages = Math.ceil(berita.length/ itemsPerPage);
    const displayedBerita = berita.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    return (
        <section className="blog-section blog-section-two">
            <div className="container">
                <div className="row row-gutter-y-155">
                    {displayedBerita?.map((item, index) => (
                        <div className="col-lg-6 col-xl-4" key={index}>
                            <div className="blog-card">
                                <div className="blog-card-image">
                                    <img src="/image/blog/blog-1.jpg" className="img-fluid" alt="img-184"/>
                                    <Link href={`/berita/${item.id}`}>
                                        <i className="fa fa-link"></i>
                                    </Link>
                                </div>
                                <div className="blog-card-date">
                                    <Link href={`/berita/${item.id}`}>{new Intl.DateTimeFormat('id-ID', { day: '2-digit', month: "short", year: '2-digit' }).format(new Date(item.tanggal_post))}</Link>
                                </div>
                                <div className="blog-card-content">
                                    <div className="blog-card-meta">
                                        <span>
                                            <i className="fa fa-user"></i>&nbsp;
                                            Di Posting Oleh {item.user_post}
                                        </span>
                                    </div>
                                    <h4><Link href={`/berita/${item.id}`}>{item.judul}</Link></h4>
                                    <p>
                                        {formatContentWithBreaks(item.konten)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="blog-pagination-outer">
                            <div className="blog-pagination">
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
