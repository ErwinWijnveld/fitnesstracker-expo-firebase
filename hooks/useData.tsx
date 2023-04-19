import { createContext, useContext, useState } from 'react';
import { getUserExerciseTypes } from '../lib/exerciseTypes';
import { getUserExercises } from '../lib/exercises';
import { getUserWorkouts } from '../lib/workouts';
import { useAuth } from './auth';

const DataContext = createContext<any>(undefined);

const DataProvider = ({ children, ...rest }: any) => {
	const { user } = useAuth();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const [workouts, setWorkouts] = useState(null);
	const [exercises, setExercises] = useState(null);
	const [exerciseTypes, setExerciseTypes] = useState(null);

	// workouts
	async function fetchWorkouts() {
		setLoading(true);

		getUserWorkouts(user)
			.then((response: any) => {
				setWorkouts(response);
			})
			.catch((error: any) => {
				setError(error);
			})
			.finally(() => {
				setLoading(false);
			});
	}

	// exercises
	async function fetchExercises() {
		setLoading(true);

		getUserExercises(user)
			.then((response: any) => {
				setExercises(response);
			})
			.catch((error: any) => {
				setError(error);
			})
			.finally(() => {
				setLoading(false);
			});
	}

	// exercise types
	async function fetchExerciseTypes() {
		setLoading(true);
		getUserExerciseTypes(user)
			.then((response: any) => {
				setExerciseTypes(response);
			})
			.catch((error: any) => {
				setError(error);
			})
			.finally(() => {
				setLoading(false);
			});
	}

	return (
		<DataContext.Provider
			{...rest}
			value={{
				loading,
				setLoading,
				error,
				workouts,
				fetchWorkouts,
				exercises,
				fetchExercises,
				exerciseTypes,
				fetchExerciseTypes,
			}}
		>
			{children}
		</DataContext.Provider>
	);
};

export const useData = () => {
	const context = useContext(DataContext);

	// if you are trying to use this hook outside of a provider
	if (context === undefined) {
		throw new Error('Use it inside of a provider.');
	}

	return {
		loading: context.loading,
		setLoading: context.setLoading,
		error: context.error,
		workouts: context.workouts,
		fetchWorkouts: context.fetchWorkouts,
		exercises: context.exercises,
		fetchExercises: context.fetchExercises,
		exerciseTypes: context.exerciseTypes,
		fetchExerciseTypes: context.fetchExerciseTypes,
	};
};

export default DataProvider;
