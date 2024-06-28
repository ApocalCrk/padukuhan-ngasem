'use client';
import useBerita from "@/hooks/pages/useBerita";
import useDokumen from "@/hooks/pages/useDokumen";
import { Berita } from "@/types/berita";
import { Dokumen } from "@/types/dokumen";
import { formatContentWithBreaks } from "@/utils/sentencePeriod";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function EventBlog() {
    const { getRecentBerita } = useBerita();
    const { getDokumen } = useDokumen();

    const [berita, setBerita] = useState<Array<Berita> | null>(null);
    const [dokumen, setDokumen] = useState<Dokumen | null>(null);

    useEffect(() => {
        const fetchBerita = async () => {
            try {
                const beritaData = await getRecentBerita();
                setBerita(beritaData);
            } catch (error) {
                console.error('Error fetching berita:', error);
            }
        };

        const fetchDokumen = async () => {
            try {
                const dokumenData = await getDokumen();
                setDokumen(dokumenData);
            } catch (error) {
                console.error('Error fetching dokumen:', error);
            }
        }
        
        fetchBerita();
        fetchDokumen();
    }, []);
    return (
        <>
            <section className="cta-five-section">
                <div className="container">
                <div className="cta-five-card">
                    <div className="cta-five-card-icon">
                    <i className="flaticon-file"></i>
                    </div>
                    <div className="cta-five-content">
                    <h4>Unduh Dokumen {dokumen?.nama_dokumen}</h4>
                    <p>{dokumen?.deskripsi}</p>
                    </div>
                    <div className="cta-five-button">
                        <Link className="btn btn-primary" target="_blank" download href={dokumen?.file || ''}>Unduh</Link>
                    </div>
                    <div className="cta-five-img">
                    <i className="flaticon-file"></i>
                    </div>
                </div>
                </div>
            </section>
            <section className="blog-section">
                <div className="container">
                <div className="blog-box">
                    <div className="section-title-box text-center">
                    <div className="section-tagline">Berita dan Artikel Terbaru</div>
                    <h2 className="section-title">Lihat Berita dan Artikel Terbaru</h2>
                    </div>
                </div>
                <div className="row row-gutter-y-155">
                    {berita?.length === 0 && (
                        <div className="col-12 text-center flex items-center justify-center">
                            <h1>Belum ada berita atau artikel</h1>
                        </div>
                    )}
                    {berita?.map((item, index) => (
                        <div className="col-lg-4" key={index}>
                            <div className="blog-card">
                                <div className="blog-card-image">
                                    <img src={item.gambar} alt="blog" style={{width: '100%', height: '250px'}} />
                                    <Link href={`/berita/${item.id}`}></Link>
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
                                    <p dangerouslySetInnerHTML={{__html: formatContentWithBreaks(item.konten) || ''}} className='event-details-content'></p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                </div>
            </section>
            <section className="cta-two-section">
                <div className="container">
                <div className="cta-two-section-inner">
                    <div className="row">
                    <div className="col-xl-5">
                        <div className="cta-two-title">
                        <div className="cta-two-card-icon">
                            <i className="flaticon-envelope-2"></i>
                        </div>
                        <div className="cta-two-card-content">
                            <p>Tetap terhubung dengan kami</p>
                            <h3>Notifikasi dan berita terbaru</h3>
                        </div>
                        </div>
                    </div>
                    <div className="col-xl-7">
                        <form action=""
                        className="cta-two-form" method="post">
                        <div className="cta-two-form-group">
                            <input type="email" id="email" className="input-text" placeholder="Alamat Email"
                            name="email" required/>
                        </div>
                        <button className="btn btn-primary">Beri tahu saya</button>
                        </form>
                    </div>
                    </div>
                </div>
                </div>
            </section>
        </>
    );
}