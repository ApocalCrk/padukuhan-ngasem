'use client';
import React, { useEffect, useState } from 'react';
import { getKegiatan } from '@/hooks/pages/fetch-kegiatan';
import { Kegiatan } from '@/types/kegiatan';

export default function DetailKegiatan({id} : {id: string}) {
    const kegiatan: Kegiatan | null = getKegiatan(id);
    return (
        <section className="event-details-section">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="event-details-inner-box">
                            <img src="/image/event/event-details-1.1.jpg" className="img-fluid" alt="img-173" />
                            <div className="event-details-meta">
                                <div className="event-details-meta-number">
                                    <span>{new Intl.DateTimeFormat('id-ID', { day: '2-digit' }).format(new Date(kegiatan?.tanggal || new Date()))}</span>
                                </div>
                                <div className="event-details-meta-date">
                                    <span>{new Intl.DateTimeFormat('id-ID', { month: 'long', year: 'numeric' }).format(new Date(kegiatan?.tanggal || new Date()))}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-8">
                        <div className="event-details-content-box">
                            <h4>{kegiatan?.judul}</h4>
                            <p>
                                {kegiatan?.konten}
                            </p>
                            { kegiatan?.has_tamu ? (
                                <>
                                    <h3 className="event-details-title">Tamu Yang Diundang</h3>
                                    <div className="event-details-speaker-box">
                                        <div className="row row-gutter-30">
                                            {kegiatan?.tamu.map((tamu, index) => (
                                                <div className="col-xl-3 col-md-6" key={index}>
                                                    <div className="event-speaker-list">
                                                        <h5>{tamu.nama}</h5>
                                                        <p>{tamu.posisi}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </>
                            ) : null }
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="sidebar">
                            <div className="sidebar-widget-event-meta-box">
                                <div className="sidebar-widget-event-meta-details">
                                    <div className="sidebar-widget-event-box">
                                        <h6>Waktu Mulai:</h6>
                                        <p>{kegiatan?.waktu_mulai}</p>
                                    </div>
                                    <div className="sidebar-widget-event-box">
                                        <h6>Tanggal:</h6>
                                        <p>{kegiatan?.tanggal}</p>
                                    </div>
                                    <div className="sidebar-widget-event-box">
                                        <h6>Lokasi:</h6>
                                        <p>{kegiatan?.lokasi}</p>
                                    </div>
                                </div>
                                <div className="sidebar-widget-event-meta-socials">
                                    <a href="#"><i className="fa-brands fa-twitter"></i></a>
                                    <a href="#"><i className="fa-brands fa-facebook"></i></a>
                                    <a href="#"><i className="fa-brands fa-pinterest-p"></i></a>
                                    <a href="#"><i className="fa-brands fa-instagram"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}