'use client';
import React, { useEffect, useState } from 'react';
import useBerita from '@/hooks/pages/useBerita';
import { Berita } from '@/types/berita';
import Sidebar from './sidebar';

export default function DetailBerita({id} : {id: string}) {
    const { getBerita } = useBerita();
    const [berita, setBerita] = useState<Berita | null>(null);
    
    useEffect(() => {
        const fetchBerita = async () => {
            try {
                const beritaData = await getBerita(id);
                setBerita(beritaData);
            } catch (error) {
                console.error('Error fetching berita:', error);
            }
        };
    
        fetchBerita();
    }, [id]);

    return (
        <section className="news-details-section">
            <div className="container">
                <div className="row">
                    <div className="col-lg-8">
                        <div className="news-details-box-image">
                            <div className="news-details-box-image-inner">
                                <img src={berita?.gambar} alt="news-details" className="img-fluid" />
                                <a className="news-details-box-date">{
                                    new Intl.DateTimeFormat('id-ID', { day: '2-digit', month: "short" }).format(new Date(berita?.tanggal_post || new Date()))
                                }</a>
                            </div>
                        </div>
                        <div className="news-details-meta-box">
                            <div className="news-details-meta-box-inner">
                                <span className="me-2">
                                    <i className="fa fa-user"></i>&nbsp;
                                    Di Posting Oleh {berita?.user_post}
                                </span>
                                <span>
                                    <i className="fa fa-calendar"></i>&nbsp;
                                    Di Posting Pada {new Intl.DateTimeFormat('id-ID', { day: '2-digit', month: "long", year: 'numeric' }).format(new Date(berita?.tanggal_post || new Date()))}
                                </span>
                            </div>
                        </div>
                        <div className="news-details-content-box">
                            <h4>{berita?.judul}</h4>
                            <p dangerouslySetInnerHTML={{__html: berita?.konten || ''}} className='news-details-content'></p>
                        </div>
                        <div className="news-details-share-box">
                            <div className="news-details-inner">
                                <div className="news-details-list">
                                    <div className="news-details-list-title">
                                        <h4>Share</h4>
                                    </div>
                                </div>
                                <div className="news-details-list">
                                    <div className="news-details-socials">
                                        <a href="" onClick={() => window.open(`https://twitter.com/intent/tweet?text=${window.location.href}`)
                                        }><i className="fa-brands fa-twitter"></i></a>
                                        <a href="#" onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`)}><i className="fa-brands fa-facebook"></i></a>
                                        <a href="#" onClick={() => window.open(`https://wa.me/?text=${window.location.href}`)
                                        }><i className="fa-brands fa-whatsapp"></i></a>
                                        <a onClick={() => navigator.clipboard.writeText(window.location.href)} href="#"><i className="fa fa-share"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <Sidebar />
                    </div>
                </div>
            </div>
        </section>
    );
}