// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import {
    addDoc,
    collection,
    query,
    orderBy,
    getDocs,
    doc,
    getDoc,
    updateDoc,
    deleteDoc,
} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Analytics는 브라우저 환경에서만 로드
let analytics = null;
if (typeof window !== 'undefined') {
    try {
        analytics = getAnalytics(app);
    } catch (error) {
        console.warn("Analytics를 초기화하는 중 오류가 발생했습니다:", error);
    }
}
export const db = getFirestore(app);

export const addTodo = async (title, details, dueDate) => {
    try {
        const docRef = await addDoc(collection(db, "todos"), {
            title,
            details,
            dueDate: dueDate ? new Date(dueDate) : null,
            createdAt: new Date(),
        });
        console.log("할 일이 성공적으로 추가되었습니다:", docRef.id);
        return docRef.id;
    } catch (error) {
        console.error("Firestore에 할 일 추가 중 오류 발생:", error);
        throw error;
    }
};

export const getTodos = async () => {
    try {
        const q = query(collection(db, "todos"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error("Firestore에서 할 일 목록 불러오기 오류:", error);
        return [];
    }
};

// 특정 할 일 가져오기
export const getTodoById = async (id) => {
    try {
        const todoRef = doc(db, "todos", id);
        const todoSnap = await getDoc(todoRef);

        if (todoSnap.exists()) {
            return { id: todoSnap.id, ...todoSnap.data() };
        } else {
            return null; // 문서가 존재하지 않음
        }
    } catch (error) {
        console.error("Firestore에서 할 일 가져오기 오류:", error);
        return null;
    }
};

// 할 일 업데이트
export const updateTodo = async (id, title, details, dueDate) => {
    try {
        const todoRef = doc(db, "todos", id);
        await updateDoc(todoRef, {
            title,
            details,
            dueDate: dueDate ? new Date(dueDate) : null,
        });
        console.log(`Firestore에서 할 일 업데이트 완료 (ID: ${id})`);
    } catch (error) {
        console.error("Firestore에서 할 일 업데이트 오류:", error);
        throw error;
    }
};

// 할 일 삭제
export const deleteTodo = async (id) => {
    try {
        const todoRef = doc(db, "todos", id);
        await deleteDoc(todoRef);
        console.log(`Firestore에서 할 일 삭제 완료 (ID: ${id})`);
    } catch (error) {
        console.error("Firestore에서 할 일 삭제 오류:", error);
    }
};
