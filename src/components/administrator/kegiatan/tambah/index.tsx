import { useState } from 'react';
import { slugify } from '@/utils/slugify';
import 'react-quill/dist/quill.snow.css';
import dynamic from 'next/dynamic';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import useKegiatan from '@/hooks/pages/useKegiatan';
import { Formik, Field, Form as FormikForm, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const Form = () => {
  const { addKegiatan, uniqueTitle } = useKegiatan();
  const [image, setImage] = useState<File | null>(null);

  const initialValues = {
    image: null,
    title: '',
    content: '',
    has_tamu: false,
    lokasi: '',
    tanggal: '',
    waktu_mulai: '',
    waktu_selesai: '',
    tamu: [],
  };
  const fileSizeValidation = (value: any) => {
    if (value && value.size > 1 * 1024 * 1024) {
        return false;
    }
    return true;
  };
  const validationSchema = Yup.object({
    title: Yup.string()
      .required('Judul kegiatan diperlukan')
      .min(5, 'Judul kegiatan minimal 5 karakter')
      .max(50, 'Judul kegiatan maksimal 50 karakter')
      .test('unique', 'Judul kegiatan sudah ada', async (value) => {
        if (value) {
          return await uniqueTitle(value);
        }
        return true;
      }),
    content: Yup.string()
      .required('Konten kegiatan diperlukan')
      .min(20, 'Konten kegiatan minimal 20 karakter'),
    image: Yup.mixed().required('Gambar kegiatan diperlukan').test('fileSize', 'Ukuran gambar maksimal 1 MB', fileSizeValidation),
    has_tamu: Yup.boolean().required('Kegiatan ini memiliki tamu undangan?'),
    lokasi: Yup.string().required('Lokasi kegiatan diperlukan'),
    tanggal: Yup.string().required('Tanggal kegiatan diperlukan'),
    waktu_mulai: Yup.string().required('Waktu mulai kegiatan diperlukan'),
    waktu_selesai: Yup.string().required('Waktu selesai kegiatan diperlukan'),
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setFieldValue: any) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
      setFieldValue('image', e.target.files[0]);
    }
  };

  const handleSubmit = async (values: any) => {
    if (image) {
      const success = await addKegiatan({
        image,
        title: values.title,
        content: values.content,
        has_tamu: values.has_tamu ? values.tamu.length === 0 ? false : true : false,
        lokasi: values.lokasi,
        tanggal: values.tanggal,
        waktu_mulai: values.waktu_mulai+' sampai '+values.waktu_selesai,
        tamu: values.has_tamu ? values.tamu.length === 0 ? [] : values.tamu : [],
      });

      const MySwal = withReactContent(Swal);
      if (success) {
        MySwal.fire('Kegiatan Berhasil Ditambahkan!', '', 'success').then(() => {
          window.location.href = '/administrator/kegiatan';
        });
      } else {
        MySwal.fire('Terjadi Kesalahan!', '', 'error');
      }
    }
  };

  return (
    <>
      <h1 className="text-2xl font-semibold text-gray-900 mb-2">Tambah Kegiatan</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue }) => (
          <FormikForm className="space-y-6 p-6 bg-white rounded shadow-md">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">Judul Kegiatan *</label>
              <Field
                type="text"
                name="title"
                id="title"
                placeholder='Masukkan judul kegiatan'
                className="mt-1 w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
              <ErrorMessage name="title" component="div" className="text-danger font-bold text-sm mt-1" />
            </div>
            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700">Konten / Isi Kegiatan *</label>
              <div className='h-80'>
                <Field name="content">
                  {({ field }: { field: any }) => (
                    <ReactQuill
                      value={field.value}
                      onChange={(value) => field.onChange({ target: { name: field.name, value } })}
                      theme="snow"
                      modules={{
                        toolbar: [
                          [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
                          [{size: []}],
                          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                          [{'list': 'ordered'}, {'list': 'bullet'}, 
                          {'indent': '-1'}, {'indent': '+1'}],
                          ['link', 'image', 'video'],
                          ['clean']
                        ],
                      }}
                      className="mt-1 block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm md:h-[80%] sm:h-60 h-60"
                    />
                  )}
                </Field>
              </div>
              <ErrorMessage name="content" component="div" className="text-danger font-bold text-sm ml-1 mt-1" />
            </div>
            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700">Gambar *</label>
              <input
                type="file"
                name="image"
                id="image"
                onChange={(e) => handleFileChange(e, setFieldValue)}
                accept="image/png, image/jpeg"
                className="mt-1 w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white"
              />
              <ErrorMessage name="image" component="div" className="text-danger font-bold text-sm mt-1" />
            </div>
            <div>
              <label htmlFor="lokasi" className="block text-sm font-medium text-gray-700">Lokasi Kegiatan *</label>
              <Field
                type="text"
                name="lokasi"
                id="lokasi"
                placeholder='Masukkan lokasi kegiatan'
                className="mt-1 w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
              <ErrorMessage name="lokasi" component="div" className="text-danger font-bold text-sm mt-1" />
            </div>
            <div>
              <label htmlFor="tanggal" className="block text-sm font-medium text-gray-700">Tanggal Kegiatan *</label>
              <Field
                type="date"
                name="tanggal"
                id="tanggal"
                className="mt-1 w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
              <ErrorMessage name="tanggal" component="div" className="text-danger font-bold text-sm mt-1" />
            </div>
            <div>
              <label htmlFor="waktu_mulai" className="block text-sm font-medium text-gray-700">Waktu Mulai Kegiatan *</label>
              <Field
                type="time"
                name="waktu_mulai"
                id="waktu_mulai"
                className="mt-1 w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
              <ErrorMessage name="waktu_mulai" component="div" className="text-danger font-bold text-sm mt-1" />
            </div>
            <div>
                <label htmlFor="waktu_selesai" className="block text-sm font-medium text-gray-700">Waktu Selesai Kegiatan *</label>
                <Field
                    type="time"
                    name="waktu_selesai"
                    id="waktu_selesai"
                    className="mt-1 w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
                <ErrorMessage name="waktu_selesai" component="div" className="text-danger font-bold text-sm mt-1" />
            </div>
            <div>
              <label htmlFor="has_tamu" className="block text-sm font-medium text-gray-700">Kegiatan ini memiliki tamu undangan?</label>
              <Field
                type="checkbox"
                name="has_tamu"
                id="has_tamu"
                className="mt-1"
              />
              <ErrorMessage name="has_tamu" component="div" className="text-danger font-bold text-sm mt-1" />
            </div>

            <div>
              <label htmlFor="tamu" className="mb-2 block text-sm font-medium text-gray-700">Tamu Undangan</label>
              <Field
                name="tamu"
                id="tamu"
                className="mt-5"
              >
                {({ field, form }: { field: any, form: any }) => (
                  <div className="space-y-6">
                    {form.values.has_tamu && form.values.tamu.map((_: any, index: number) => (
                      <div key={index} className="space-y-6">
                        <div>
                          <label htmlFor={`tamu.${index}.nama`} className="block text-sm font-medium text-gray-700">Nama Tamu *</label>
                          <Field
                            type="text"
                            name={`tamu.${index}.nama`}
                            id={`tamu.${index}.nama`}
                            placeholder='Masukkan nama tamu'
                            className="mt-1 w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                          />
                          <ErrorMessage name={`tamu.${index}.nama`} component="div" className="text-danger font-bold text-sm mt-1" />
                        </div>
                        <div>
                          <label htmlFor={`tamu.${index}.posisi`} className="block text-sm font-medium text-gray-700">Posisi Tamu *</label>
                          <Field
                            type="text"
                            name={`tamu.${index}.posisi`}
                            id={`tamu.${index}.posisi`}
                            placeholder='Masukkan posisi tamu'
                            className="mt-1 w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                          />
                          <ErrorMessage name={`tamu.${index}.posisi`} component="div" className="text-danger font-bold text-sm mt-1" />
                        </div>
                      </div>
                    ))}
                    { form.values.has_tamu && (
                        <div className="flex space-x-2">
                            <button
                            type="button"
                            onClick={() => form.setFieldValue('tamu', [...form.values.tamu, { nama: '', posisi: '' }])}
                                className="bg-primary text-white py-2 px-4 rounded"
                            >
                                Tambah Tamu
                            </button>
                            <button
                            type="button"
                            onClick={() => form.setFieldValue('tamu', form.values.tamu.slice(0, -1))}
                                className="bg-danger text-white py-2 px-4 rounded"
                            >
                                Hapus Tamu
                            </button>
                        </div>
                    )}
                    </div>
                )}
                </Field>
            </div>
            <ErrorMessage name="tamu" component="div" className="text-danger font-bold text-sm mt-1" />
            <ErrorMessage name="tamu.*.nama" component="div" className="text-danger font-bold text-sm mt-1" />
            <ErrorMessage name="tamu.*.posisi" component="div" className="text-danger font-bold text-sm mt-1" />
            <div>
              <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Unggah
              </button>
            </div>
          </FormikForm>
        )}
      </Formik>
    </>
  );
};

export default Form;
