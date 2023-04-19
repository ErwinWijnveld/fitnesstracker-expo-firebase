import { addDoc, collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../config/firebase";
import { findExercisesByWorkoutId, getExercisesData } from "./exercises";
import { getUserData } from "./users";

export async function getUserWorkouts(user:any) {
  const userData = await getUserData(user);

  const workouts = getWorkoutsData(userData);

  return workouts;
}

export async function getWorkoutsData(user:any) {
  const q = query(
    collection(db, "workouts"),
    where("userId", "==", user?.uid)
  );

  const workoutsSnapshot = await getDocs(q);

  const workouts = await Promise.all(
    workoutsSnapshot.docs.map(async (workout:any) => {
      return {
        id: workout.id,
        ...workout.data(),
      }
    })
  );

  return workouts;

}

export async function createWorkout(user:any) {
  try {
    const docRef = await addDoc(collection(db, "workouts"), {
      userId: user?.uid,
      date: new Date(),
      description: "",
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}


export function findWorkoutData(workouts:any, exercises:any, exerciseTypes:any, workoutId:any) {
  const workout = workouts?.find((workout:any) => workout.id === workoutId) || null;

  const workoutExercises = findExercisesByWorkoutId(exercises, exerciseTypes, workoutId);

  return {
    ...workout,
    exercises: workoutExercises,
  };
}