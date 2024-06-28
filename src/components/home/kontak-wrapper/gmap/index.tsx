'use client';
import React, { useEffect, useState } from 'react';
import useIdentity from '@/hooks/identity/fetch-identity';
import { Identity } from '@/types/identity';

export default function Gmap() {
    const { getIdentity } = useIdentity();
    const [identity, setIdentity] = useState<Identity>();

    useEffect(() => {
        getIdentity().then((data) => {
        setIdentity(data);
        });
    }, []);

    return (
        <div className="contact-gmap-section">
            <div className="container">
                <div className="responsive-map">
                    <iframe src={identity?.gmaps} width="600" height="450" style={{ border:0 }} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen></iframe>
                </div>
            </div>
        </div>
    );
}