import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  // 노출되어도 안전하게 설계된 공개용 키라고 함
  apiKey: "AIzaSyDrwb6yu0YivQ7S36DqAGGOFrgYmDuuG4g", 
  authDomain: "money-log-85b1e.firebaseapp.com",
  projectId: "money-log-85b1e",
  storageBucket: "money-log-85b1e.firebasestorage.app",
  messagingSenderId: "835893941629",
  appId: "1:835893941629:web:f980efffba1aec97afe814"
};  

// 1. Firebase 초기화
const app = initializeApp(firebaseConfig);

// 2. Firestore(DB) 객체 생성 및 내보내기
export const db = getFirestore(app);