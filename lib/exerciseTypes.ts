import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";

export async function getExerciseTypeData(exerciseType:any) {
    const exerciseTypeRef = doc(db, 'exerciseTypes', exerciseType.id);
    const exerciseTypeDoc = await getDoc(exerciseTypeRef);

    return {
        id: exerciseTypeDoc.id,
        ...exerciseTypeDoc.data(),
    };
}