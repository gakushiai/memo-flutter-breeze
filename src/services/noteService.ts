import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Note } from '@/types/note';

const COLLECTION_NAME = 'notes';

export const getNotes = async (): Promise<Note[]> => {
  const notesQuery = query(collection(db, COLLECTION_NAME), orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(notesQuery);
  return snapshot.docs.map(doc => ({
    ...doc.data(),
    id: doc.id,
    createdAt: doc.data().createdAt.toDate(),
  })) as Note[];
};

export const createNote = async (note: Omit<Note, 'id'>): Promise<Note> => {
  const docRef = await addDoc(collection(db, COLLECTION_NAME), {
    ...note,
    createdAt: new Date(),
  });
  return {
    ...note,
    id: docRef.id,
  };
};

export const updateNote = async (note: Note): Promise<Note> => {
  const docRef = doc(db, COLLECTION_NAME, note.id);
  await updateDoc(docRef, {
    title: note.title,
    content: note.content,
  });
  return note;
};

export const deleteNote = async (id: string): Promise<void> => {
  const docRef = doc(db, COLLECTION_NAME, id);
  await deleteDoc(docRef);
}; 