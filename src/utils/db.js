export const DB_NAME = 'ImageResizerDB'
export const STORE_NAME = 'images'
export const DB_VERSION = 1

export const initDB = () => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION)

        request.onerror = (event) => reject("IndexedDB error: " + event.target.error)

        request.onsuccess = (event) => resolve(event.target.result)

        request.onupgradeneeded = (event) => {
            const db = event.target.result
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME, { keyPath: 'id' })
            }
        }
    })
}

export const saveImageToDB = async (imageObj) => {
    const db = await initDB()
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([STORE_NAME], 'readwrite')
        const store = transaction.objectStore(STORE_NAME)
        const request = store.put(imageObj)

        request.onsuccess = () => resolve(true)
        request.onerror = (e) => reject(e.target.error)
    })
}

export const getImagesFromDB = async () => {
    const db = await initDB()
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([STORE_NAME], 'readonly')
        const store = transaction.objectStore(STORE_NAME)
        const request = store.getAll()

        request.onsuccess = (e) => resolve(e.target.result)
        request.onerror = (e) => reject(e.target.error)
    })
}

export const deleteImageFromDB = async (id) => {
    const db = await initDB()
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([STORE_NAME], 'readwrite')
        const store = transaction.objectStore(STORE_NAME)
        const request = store.delete(id)

        request.onsuccess = () => resolve(true)
        request.onerror = (e) => reject(e.target.error)
    })
}

export const updateImageInDB = async (imageObj) => {
    // update is same as save/put in indexedDB if key exists
    return saveImageToDB(imageObj)
}
