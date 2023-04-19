import { LinearGradient } from 'expo-linear-gradient';
import { Pressable } from 'react-native';
import { COLORS } from '../../lib/consts';
import { Text } from '../Themed';

const ExerciseItem = ({ exerciseType, sets }: any) => {
	return (
		<Pressable className="relative mb-4 flex-col self-stretch overflow-hidden rounded-primary bg-highlight px-5 py-4">
			<LinearGradient
				// style={styles.backgroundGradient}
				className="absolute left-0 top-0 h-40 w-40 -translate-x-[40px] -translate-y-[70px] rotate-45"
				// colors={['#4832CB', COLORS.highlight]}
				colors={[COLORS.primaryDark, COLORS.highlight]}
				start={[0, 0]}
				end={[1, 0]}
			/>
			<Text className="text-xl font-bold">{exerciseType?.name}</Text>
			<Text>
				Sets: <Text className="font-bold">{sets?.length}</Text>
			</Text>
		</Pressable>
	);
};
export default ExerciseItem;
