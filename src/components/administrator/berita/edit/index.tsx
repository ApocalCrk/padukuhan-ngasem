import { useState, useEffect } from 'react';
import { slugify } from '@/utils/slugify';
import 'react-quill/dist/quill.snow.css';
import dynamic from 'next/dynamic';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import useBerita from '@/hooks/pages/useBerita';
import { Formik, Field, Form as FormikForm, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Image from 'next/image';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const EditForm = ({ id }: { id: string }) => {
  const { getBerita, updateBerita, updateUniqueTitle } = useBerita();
  const [image, setImage] = useState<File | null>(null);

  const data = localStorage.getItem('admin');
  const admin = data ? JSON.parse(data) : null;

  useEffect(() => {
    const fetchBerita = async () => {
      const berita = await getBerita(id);
      setFormikValues({
        id: berita.id,
        title: berita.judul,
        content: berita.konten == '<p><br></p>' ? '' : berita.konten,
        existingImageUrl: berita.gambar,
        postDate: new Date().toISOString(),
      });
    };
    fetchBerita();
  }, [id]);

  const [formikValues, setFormikValues] = useState({
    id: '',
    title: '',
    content: '',
    existingImageUrl: '',
    postDate: '',
  });
  const validationSchema = Yup.object({
    title: Yup.string().required('Judul berita diperlukan').min(5, 'Judul berita minimal 5 karakter').max(50, 'Judul berita maksimal 50 karakter').test('unique', 'Judul berita sudah ada', async (value) => {
        if (value) {
            return await updateUniqueTitle(value, id);
        }
        return true;
        }
    ),
    content: Yup.string().required('Konten berita diperlukan').min(20, 'Konten berita minimal 20 karakter'),
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setFieldValue: any) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
      setFieldValue('image', e.target.files[0]);
    }
  };

  const handleSubmit = async (values: any) => {
    if (admin) {
      const success = await updateBerita(id, {
        image: image ? image! : null!,
        title: values.title,
        content: values.content,
        postDate: values.postDate,
        user: admin.nama,
      });

      const MySwal = withReactContent(Swal);
      if (success) {
        MySwal.fire('Berita Berhasil Diperbarui!', '', 'success').then(() => {
          window.location.href = '/administrator/berita';
        });
      } else {
        MySwal.fire('Terjadi Kesalahan!', '', 'error');
      }
    }
  };

  return (
    <>
      <h1 className="text-2xl font-semibold text-gray-900 mb-2">Edit Berita</h1>
      <Formik
        enableReinitialize
        initialValues={formikValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, values }) => {
          return (
            <FormikForm className="space-y-6 p-6 bg-white rounded shadow-md">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">Judul Berita *</label>
                <Field
                  type="text"
                  name="title"
                  id="title"
                  placeholder='Masukkan judul berita'
                  className="mt-1 w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
                <ErrorMessage name="title" component="div" className="text-danger font-bold text-sm mt-1" />
              </div>
              <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-700">Konten / Isi Berita *</label>
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
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm h-[80%]"
                      />
                    )}
                  </Field>
                </div>
                <ErrorMessage name="content" component="div" className="text-danger font-bold text-sm mt-1" />
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
                {values.existingImageUrl && (
                  <img src={values.existingImageUrl} alt="Current" className="mt-2" />
                )}
                <ErrorMessage name="image" component="div" className="text-danger font-bold text-sm mt-1" />
              </div>
              <div>
                <button className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" type="submit">
                  Perbarui
                </button>
              </div>
            </FormikForm>
          );
        }}
      </Formik>
    </>
  );
};

export default EditForm;
