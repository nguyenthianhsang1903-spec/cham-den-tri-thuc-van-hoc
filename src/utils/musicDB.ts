// IndexedDB storage for user-uploaded music files (.mp3, .wav, .m4a, .ogg)
// Enables offline persistence so uploaded songs remain available across reloads.

export interface StoredAudioTrack {
  id: string;
  name: string;
  size: number;
  type: string;
  blob: Blob;
  duration?: number;
  addedAt: number;
}

const DB_NAME = 'VanHoc12_Music_DB';
const DB_VERSION = 1;
const STORE_NAME = 'custom_tracks';

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function saveAudioTrack(file: File): Promise<StoredAudioTrack> {
  const db = await openDB();
  const id = 'custom-' + Date.now() + '-' + Math.random().toString(36).slice(2, 7);

  // Estimate duration via temporary audio element
  let duration = 0;
  try {
    const tempUrl = URL.createObjectURL(file);
    const audio = new Audio(tempUrl);
    await new Promise<void>((resolve) => {
      audio.onloadedmetadata = () => {
        duration = audio.duration || 0;
        URL.revokeObjectURL(tempUrl);
        resolve();
      };
      audio.onerror = () => {
        URL.revokeObjectURL(tempUrl);
        resolve();
      };
      // Timeout fallback in case metadata doesn't load quickly
      setTimeout(() => {
        URL.revokeObjectURL(tempUrl);
        resolve();
      }, 1500);
    });
  } catch {
    duration = 0;
  }

  const track: StoredAudioTrack = {
    id,
    name: file.name.replace(/\.[^/.]+$/, ''), // Clean file extension
    size: file.size,
    type: file.type || 'audio/mpeg',
    blob: file,
    duration,
    addedAt: Date.now(),
  };

  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const request = store.put(track);

    request.onsuccess = () => resolve(track);
    request.onerror = () => reject(request.error);
  });
}

export async function getAllAudioTracks(): Promise<StoredAudioTrack[]> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readonly');
    const store = tx.objectStore(STORE_NAME);
    const request = store.getAll();

    request.onsuccess = () => {
      const results = (request.result as StoredAudioTrack[]) || [];
      // Sort newest first
      results.sort((a, b) => b.addedAt - a.addedAt);
      resolve(results);
    };
    request.onerror = () => reject(request.error);
  });
}

export async function deleteAudioTrack(id: string): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const request = store.delete(id);

    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

export async function clearAllAudioTracks(): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const request = store.clear();

    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}
