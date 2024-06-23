import React, { useState, useEffect } from 'react';
import useKegiatan from '@/hooks/pages/useKegiatan';
import { Kegiatan } from '@/types/kegiatan';
import DataTable, { TableColumn } from 'react-data-table-component';
import Link from 'next/link';
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import useColorMode from '@/hooks/useColorMode';


export default function KegiatanPage() {
    const { getAllKegiatan, deleteKegiatan } = useKegiatan();
    const [colorMode] = useColorMode();

    const [kegiatan, setKegiatan] = useState<Array<Kegiatan>>([]);

    const fetchKegiatan = async () => {
        const kegiatanData = await getAllKegiatan();
        setKegiatan(kegiatanData);
    };

    useEffect(() => {
        fetchKegiatan();
    }, []);

    const handleDelete = async (id: string) => {
        const MySwal = withReactContent(Swal);
        MySwal.fire({
            title: "Apakah Anda Yakin?",
            text: "Anda tidak akan dapat mengembalikan ini!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Ya, hapus!",
            cancelButtonText: "Tidak, batalkan!",
            reverseButtons: true
        }).then(async (result) => {
            if (result.isConfirmed) {
                await deleteKegiatan(id);
                MySwal.fire('Kegiatan Berhasil Dihapus!', '', 'success');
                fetchKegiatan(); 
            }
        }).catch((error) => {
            MySwal.fire('Terjadi Kesalahan!', '', 'error');
        });
    };

    const columns: TableColumn<Kegiatan>[] = [
        {
            name: 'Query ID',
            selector: (row: Kegiatan) => row.id,
            sortable: true,
        },
        {
            name: 'Judul',
            selector: (row: Kegiatan) => row.judul,
            sortable: true,
        },
        {
            name: 'Tanggal Diposting',
            selector: (row: Kegiatan) => new Intl.DateTimeFormat('id-ID', { dateStyle: 'full' }).format(new Date(row.tanggal)),
            sortable: true,
        },
        {
            name: 'Waktu Mulai',
            selector: (row: Kegiatan) => row.waktu_mulai,
            sortable: true,
        },
        {
            name: 'Aksi',
            cell: (row: Kegiatan) => 
            <div className="flex space-x-2">
                <Link className="bg-primary text-white py-1 px-1 rounded" href={`/kegiatan/${row.id}`} target="_blank">
                    <FaEye />
                </Link>
                <Link className="bg-blue-500 text-white py-1 px-1 rounded" href={`/administrator/kegiatan/edit/${row.id}`}>
                    <FaEdit />
                </Link>
                <button className="bg-danger text-white py-1 px-1 rounded" onClick={() => handleDelete(row.id)}>
                    <FaTrash />
                </button>
            </div>
        },
    ];
    
    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-3xl font-bold mb-4">Kegiatan</h1>
                <Link href="/administrator/kegiatan/tambah">
                    <button className="bg-primary text-white py-2 px-4 rounded">Tambah Kegiatan</button>
                </Link>
            </div>
            <DataTable
                columns={columns}
                data={kegiatan}
                pagination
                highlightOnHover
                theme={colorMode === 'dark' ? 'dark' : 'default'}
            />
        </div>
    )
}
