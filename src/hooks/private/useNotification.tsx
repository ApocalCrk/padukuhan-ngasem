import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/utils/firebase';

interface Data {
    email: string;
}

export const getAllEmail = async (): Promise<Array<Data>> => {
    const emailCollection = collection(db, "notifikasi");
    const data = await getDocs(emailCollection);
    const emailData = data.docs.map(doc => doc.data() as Data);
    return emailData;
};
