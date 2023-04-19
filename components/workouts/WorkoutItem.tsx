import { format, fromUnixTime } from 'date-fns';
import { LinearGradient } from 'expo-linear-gradient';
import { Link, useRouter } from 'expo-router';
import { Pressable } from 'react-native';
import { COLORS } from '../../lib/consts';
import { Text, View } from '../Themed';

const WorkoutItem = ({ date, id }: any) => {
	const dateOb = fromUnixTime(date?.seconds);
	const formattedDate = format(dateOb, 'dd MMMM, yyyy');
	const router = useRouter();

	const navigateSingleWorkout = () => {
		router.push('/workout/' + id);
	};

	return (
		<Pressable
			onPress={() => navigateSingleWorkout()}
			className="relative mb-4 flex-row self-stretch overflow-hidden rounded-primary bg-highlight p-5"
		>
			<LinearGradient
				// style={styles.backgroundGradient}
				className="absolute left-0 top-0 h-36 w-36 -translate-x-[40px] -translate-y-[80px] rotate-45"
				// colors={['#4832CB', COLORS.highlight]}
				colors={[COLORS.primaryDark, COLORS.highlight]}
				start={[0, 0]}
				end={[1, 0]}
			/>
			<Text className="text-xl font-bold">{formattedDate}</Text>
		</Pressable>
	);
};
export default WorkoutItem;
