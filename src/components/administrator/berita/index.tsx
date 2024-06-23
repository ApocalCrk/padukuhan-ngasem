import React, { useState, useEffect } from 'react';
import useBerita from '@/hooks/pages/useBerita';
import { Berita } from '@/types/berita';
import DataTable, { TableColumn } from 'react-data-table-component';
import Link from 'next/link';
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import useColorMode from '@/hooks/useColorMode';


export default function BeritaPage() {
    const { getAllBerita, deleteBerita } = useBerita();
    const [colorMode] = useColorMode();

    const [berita, setBerita] = useState<Array<Berita>>([]);

    const fetchBerita = async () => {
        const beritaData = await getAllBerita();
        setBerita(beritaData);
    };

    useEffect(() => {
        fetchBerita();
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
                await deleteBerita(id);
                MySwal.fire('Berita Berhasil Dihapus!', '', 'success');
                fetchBerita(); 
            }
        }).catch((error) => {
            MySwal.fire('Terjadi Kesalahan!', '', 'error');
        });
    };

    const columns: TableColumn<Berita>[] = [
        {
            name: 'Query ID',
            selector: (row: Berita) => row.id,
            sortable: true,
        },
        {
            name: 'Judul',
            selector: (row: Berita) => row.judul,
            sortable: true,
        },
        {
            name: 'Tanggal Diposting',
            selector: (row: Berita) => new Intl.DateTimeFormat('id-ID', { dateStyle: 'full' }).format(new Date(row.tanggal_post)),
            sortable: true,
        },
        {
            name: 'Aksi',
            cell: (row: Berita) => 
            <div className="flex space-x-2">
                <Link className="bg-primary text-white py-1 px-1 rounded" href={`/berita/${row.id}`} target="_blank">
                    <FaEye />
                </Link>
                <Link className="bg-blue-500 text-white py-1 px-1 rounded" href={`/administrator/berita/edit/${row.id}`}>
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
                <h1 className="text-3xl font-bold mb-4">Berita</h1>
                <Link href="/administrator/berita/tambah">
                    <button className="bg-primary text-white py-2 px-4 rounded">Tambah Berita</button>
                </Link>
            </div>
            <DataTable
                columns={columns}
                data={berita}
                pagination
                highlightOnHover
                theme={colorMode === 'dark' ? 'dark' : 'default'}
            />
        </div>
    )
}
