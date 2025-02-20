import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, updateDoc, deleteDoc, getDocs } from 'firebase/firestore';

const firebaseConfig = {
  // suas configurações do Firebase
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const partsCollection = collection(db, 'parts');

export const savePart = async (part) => {
  await addDoc(partsCollection, part);
};

export const updatePart = async (id, part) => {
  await updateDoc(doc(db, 'parts', id), part);
};

export const deletePart = async (id) => {
  await deleteDoc(doc(db, 'parts', id));
};

export const getParts = async () => {
  const snapshot = await getDocs(partsCollection);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}; 