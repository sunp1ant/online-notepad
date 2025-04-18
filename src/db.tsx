import { openDB, IDBPDatabase } from 'idb';

const DB_NAME = 'notesdb';
const STORE_NAME = 'tb_notes';

export interface Note {
  id: string;
  date: string;
  content: string;
  html: string;
}

let dbPromise: Promise<IDBPDatabase>;

export const initDB = (): Promise<IDBPDatabase> => {
  if (!dbPromise) {
    dbPromise = openDB(DB_NAME, 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: 'id' });
        }
      }
    });
  }
  return dbPromise;
};

export const addNote = async (note: Note): Promise<void> => {
  const db = await initDB();
  await db.put(STORE_NAME, note);
};

export const getAllNotes = async (): Promise<Note[]> => {
  const db = await initDB();
  return db.getAll(STORE_NAME);
};

export const deleteNote = async (id: string): Promise<void> => {
  const db = await initDB();
  await db.delete(STORE_NAME, id);
};

export const deleteAllNotes = async (): Promise<void> => {
    const db = await initDB();
    await db.clear(STORE_NAME);
  };