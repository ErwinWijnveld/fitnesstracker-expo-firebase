import { Entypo } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useSearchParams } from 'expo-router';
import { useLayoutEffect } from 'react';
import { Pressable } from 'react-native';
import { useData } from '../../hooks/useData';
import { COLORS } from '../../lib/consts';
import { Text, View } from '../Themed';
import GradientButton from '../buttons/GradientButton';

const AddExercise = () => {
	const { workoutId } = useSearchParams();
	const { exerciseTypes, fetchExerciseTypes } = useData();

	useLayoutEffect(() => {
		!exerciseTypes && fetchExerciseTypes();
	}, [exerciseTypes]);

	return (
		<View className="flex-1 bg-highlight px-8">
			{exerciseTypes?.map((exerciseType: any, i: number) => (
				<Pressable
					className="relative flex-row items-center justify-between overflow-hidden rounded-primary bg-highlight-secondary px-6 py-3"
					key={i}
				>
					<Text className="z-10 text-lg font-bold">
						{exerciseType.name}
					</Text>
					<Entypo
						style={{
							zIndex: 2,
						}}
						name="plus"
						size={26}
						color="#fff"
					/>
					<LinearGradient
						// style={styles.backgroundGradient}
						className="absolute right-0 top-0 h-40 w-24 -translate-y-[40px] translate-x-[40px] rotate-[150deg]"
						// colors={['#4832CB', COLORS.highlight]}
						colors={[
							COLORS.primaryDark,
							COLORS['highlight-secondary'],
						]}
						start={[0, 0]}
						end={[1, 0]}
					/>
				</Pressable>
			))}
		</View>
	);
};
export default AddExercise;
