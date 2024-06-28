import React, { useState, useEffect } from 'react';
import useGaleri from '@/hooks/identity/useGaleri';
import { Galeri } from '@/types/galeri';
import DataTable, { TableColumn } from 'react-data-table-component';
import { FaEdit, FaTrash } from "react-icons/fa";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import useColorMode from '@/hooks/useColorMode';


export default function GaleriPage() {
    const { getAllGaleri, addGaleri, getGaleri, updateGaleri, deleteGaleri } = useGaleri();
    const [addModal, setAddModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [gambar, setGambar] = useState<File | null>(null);
    const [data, setData] = useState<any>({ 
        id: '', 
        nama_tempat: '', 
        tempat: '', 
        gambar: ''
    });
    const [colorMode] = useColorMode();

    const [galeri, setGaleri] = useState<Array<Galeri>>([]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setGambar(e.target.files[0]);
        }
    }

    const fetchGaleri = async () => {
        const galeriData = await getAllGaleri();
        setGaleri(galeriData);
    };

    useEffect(() => {
        fetchGaleri();
    }, []);

    const clearData = () => {
        setGambar(null);
        setData({ 
            id: '', 
            nama_tempat: '', 
            tempat: '', 
            gambar: ''
        });
    }

    const handleAdd = async () => {
        if ( data.nama_tempat === '' || data.tempat === '' || gambar === null) {
            const MySwal = withReactContent(Swal);
            MySwal.fire('Data tidak boleh kosong!', '', 'error');
            return;
        }

        const added = await addGaleri({
            nama_tempat: data.nama_tempat,
            tempat: data.tempat,
            gambar: gambar
        });

        if (!added) {
            const MySwal = withReactContent(Swal);
            MySwal.fire('Galeri sudah terdaftar!', '', 'error');
            return;
        }

        const MySwal = withReactContent(Swal);
        MySwal.fire('Galeri Berhasil Ditambahkan!', '', 'success');

        setAddModal(false);
        clearData();
        fetchGaleri();
    }

    const handleModalUpdate = async (id: string) => {
        const galeriData = await getGaleri(id);
        setData(galeriData);
        setEditModal(true);
    }

    const handleUpdate = async (id: string) => {
        const MySwal = withReactContent(Swal);
        if (data.nama_tempat === '' || data.tempat === '') {
            MySwal.fire('Data tidak boleh kosong!', '', 'error');
            return;
        }
        MySwal.fire({
            title: "Apakah Anda Yakin?",
            text: "Anda tidak akan dapat mengembalikan ini!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Ya, update!",
            cancelButtonText: "Tidak, batalkan!",
            reverseButtons: true
        }).then(async (result) => {
            if (result.isConfirmed) {
                const updated = await updateGaleri(
                    id,
                    {
                        nama_tempat: data.nama_tempat,
                        tempat: data.tempat,
                        gambar: gambar
                    }
                );
                if (!updated) {
                    MySwal.fire('Galeri sudah terdaftar!', '', 'error');
                    return;
                }
                MySwal.fire('Galeri Berhasil Diupdate!', '', 'success');
                setEditModal(false);
                clearData();
                fetchGaleri(); 
            }
        }).catch((error) => {
            MySwal.fire('Terjadi Kesalahan!', '', 'error');
        });
    }

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
                const deleted = await deleteGaleri(id);
                if (!deleted) {
                    MySwal.fire('Tidak dapat menghapus galeri!', '', 'error');
                    return;
                }
                MySwal.fire('Galeri Berhasil Dihapus!', '', 'success');
                fetchGaleri(); 
            }
        }).catch((error) => {
            MySwal.fire('Terjadi Kesalahan!', '', 'error');
        });
    };

    const columns: TableColumn<Galeri>[] = [
        {
            name: 'No',
            selector: (row: Galeri, index?: number) => (index ?? 0) + 1,
            sortable: true,
        },
        {
            name: 'Nama Tempat',
            selector: (row: Galeri) => row.nama_tempat,
            sortable: true,
        },
        {
            name: 'Tempat',
            selector: (row: Galeri) => row.tempat,
            sortable: true,
        },
        {
            name: 'Gambar',
            cell: (row: Galeri) => (
                <img src={row.gambar} alt={row.nama_tempat} className="h-10 w-10 object-cover rounded-full" onClick={() => window.open(row.gambar, '_blank')} />
            )
        },
        {
            name: 'Aksi',
            cell: (row: Galeri) => 
            <div className="flex space-x-2">
                <button className="bg-blue-500 text-white py-1 px-1 rounded" onClick={() => handleModalUpdate(row.id)}>
                    <FaEdit />
                </button>
                <button className="bg-danger text-white py-1 px-1 rounded" onClick={() => handleDelete(row.id)}>
                    <FaTrash />
                </button>
            </div>
        },
    ];
    
    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-3xl font-bold mb-4">Galeri</h1>
                { galeri.length <= 8 &&
                    <button className="bg-primary text-white py-2 px-4 rounded" onClick={() => setAddModal(true)}>Tambah Galeri</button>
                }
            </div>
            <DataTable
                columns={columns}
                data={galeri}
                pagination
                highlightOnHover
                theme={colorMode === 'dark' ? 'dark' : 'default'}
            />
            {addModal ? (
            <>
                <div className="absolute inset-0 bg-black bg-opacity-50 z-50 top-0 left-0"></div>
                <div className="fixed inset-0 flex justify-center items-center z-50 ">
                    <div className="bg-white p-8 rounded-lg shadow-lg relative w-full max-w-md max-h-full">
                        <h1 className="text-2xl font-bold mb-4">Tambah Galeri</h1>
                        <form className="space-y-4" onSubmit={(e) => {
                            e.preventDefault();
                            handleAdd();
                        }}>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Nama Tempat</label>
                                <input type="text" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" placeholder="Nama Tempat" value={data.nama_tempat} onChange={(e) => setData({ ...data, nama_tempat: e.target.value })} />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Tempat</label>
                                <input type="text" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" placeholder="Tempat" value={data.tempat} onChange={(e) => setData({ ...data, tempat: e.target.value })} />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Gambar</label>
                                <input type="file" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" onChange={handleFileChange} />
                            </div>


                            <div className="flex justify-between">
                                <button type="button" className="bg-danger text-white py-2 px-4 rounded" onClick={() => {
                                    setAddModal(false);
                                    clearData();
                                }}>Batal</button>
                                <button type="submit" className="bg-primary text-white py-2 px-4 rounded">Tambah Galeri</button>
                            </div>
                        </form>
                    </div>
                </div>
            </>
            ) : null}

            {editModal ? (
            <>
                <div className="absolute inset-0 bg-black bg-opacity-50 z-50 top-0 left-0"></div>
                <div className="fixed inset-0 flex justify-center items-center z-50 ">
                    <div className="bg-white p-8 rounded-lg shadow-lg relative w-full max-w-md max-h-full">
                        <h1 className="text-2xl font-bold mb-4">Edit Galeri</h1>
                        <form className="space-y-4" onSubmit={(e) => {
                            e.preventDefault();
                            handleUpdate(data.id);
                        }}>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Nama Tempat</label>
                                <input type="text" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" placeholder="Nama Tempat" value={data.nama_tempat} onChange={(e) => setData({ ...data, nama_tempat: e.target.value })} />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Tempat</label>
                                <input type="text" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" placeholder="Tempat" value={data.tempat} onChange={(e) => setData({ ...data, tempat: e.target.value })} />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Gambar</label>
                                <input type="file" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" onChange={handleFileChange} />
                            </div>

                            <div className="flex justify-between">
                                <button type="button" className="bg-danger text-white py-2 px-4 rounded" onClick={() => {
                                    setEditModal(false);
                                    clearData();
                                }}>
                                    Batal
                                </button>
                                <button type="submit" className="bg-primary text-white py-2 px-4 rounded">Edit Galeri</button>
                            </div>
                        </form>
                    </div>
                </div>
            </>
            ) : null}
        </div>
    )
}
