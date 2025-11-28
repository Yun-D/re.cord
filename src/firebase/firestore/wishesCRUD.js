import {
  doc,
  collection,
  setDoc,
  deleteDoc,
  getDocs,
} from "firebase/firestore";
import { db } from "../firebase";

async function addWish(userId, newWish) {
  const wishesRef = collection(db, "users", userId, "wishes");
  const newWishDocRef = doc(wishesRef);

  await setDoc(newWishDocRef, {
    ...newWish,
    wishId: newWishDocRef.id,
  });
  console.log("Wish added successfully");
}

async function fetchWishes(userId) {
  const wishesRef = collection(db, "users", userId, "wishes");
  const wishSnap = await getDocs(wishesRef);

  if (!wishSnap.empty) {
    return wishSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } else {
    console.log("No such document!");
    return [];
  }
}

async function deleteWish(userId, wishId) {
  const wishRef = doc(db, "users", userId, "wishes", wishId);

  try {
    await deleteDoc(wishRef);
    console.log(`${wishId} 문서 삭제 완료`);
  } catch (error) {
    console.error("위시 삭제 중 오류: ", error);
  }
}

export { addWish, fetchWishes, deleteWish };
