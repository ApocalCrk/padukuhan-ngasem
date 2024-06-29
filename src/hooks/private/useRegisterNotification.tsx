import { collection, getDocs, where, query, deleteDoc, addDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/utils/firebase';

const useRegisterNotification = () => {
    const registerNotification = async (email: string) => {
        const notificationRef = collection(db, 'notifikasi');
        const notificationQuery = query(notificationRef, where('email', '==', email));
        const notificationSnapshot = await getDocs(notificationQuery);
        
        if (notificationSnapshot.empty) {
            await addDoc(notificationRef, { email });
        }

        return notificationSnapshot.empty;
    };
    
    return { registerNotification };
}

export default useRegisterNotification;
