import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";

export async function getUserData(user:any) {
  const id = user.uid;

  const userRef = doc(db, 'users', id);
  const userDoc = await getDoc(userRef);

    return {
        ...user,
        ...userDoc?.data(),
    }
}