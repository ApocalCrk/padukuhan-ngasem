import { useState, useEffect } from 'react';
import { collection, getDocs, where, query } from 'firebase/firestore';
import { db } from '@/utils/firebase';
import { Dashboard } from '@/types/dashboard';

function count_total_berita() {
    return new Promise<number>((resolve, reject) => {
        getDocs(collection(db, 'berita')).then((snapshot) => {
            resolve(snapshot.size);
        }).catch((error) => {
            reject(error);
        });
    });
}

function count_total_kegiatan() {
    return new Promise<number>((resolve, reject) => {
        getDocs(collection(db, 'kegiatan')).then((snapshot) => {
            resolve(snapshot.size);
        }).catch((error) => {
            reject(error);
        });
    });
}

function count_total_admin() {
    return new Promise<number>((resolve, reject) => {
        getDocs(collection(db, 'users')).then((snapshot) => {
            resolve(snapshot.size);
        }).catch((error) => {
            reject(error);
        });
    });
}

function count_web_response() {
    // web response in milliseconds (ms) from the server
    return new Promise<number>((resolve, reject) => {
        const start = Date.now();
        fetch('/').then(() => {
            resolve(Date.now() - start);
        }).catch((error) => {
            reject(error);
        });
    });
}

export default function useDashboard() {
    const [dashboard, setDashboard] = useState<Dashboard | null>(null);

    useEffect(() => {
        Promise.all([
            count_total_berita(),
            count_total_kegiatan(),
            count_total_admin(),
            count_web_response()
        ]).then((values) => {
            setDashboard({
                total_post: values[0],
                total_kegiatan: values[1],
                total_admin: values[2],
                web_response: values[3]
            });
        }).catch((error) => {
            console.error(error);
        });
    }, []);

    return dashboard;
}