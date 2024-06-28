import React, { useState, useEffect } from 'react';
import useIntroduksi from '@/hooks/identity/useIntroduksi';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Introduksi } from '@/types/introduksi';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const IntroduksiPage = () => {
    const { getIntroduksi, updateIntroduksi } = useIntroduksi();
    const [gambar1, setGambar1] = useState<File | null>(null);
    const [gambar2, setGambar2] = useState<File | null>(null);
    const [submitted, setSubmitted] = useState<boolean>(false);
    
    const [formikValues, setFormikValues] = useState<any>({
        tagline: '',
        judul: '',
        konten: '',
        gambar1: null,
        gambar2: null,
        sorotan: [],
    });

    useEffect(() => {
        const fetchData = async () => {
          const data = await getIntroduksi();
          setFormikValues(data);
        }

        fetchData();
    }, []);


    const validationSchema = Yup.object({
        tagline: Yup.string().required('Tagline harus diisi'),
        judul: Yup.string().required('Judul harus diisi'),
        konten: Yup.string().required('Konten harus diisi'),
        gambar1: Yup.string().required('Gambar 1 harus diisi'),
        gambar2: Yup.string().required('Gambar 2 harus diisi'),
        sorotan: Yup.array().of(
            Yup.object().shape({
                judul: Yup.string().required('Judul harus diisi'),
                isi: Yup.string().required('Isi harus diisi'),
            })
        ),
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setFieldValue: any) => {
        const file = e.target.files?.[0];
        if (file) {
            setFieldValue(e.target.name, file);
            if (e.target.name === 'gambar1') {
                setGambar1(file);
            } else {
                setGambar2(file);
            }
        }
    }

    const onSubmit = (values: Introduksi) => {
        setSubmitted(true);
        const MySwal = withReactContent(Swal);
        MySwal.fire({
            title: 'Apakah Anda yakin?',
            text: 'Anda akan mengubah introduksi padukuhan',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya, Ubah!',
            cancelButtonText: 'Batal',
        }).then(async (result) => {
            if (result.isConfirmed) {
                const response = await updateIntroduksi({
                    tagline: values.tagline,
                    judul: values.judul,
                    konten: values.konten,
                    sorotan: values.sorotan,
                    gambar1: gambar1,
                    gambar2: gambar2,
                });
                setGambar1(null);
                setGambar2(null);
                if (response) {
                    MySwal.fire('Berhasil!', 'Introduksi padukuhan berhasil diubah', 'success');
                    setSubmitted(false);
                } else {
                    MySwal.fire('Gagal!', 'Introduksi padukuhan gagal diubah', 'error');
                    setSubmitted(false);
                }
            }else{
                setSubmitted(false);
            }
        });
    }
    
    return (
        <div className="grid">
            <h1 className="text-3xl font-bold mb-4">Introduksi Padukuhan</h1>
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
                                        Tagline
                                    </label>
                                    <Field
                                        type="text"
                                        name="tagline"
                                        placeholder="Masukkan tagline"
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    />
                                    <ErrorMessage name="tagline" component="div" className="text-danger font-bold text-sm mt-1" />
                                </div>     

                                <div className="mb-4.5">
                                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                        Judul
                                    </label>
                                    <Field
                                        type="text"
                                        name="judul"
                                        placeholder="Masukkan judul"
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    />
                                    <ErrorMessage name="judul" component="div" className="text-danger font-bold text-sm mt-1" />
                                </div>

                                <div className="mb-4.5">
                                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                        Konten
                                    </label>
                                    <Field
                                        as="textarea"
                                        name="konten"
                                        placeholder="Masukkan konten"
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    />
                                    <ErrorMessage name="konten" component="div" className="text-danger font-bold text-sm mt-1" />
                                </div>

                                <div className="mb-4.5">
                                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                        Gambar 1
                                    </label>
                                    <input 
                                        type="file" 
                                        name="gambar1" 
                                        onChange={(e) => handleFileChange(e, setFieldValue)}
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    />
                                    <ErrorMessage name="gambar1" component="div" className="text-danger font-bold text-sm mt-1" />
                                </div>

                                <div className="mb-4.5">
                                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                        Gambar 2
                                    </label>
                                    <input 
                                        type="file" 
                                        name="gambar2" 
                                        onChange={(e) => handleFileChange(e, setFieldValue)}
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    />
                                    <ErrorMessage name="gambar2" component="div" className="text-danger font-bold text-sm mt-1" />
                                </div>    

                                <div className="mb-4.5">
                                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                        Sorotan
                                    </label>
                                    {values.sorotan.map((_: any, index: number) => (
                                        <div key={index} className="mb-4.5">
                                            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                                Judul
                                            </label>
                                            <Field
                                                type="text"
                                                name={`sorotan.${index}.judul`}
                                                placeholder="Masukkan judul"
                                                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                            />
                                            <ErrorMessage name={`sorotan.${index}.judul`} component="div" className="text-danger font-bold text-sm mt-1" />
                                            
                                            <label className="mt-3 block text-sm font-medium text-black dark:text-white">
                                                Isi
                                            </label>
                                            <Field
                                                as="textarea"
                                                name={`sorotan.${index}.isi`}
                                                placeholder="Masukkan isi"
                                                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                            />
                                            <ErrorMessage name={`sorotan.${index}.isi`} component="div" className="text-danger font-bold text-sm mt-1" />
                                        </div>
                                    ))}
            
                                    <div className="flex row gap-4">
                                        <button
                                            type="button"
                                            onClick={() => setFieldValue('sorotan', [...values.sorotan, { judul: '', isi: '' }])}
                                            className="flex justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                                        >
                                            Tambah Sorotan
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => {
                                                if (values.sorotan.length > 1) {
                                                    setFieldValue('sorotan', values.sorotan.slice(0, -1));
                                                }
                                            }}
                                            className="flex justify-center rounded bg-danger p-3 font-medium text-gray hover:bg-opacity-90"
                                        >
                                            Hapus Sorotan
                                        </button>
                                    </div>
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


export default IntroduksiPage;