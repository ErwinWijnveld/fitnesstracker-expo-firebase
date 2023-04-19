import { format, fromUnixTime } from 'date-fns';
import { Link, usePathname, useRouter, useSearchParams } from 'expo-router';
import { useEffect, useLayoutEffect, useState } from 'react';
import { LoadingIndicator } from '../../../components';
import Container from '../../../components/Container';
import { Text, View } from '../../../components/Themed';
import GradientButton from '../../../components/buttons/GradientButton';
import ExerciseItem from '../../../components/exercises/ExerciseItem';
import { useData } from '../../../hooks/useData';
import { findWorkoutData } from '../../../lib/workouts';

const singleWorkout = () => {
	const { workoutId } = useSearchParams();
	const router = useRouter();
	const {
		loading,
		fetchExercises,
		fetchWorkouts,
		exercises,
		workouts,
		exerciseTypes,
		fetchExerciseTypes,
	} = useData();
	const [workoutData, setWorkoutData] = useState(null) as any;

	useLayoutEffect(() => {
		!workouts && fetchWorkouts();
		!exercises && fetchExercises();
		!exerciseTypes && fetchExerciseTypes();

		if (!workouts || !exercises || !exerciseTypes) return;

		setWorkoutData(
			findWorkoutData(workouts, exercises, exerciseTypes, workoutId)
		);
	}, [workouts, exercises, exerciseTypes]);

	console.log(JSON.stringify(workoutData));

	if (loading) {
		return <LoadingIndicator />;
	}

	return (
		<Container>
			{/* <Text className="text-4xl font-bold">{formattedDate}</Text> */}
			<GradientButton
				onPress={() =>
					router.push(
						`/modal?workoutId=${workoutId}&modal=addExercise`
					)
				}
				className="mb-4"
			>
				Add new exercise
			</GradientButton>

			{workoutData?.exercises?.map((exercise: any, i: number) => (
				<ExerciseItem {...exercise} key={i} />
			))}
		</Container>
	);
};
export default singleWorkout;
