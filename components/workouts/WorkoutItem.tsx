import { format, fromUnixTime } from 'date-fns';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet } from 'react-native';
import { COLORS } from '../../lib/consts';
import { Text, View } from '../Themed';

const WorkoutItem = ({ date }: any) => {
	const dateOb = fromUnixTime(date?.seconds);
	const formattedDate = format(dateOb, 'dd MMMM, yyyy');
	return (
		<View className="relative mb-4 overflow-hidden rounded-primary bg-highlight p-5">
			<LinearGradient
				// style={styles.backgroundGradient}
				className="absolute left-0 top-0 h-36 w-36 -translate-x-[40px] -translate-y-[80px] rotate-45"
				// colors={['#4832CB', COLORS.highlight]}
				colors={[COLORS.primaryDark, COLORS.highlight]}
				start={[0, 0]}
				end={[1, 0]}
			/>
			<Text className="text-xl font-bold">{formattedDate}</Text>
		</View>
	);
};
export default WorkoutItem;

const styles = StyleSheet.create({
	backgroundGradient: {
		position: 'absolute',
		top: 0,
		left: 0,
		width: 150,
		height: 150,
		transform: [
			{ rotate: '45deg' },
			{ translateX: -80 },
			{ translateY: -20 },
		],
	},
});
