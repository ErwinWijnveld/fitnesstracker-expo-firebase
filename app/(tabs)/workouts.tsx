import { useLayoutEffect } from 'react';
import { ScrollView } from 'react-native';
import { LoadingIndicator } from '../../components';
import Container from '../../components/Container';
import GradientButton from '../../components/buttons/GradientButton';
import WorkoutItem from '../../components/workouts/WorkoutItem';
import { useAuth } from '../../hooks/auth';
import { useData } from '../../hooks/useData';
import { createWorkout } from '../../lib/workouts';

const TabWorkoutsScreen = () => {
	const { user } = useAuth();
	const { setLoading, loading, workouts, fetchWorkouts } = useData();

	useLayoutEffect(() => {
		!workouts && fetchWorkouts();
	}, []);

	const handleCreateWorkout = async () => {
		setLoading(true);
		createWorkout(user)
			.then(() => {
				fetchWorkouts();
			})
			.finally(() => {
				setLoading(false);
			});
	};

	if (loading) {
		return <LoadingIndicator />;
	}

	return (
		<ScrollView className="bg-dark">
			<Container>
				<GradientButton
					onPress={() => handleCreateWorkout()}
					className="mb-4"
				>
					Start New Workout
				</GradientButton>
				{workouts?.map((workout: any, i: number) => (
					<WorkoutItem {...workout} key={i} />
				))}
			</Container>
		</ScrollView>
	);
};
export default TabWorkoutsScreen;
