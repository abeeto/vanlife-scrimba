import { initializeApp } from "firebase/app";
import { collection, doc, getFirestore, getDocs, getDoc, query, where } from "firebase/firestore/lite"

const firebaseConfig = {
  apiKey: "AIzaSyCavw5S_H5rZbNFVfXeKuGehcNURN0rfxI",
  authDomain: "vanlife-scrimba-b5cdf.firebaseapp.com",
  projectId: "vanlife-scrimba-b5cdf",
  storageBucket: "vanlife-scrimba-b5cdf.appspot.com",
  messagingSenderId: "131213892600",
  appId: "1:131213892600:web:189e9578998ecae15c140d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

const vansCollectionsRef = collection(db, "vans")

export async function getVans() {
    const snapshot = await getDocs(vansCollectionsRef)
    const vans = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }))
    return vans
}
export async function getVan(id){
    const docRef = doc(db, "vans", id)
    const snapshot = await getDoc(docRef)

    return {...snapshot.data(), id: snapshot.id}
}
export async function getHostVans() {
    const q = query(vansCollectionsRef, where("hostId","==","123"))
    const snapshot = await getDocs(q)
    const vans = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }))
    return vans
}

export async function loginUser(creds) {
    const res = await fetch("/api/login",
        { method: "post", body: JSON.stringify(creds) }
    )
    const data = await res.json()

    if (!res.ok) {
        throw {
            message: data.message,
            statusText: res.statusText,
            status: res.status
        }
    }

    return data
}