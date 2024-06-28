import { collection, getDocs, where, query } from 'firebase/firestore';
import { db } from '@/utils/firebase';

interface Data {
    email: string;
}

const useNotification = () => {
    const getAllEmail = async () => {
        const emailCollection = collection(db, "notifikasi");
        const data = await getDocs(emailCollection);
        const emailData = data.docs.map(doc => doc.data());
        return emailData as Array<Data>;
    }
    
    return { getAllEmail };
}

export default useNotification;
