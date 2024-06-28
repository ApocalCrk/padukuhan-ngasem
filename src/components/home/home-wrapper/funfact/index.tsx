'use client';
import useIdentity from "@/hooks/identity/fetch-identity";
import { Identity } from "@/types/identity";
import { useEffect, useState } from "react";

export default function Funcfact() {
    const { getIdentity } = useIdentity();
    const [identity, setIdentity] = useState<Identity>();

    useEffect(() => {
        getIdentity().then((data) => {
            setIdentity(data);
        });
    }, []);
    return (
      <section className="funfact-section">
        <div className="container">
          <div className="row">
            <div className="col-xl-3 col-md-6">
              <div className="funfact-counter-item">
                <div className="funfact-counter-box">
                  <div className="funfact-counter-icon">
                    <i className="flaticon-running-man"></i>
                  </div>
                  <div className="funfact-counter-number">
                    <h3 className="counter-number">{new Intl.NumberFormat('id-ID').format(identity?.detail_dukuh.total_penduduk || 0)}</h3>
                  </div>
                </div>
                <p className="funfact-text">Total Penduduk <br/> {identity?.nama}</p>
              </div>
            </div>
            <div className="col-xl-3 col-md-6">
              <div className="funfact-counter-item">
                <div className="funfact-counter-box">
                  <div className="funfact-counter-icon">
                    <i className="flaticon-coverage"></i>
                  </div>
                  <div className="funfact-counter-number">
                    <h3 className="counter-number">{new Intl.NumberFormat('id-ID').format(identity?.detail_dukuh.luas_area || 0)}</h3>
                  </div>
                </div>
                <p className="funfact-text">Total Luas Wilayah (Ha) <br/> {identity?.nama}</p>
              </div>
            </div>
            <div className="col-xl-3 col-md-6">
              <div className="funfact-counter-item">
                <div className="funfact-counter-box">
                  <div className="funfact-counter-icon">
                    <i className="flaticon-landscape"></i>
                  </div>
                  <div className="funfact-counter-number">
                    <h3 className="counter-number">{new Intl.NumberFormat('id-ID').format(identity?.detail_dukuh.total_rt || 0)}</h3>
                  </div>
                </div>
                <p className="funfact-text">Total RT <br/> {identity?.nama}</p>
              </div>
            </div>
            <div className="col-xl-3 col-md-6">
              <div className="funfact-counter-item">
                <div className="funfact-counter-box">
                  <div className="funfact-counter-icon">
                    <i className="flaticon-barn-3"></i>
                  </div>
                  <div className="funfact-counter-number">
                    <h3 className="counter-number">{new Intl.NumberFormat('id-ID').format(identity?.detail_dukuh.total_umkm || 0)}</h3>
                  </div>
                </div>
                <p className="funfact-text">Total UMKM <br/> {identity?.nama}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
}