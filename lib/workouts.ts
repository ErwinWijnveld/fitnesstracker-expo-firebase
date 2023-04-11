import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";
import { useAuth } from "../hooks/auth";
import { getExercisesData } from "./exercises";
import { getUserData } from "./users";

export async function getUserWorkouts(user:any) {
  const userData = await getUserData(user);

  const workouts = getWorkoutsData(userData);

  return workouts;
}

export async function getWorkoutsData(user:any) {
  const exercises = await Promise.all(
    user.workouts.map(async (workout:any) => {
      return getWorkoutData(workout);
    })
  );

  return exercises;
}

export async function getWorkoutData(workout:any) {
  const workoutRef = doc(db, 'workouts', workout.id);
  const workoutDoc = await getDoc(workoutRef);

  const exercises = await getExercisesData(workoutDoc)

  return {
    id: workoutDoc.id,
    ...workoutDoc.data(),
    exercises,
  };
}