import { rdb } from '../firebase';
import { ref, set, push, update, remove, onValue, off } from 'firebase/database';

// Utility functions for Firebase Realtime Database operations

/**
 * Write data to a specific path in Realtime Database
 * @param path - The path where data should be written
 * @param data - The data to write
 * @returns Promise that resolves when data is written
 */
export const writeData = async (path: string, data: any) => {
    try {
        await set(ref(rdb, path), data);
        return { success: true };
    } catch (error) {
        console.error('Error writing data:', error);
        return { success: false, error };
    }
};

/**
 * Push new data to a list in Realtime Database (auto-generates key)
 * @param path - The path where data should be pushed
 * @param data - The data to push
 * @returns Promise that resolves with the generated key
 */
export const pushData = async (path: string, data: any) => {
    try {
        const newRef = push(ref(rdb, path));
        await set(newRef, data);
        return { success: true, key: newRef.key };
    } catch (error) {
        console.error('Error pushing data:', error);
        return { success: false, error };
    }
};

/**
 * Update data at a specific path in Realtime Database
 * @param path - The path where data should be updated
 * @param data - The data to update
 * @returns Promise that resolves when data is updated
 */
export const updateData = async (path: string, data: any) => {
    try {
        await update(ref(rdb, path), data);
        return { success: true };
    } catch (error) {
        console.error('Error updating data:', error);
        return { success: false, error };
    }
};

/**
 * Delete data at a specific path in Realtime Database
 * @param path - The path where data should be deleted
 * @returns Promise that resolves when data is deleted
 */
export const deleteData = async (path: string) => {
    try {
        await remove(ref(rdb, path));
        return { success: true };
    } catch (error) {
        console.error('Error deleting data:', error);
        return { success: false, error };
    }
};

/**
 * Listen to real-time changes at a path
 * @param path - The path to listen to
 * @param callback - Function to call when data changes
 * @returns Function to unsubscribe from the listener
 */
export const listenToData = (path: string, callback: (data: any) => void) => {
    const dataRef = ref(rdb, path);

    const handleDataChange = (snapshot: any) => {
        callback(snapshot.val());
    };

    onValue(dataRef, handleDataChange);

    // Return unsubscribe function
    return () => off(dataRef, 'value', handleDataChange);
};

/**
 * Get data once from Realtime Database
 * @param path - The path to get data from
 * @returns Promise that resolves with the data
 */
export const getDataOnce = async (path: string) => {
    try {
        const snapshot = await new Promise<any>((resolve, reject) => {
            const dataRef = ref(rdb, path);
            onValue(dataRef, (snapshot) => {
                resolve(snapshot);
                off(dataRef, 'value');
            }, reject);
        });

        return { success: true, data: snapshot.val() };
    } catch (error) {
        console.error('Error getting data:', error);
        return { success: false, error };
    }
};
