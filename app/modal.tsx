import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet } from 'react-native';

import { useSearchParams } from 'expo-router';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import AddExercise from '../components/exercises/AddExercise';

export default function ModalScreen() {
	const { modal } = useSearchParams();

	switch (modal) {
		case 'addExercise':
			return <AddExercise />;
		default:
			return (
				<View className="flex-1 items-center justify-center bg-dark">
					<Text style={styles.title}>Modal Screen</Text>
				</View>
			);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	title: {
		fontSize: 20,
		fontWeight: 'bold',
	},
	separator: {
		marginVertical: 30,
		height: 1,
		width: '80%',
	},
});
