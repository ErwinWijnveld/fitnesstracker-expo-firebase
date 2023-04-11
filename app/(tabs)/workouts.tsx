import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { LoadingIndicator } from '../../components';
import Container from '../../components/Container';
import WorkoutItem from '../../components/workouts/WorkoutItem';
import { db } from '../../config/firebase';
import { useAuth } from '../../hooks/auth';
import DataProvider, { useData } from '../../hooks/useData';
import { getUserWorkouts } from '../../lib/workouts';

const TabWorkoutsScreen = () => {
	return (
		<DataProvider>
			<Main />
		</DataProvider>
	);
};

const Main = () => {
	const { user } = useAuth();
	const { loading, data, fetchData } = useData();

	useEffect(() => {
		fetchData({
			fetchFunction: () => getUserWorkouts(user),
		});
	}, []);

	if (loading) {
		return <LoadingIndicator />;
	}

	return (
		<Container>
			{data?.map((workout: any, i: number) => (
				<WorkoutItem {...workout} key={i} />
			))}
		</Container>
	);
};
export default TabWorkoutsScreen;
