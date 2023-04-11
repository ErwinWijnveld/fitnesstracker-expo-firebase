import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { getExerciseTypeData } from "./exerciseTypes";

export async function getExerciseData(exercise:any) {
    const exerciseRef = doc(db, 'exercises', exercise.id);
    const exerciseDoc = await getDoc(exerciseRef);
  
    const exerciseType = await getExerciseTypeData(exerciseDoc?.data()?.exerciseType);
  
    return {
        id: exerciseDoc.id,
        ...exerciseDoc.data(),  
        exerciseType
    };
}

export async function getExercisesData(workout:any) {
    const exercises = await Promise.all(
        workout.data().exercises.map(async (exercise:any) => {
        return getExerciseData(exercise);
        })
    );

    return exercises;
}
