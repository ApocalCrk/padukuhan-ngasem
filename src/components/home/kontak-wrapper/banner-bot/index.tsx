'use client';
import Link from "next/link";
import { useIdentity } from "@/hooks/identity/fetch-identity";
import { Identity } from "@/types/identity";

export default function BannerBot() {
    const identity: Identity | null = useIdentity();

    return (
        <div className="cta-four-section">
            <div className="container">
                <div className="cta-four-inner">
                    <div className="row">
                        <div className="col-12 col-lg-6 col-xl-3">
                            <div className="cta-four-content">
                                <i className="flaticon-help"></i>
                                <div className="cta-four-content-box">
                                    <span>Hubungi Kami</span>
                                    <p>{identity?.nomor_telepon}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 col-lg-6 col-xl-4">
                            <div className="cta-four-content">
                                <i className="flaticon-envelope-3"></i>
                                <div className="cta-four-content-box">
                                    <span>Kirim Email</span>
                                    <p>{identity?.email}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-lg-6 col-xl-4">
                            <div className="cta-four-content">
                                <i className="flaticon-location-pin"></i>
                                <div className="cta-four-content-box">
                                    <span>Alamat</span>
                                    <p>{identity?.alamat}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-lg-6 col-xl-1">
                            <div className="cta-four-content">
                                <div className="cta-four-widget-socials">
                                    <Link href={identity?.twitter ?? ''} target="_blank"><i className="fa-brands fa-twitter"></i></Link>
                                    <Link href={identity?.facebook ?? ''} target="_blank"><i className="fa-brands fa-facebook"></i></Link>
                                    <Link href={identity?.instagram ?? ''} target="_blank"><i className="fa-brands fa-instagram"></i></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}