import { db } from './firebase';
import { collection, getDocs, where, query } from 'firebase/firestore';
import bcrypt from 'bcryptjs';

interface Admin {
  username: string;
  password: string;
}

const getAdminByUsername = async (username: string): Promise<Admin | null> => {
    const adminRef = collection(db, 'admins');
    const q = query(adminRef, where('username', '==', username));
    const snapshot = await getDocs(q);
    if (snapshot.empty) {
        return null;
    }

    const admin = snapshot.docs[0].data() as Admin;
    return admin;
};

const validatePassword = async (plainPassword: string, hashedPassword: string): Promise<boolean> => {
    return bcrypt.compareSync(plainPassword, hashedPassword);
};

const checkUid = async (uid: string): Promise<boolean> => {
    const adminRef = collection(db, 'admins');
    const q = query(adminRef, where('uid', '==', uid));
    const snapshot = await getDocs(q);
    return !snapshot.empty;
}

export { getAdminByUsername, validatePassword, checkUid };
