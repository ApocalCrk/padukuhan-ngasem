'use client';
import useIdentity from "@/hooks/identity/fetch-identity";
import { Identity } from "@/types/identity";
import { useEffect, useState } from "react";

export default function Info() {
    const { getIdentity } = useIdentity();
    const [identity, setIdentity] = useState<Identity>();

    useEffect(() => {
        getIdentity().then((data) => {
            setIdentity(data);
        });
    }, []);
    return (
      <section className="info-section">
        <div className="container">
          <div className="row">
            <div className="col-xl-3 col-md-6">
              <div className="info-counter-item">
                <div className="info-counter-box">
                  <div className="info-counter-number">
                    <h3 className="counter-number">{new Intl.NumberFormat('id-ID').format(identity?.detail_dukuh.total_penduduk || 0)}</h3>
                  </div>
                </div>
                <p className="info-text">Total Penduduk <br/> {identity?.nama}</p>
              </div>
            </div>
            <div className="col-xl-3 col-md-6">
              <div className="info-counter-item">
                <div className="info-counter-box">
                  <div className="info-counter-number">
                    <h3 className="counter-number">{new Intl.NumberFormat('id-ID').format(identity?.detail_dukuh.luas_area || 0)}</h3>
                  </div>
                </div>
                <p className="info-text">Total Luas Wilayah (Ha) <br/> {identity?.nama}</p>
              </div>
            </div>
            <div className="col-xl-3 col-md-6">
              <div className="info-counter-item">
                <div className="info-counter-box">
                  <div className="info-counter-number">
                    <h3 className="counter-number">{new Intl.NumberFormat('id-ID').format(identity?.detail_dukuh.total_rt || 0)}</h3>
                  </div>
                </div>
                <p className="info-text">Total RT <br/> {identity?.nama}</p>
              </div>
            </div>
            <div className="col-xl-3 col-md-6">
              <div className="info-counter-item">
                <div className="info-counter-box">
                  <div className="info-counter-number">
                    <h3 className="counter-number">{new Intl.NumberFormat('id-ID').format(identity?.detail_dukuh.total_umkm || 0)}</h3>
                  </div>
                </div>
                <p className="info-text">Total UMKM <br/> {identity?.nama}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
}