import React from 'react';
import { Berita } from '@/types/berita';
import { getRecentBerita } from '@/hooks/pages/fetch-berita';
import Link from 'next/link';

export default function Sidebar() {
    const berita : Array<Berita> | null = getRecentBerita();
    return (
        <div className="sidebar">
            <div className="sidebar-widget sidebar-widget-recent-post">
                <h4>Berita Terbaru</h4>
                {berita?.map((item, index) => (
                    <div className={`sidebar-recent-post ${index != berita.length - 1 ? 'mb-4' : ''}`} key={index}>
                        <div className="sidebar-recent-post-img">
                            <img src="/image/blog/blog-details-2.jpg" alt="img-197" />
                        </div>
                        <div className="sidebar-recent-post-content">
                            <div className="sidebar-meta">
                                <div className="sidebar-meta-item">
                                    <div className="sidebar-meta-icon">
                                        <span>
                                            Di Posting Oleh {item.user_post}
                                        </span>
                                    </div>
                                </div>
                                <div className="sidebar-post-title">
                                    <h5><Link href={`/berita/${item.id}`}>{item.judul}</Link></h5>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}