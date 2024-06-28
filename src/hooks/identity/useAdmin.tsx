import { collection, getDocs, where, query, deleteDoc, addDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/utils/firebase';
import { Admin } from '@/types/admin';
import bycrypt from 'bcryptjs';
import { generateKey, randomBytes } from 'crypto';

const useAdmin = () => {
    const getAllAdmin = async () => {
        const adminCollection = collection(db, "admins");
        const q = query(adminCollection);
        const data = await getDocs(q);
        const adminData = data.docs.map(doc => doc.data());
        return adminData as Array<Admin>;
    }

    const getAdmin = async (uid: string) => {
        const adminCollection = collection(db, "admins");
        const q = query(adminCollection, where("uid", "==", uid));
        const data = await getDocs(q);
        const adminData = data.docs[0].data();
        return adminData as Admin;
    }

    const addAdmin = async (admin: Admin) => {
        const adminCollection = collection(db, "admins");
        const q = query(adminCollection, where("username", "==", admin.username));
        const data = await getDocs(q);

        try {
            if (data.empty) {
                await addDoc(adminCollection, {
                    uid: randomBytes(16).toString('hex'),
                    nama: admin.nama,
                    username: admin.username,
                    password: bycrypt.hashSync(admin.password, 10),
                    special_case: admin.special_case,
                    last_log: new Date().toISOString()
                });
            }
            
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    const checkUsername = async (username: string, oldUsername?: string) => {
        const adminCollection = collection(db, "admins");
        const q = query(adminCollection, where("username", "!=", oldUsername));
        const data = await getDocs(q);
        const adminData = data.docs.map(doc => doc.data());
        const checkUsername = adminData.find((admin) => admin.username === username);
        if(checkUsername){
            return false;
        }
        return true;
    }

    const updateAdmin = async (admin: Admin) => {
        const adminCollection = collection(db, "admins");
        const q = query(adminCollection, where("uid", "==", admin.uid));
        const data = await getDocs(q);
        const adminData = data.docs[0];

        try {
            const checkUser = await checkUsername(admin.username, adminData.get('username'));
            if (adminData && checkUser) {
                if(admin.password === "" || admin.password === undefined || admin.password === null){
                    await updateDoc(adminData.ref, {
                        nama: admin.nama,
                        username: admin.username
                    });
                }else{
                    await updateDoc(adminData.ref, {
                        nama: admin.nama,
                        username: admin.username,
                        password: bycrypt.hashSync(admin.password, 10)
                    });
                }
                return true;
            }else{
                return false;
            }
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    const deleteAdmin = async (uid: string) => {
        const adminCollection = collection(db, "admins");
        const q = query(adminCollection, where("uid", "==", uid));
        const data = await getDocs(q);
        const adminData = data.docs[0];

        try {
            if (adminData && adminData.get('special_case') !== "superuser") {
                await deleteDoc(adminData.ref);
                return true;
            }else{
                return false;
            }
            
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    return { getAllAdmin, getAdmin, addAdmin, updateAdmin, deleteAdmin };
}

export default useAdmin;