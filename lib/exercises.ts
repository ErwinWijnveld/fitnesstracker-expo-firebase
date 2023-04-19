import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../config/firebase";
import { findExerciseTypeById } from "./exerciseTypes";
import { getUserData } from "./users";


export async function getUserExercises(user:any) {
    const userData = await getUserData(user);

    const exercises = getExercisesData(userData);

    return exercises;
}

export async function getExercisesData(user:any) {
  const q = query(
    collection(db, "exercises"),
    where("userId", "==", user?.uid)
  );

  const exercisesSnapshot = await getDocs(q);

  const exercises = await Promise.all(
    exercisesSnapshot.docs.map(async (exercise:any) => {
      return {
        id: exercise.id,
        ...exercise.data(),
      }
    })
  );

  return exercises;

}

export const findExercisesByWorkoutId = (exercises:any, exerciseTypes:any, workoutId:any) => {
  let exercisesData = exercises?.filter((exercise:any) => exercise.workoutId === workoutId) || [];
  
  exercisesData = exercisesData.map((exercise:any) => {
    return {
      ...exercise,
      exerciseType: findExerciseTypeById(exerciseTypes, exercise.exerciseType),
    }
  })

  return exercisesData;
}