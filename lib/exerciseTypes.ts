import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../config/firebase";
import { getUserData } from "./users";

export async function getUserExerciseTypes(user:any) {
    const userData = await getUserData(user);
    const exerciseTypes = getExerciseTypesData(userData);

    return exerciseTypes;
}

export async function getExerciseTypesData(user:any) {
  const q = query(
    collection(db, "exerciseTypes"),
    where("userId", "==", user?.uid)
  );

  const exerciseTypesSnapshot = await getDocs(q);

  const exerciseTypes = await Promise.all(
    exerciseTypesSnapshot.docs.map(async (exerciseType:any) => {
      return {
        id: exerciseType.id,
        ...exerciseType.data(),
      }
    })
  );

  return exerciseTypes;

}

export const findExerciseTypeById = (exerciseTypes:any, id:any) => {
  return exerciseTypes?.filter((exerciseType:any) => exerciseType.id === id)[0] || [];
}