import { collection, getDocs, where, query, orderBy, limit, deleteDoc, addDoc, updateDoc } from 'firebase/firestore';
import { db, storage } from '@/utils/firebase';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { Berita } from '@/types/berita';
import { slugify } from '@/utils/slugify';

const useBerita = () => {
    const getAllBerita = async () => {
        const beritaCollection = collection(db, "berita");
        const q = query(beritaCollection, orderBy("tanggal_post", "desc"));
        const data = await getDocs(q);
        const beritaData = data.docs.map(doc => doc.data());
        return beritaData as Array<Berita>;
    }

    const getRecentBerita = async () => {
        const beritaCollection = collection(db, "berita");
        const q = query(beritaCollection, orderBy("tanggal_post", "desc"), limit(3));
        const data = await getDocs(q);
        const beritaData = data.docs.map(doc => doc.data());
        return beritaData as Array<Berita>;
    }

    const getBerita = async (id: string) => {
        const beritaCollection = collection(db, "berita");
        const q = query(beritaCollection, where("id", "==", id));
        const data = await getDocs(q);
        const beritaData = data.docs[0].data();
        return beritaData as Berita;
    }

    const addBerita = async (formData: { image: File; title: string; content: string; postDate: string; user: string }) => {
        const { image, title, content, postDate, user } = formData;
        const id = slugify(title); 
        let imageUrl = '';

        try {
            if (image) {
                const imageRef = ref(storage, `images/${image.name}`);
                await uploadBytes(imageRef, image);
                imageUrl = await getDownloadURL(imageRef);
            }

            const beritaCollection = collection(db, "berita");
            const q = query(beritaCollection, where("id", "==", id));
            const data = await getDocs(q);
            if (!data.empty) {
                console.error('Title must be unique!');
                return false;
            }

            await addDoc(collection(db, 'berita'), {
                id: id,
                judul: title,
                konten: content,
                tanggal_post: postDate,
                gambar: imageUrl,
                user_post: user,
            });

            return true;
        } catch (error) {
            console.error('Error adding document: ', error);
            return false;
        }
        
    }

    const uniqueTitle = async (title: string) => {
        const beritaCollection = collection(db, "berita");
        const q = query(beritaCollection, where("id", "==", slugify(title)));
        const data = await getDocs(q);
        if (!data.empty) {
            return false;
        }
        return true;
    }

    const updateUniqueTitle = async (title: string, id: string) => {
        const beritaCollection = collection(db, "berita");
        const q = query(beritaCollection, where("id", "==", slugify(title)));
        const data = await getDocs(q);
        if (!data.empty) {
            const doc = data.docs[0];
            const docData = doc.data();
            if (docData.id === id) {
                return true;
            }
            return false;
        }
        return true;
    }

    const updateBerita = async (id: string, formData: { image: File; title: string; content: string; postDate: string; user: string }) => {
        const { image, title, content, postDate, user } = formData;
        let imageUrl = '';

        try {
            if (image) {
                const imageRef = ref(storage, `images/${image.name}`);
                await uploadBytes(imageRef, image);
                imageUrl = await getDownloadURL(imageRef);
            }


            const beritaCollection = collection(db, "berita");
            const q = query(beritaCollection, where("id", "==", id));
            const data = await getDocs(q);
            const doc = data.docs[0];
            
            await updateDoc(doc.ref, {
                id: slugify(title),
                judul: title,
                konten: content,
                tanggal_post: postDate,
                gambar: imageUrl === '' ? doc.data().gambar : imageUrl,
                user_post: user,
            });

            return true;
        } catch (error) {
            console.error('Error updating document: ', error);
            return false;
        }
    }

    const deleteBerita = async (id: string) => {
        const beritaCollection = collection(db, "berita");
        const q = query(beritaCollection, where("id", "==", id));
        const data = await getDocs(q);
    
        if (!data.empty) {
            const doc = data.docs[0];
            const docData = doc.data();
    
            if (docData.gambar) {
                const imageRef = ref(storage, docData.gambar);
                await deleteObject(imageRef)
                    .then(() => {
                        console.log('Image successfully deleted!');
                    })
                    .catch((error) => {
                        console.error('Error deleting image: ', error);
                    });
            }
    
            await deleteDoc(doc.ref)
                .then(() => {
                    console.log('Document successfully deleted!');
                })
                .catch((error) => {
                    console.error('Error deleting document: ', error);
                });
        } else {
            console.error('No document found with the given ID.');
        }
    };

    return { getAllBerita, getRecentBerita, getBerita, deleteBerita, addBerita, updateBerita, uniqueTitle, updateUniqueTitle};
}

export default useBerita;