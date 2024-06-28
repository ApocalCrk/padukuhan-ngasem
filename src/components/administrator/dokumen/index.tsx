import React, { useState, useEffect } from 'react';
import useDokumen from '@/hooks/pages/useDokumen';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Dokumen } from '@/types/dokumen';

const DokumenPage = () => {
    const { getDokumen, updateDokumen } = useDokumen();
    const [submitted, setSubmitted] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [formikValues, setFormikValues] = useState<any>({
        nama_dokumen: '',
        deskripsi: '',
        file: ''
    });

    useEffect(() => {
        const fetchData = async () => {
          const data = await getDokumen();
          setFormikValues(data);
        }

        fetchData();
    }, []);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setFieldValue: any) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
            setFieldValue('file', e.target.files[0]);
        }
    }

    const validationSchema = Yup.object({
        nama_dokumen: Yup.string().required('Nama dokumen wajib diisi'),
        deskripsi: Yup.string().required('Deskripsi wajib diisi')
    });

    const onSubmit = (values: any) => {
        setSubmitted(true);
        const MySwal = withReactContent(Swal);
        MySwal.fire({
            title: 'Apakah Anda yakin?',
            text: 'Anda akan mengubah dokumen padukuhan',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya, Ubah!',
            cancelButtonText: 'Batal',
        }).then(async (result) => {
            if (result.isConfirmed) {
                const response = await updateDokumen({
                    nama_dokumen: values.nama_dokumen,
                    deskripsi: values.deskripsi,
                    file: file
                });
                setFile(null);
                if (response) {
                    MySwal.fire('Berhasil!', 'Dokumen padukuhan berhasil diubah', 'success');
                    setSubmitted(false);
                } else {
                    MySwal.fire('Gagal!', 'Dokumen padukuhan gagal diubah', 'error');
                    setSubmitted(false);
                }
            }else{
                setSubmitted(false);
            }
        });
    }
    
    return (
        <div className="grid">
            <h1 className="text-3xl font-bold mb-4">Dokumen Padukuhan</h1>
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <Formik
                    enableReinitialize
                    initialValues={formikValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                >
                    {({ setFieldValue, values }) => (
                        <Form>
                            <div className="p-6.5">
                                <div className="mb-4.5">
                                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                        Nama Dokumen
                                    </label>
                                    <Field
                                        type="text"
                                        name="nama_dokumen"
                                        placeholder="Masukkan Nama Dokumen"
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    />
                                    <ErrorMessage name="nama_dokumen" component="div" className="text-danger font-bold text-sm mt-1" />
                                </div>      

                                <div className="mb-4.5">
                                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                        Deskripsi
                                    </label>
                                    <Field
                                        as="textarea"
                                        name="deskripsi"
                                        placeholder="Masukkan Deskripsi"
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    />
                                    <ErrorMessage name="deskripsi" component="div" className="text-danger font-bold text-sm mt-1" />
                                </div>  

                                <div className="mb-4.5">
                                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                        File Dokumen
                                    </label>
                                    <input
                                        type="file"
                                        name="file"
                                        onChange={(e) => handleFileChange(e, setFieldValue)}
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    />
                                </div>                   

                                <button type="submit" className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90" disabled={submitted}>
                                    {submitted ? 'Menyimpan...' : 'Simpan'}
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}


export default DokumenPage;