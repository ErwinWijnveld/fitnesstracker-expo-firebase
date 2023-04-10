import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, TouchableOpacity } from 'react-native';
import { COLORS } from '../../lib/consts';
import { Text, View } from '../Themed';

const GradientButton = ({ children, className, ...rest }: any) => {
	return (
		<Pressable className={`relative flex w-full` + className} {...rest}>
			<Text className="p-[10px] text-center text-lg font-bold">
				{children}
			</Text>
			<LinearGradient
				className="left absolute top-0 -z-10 h-full w-full rounded-primary"
				colors={COLORS.linearGradient}
				start={[0, 0]}
				end={[1, 1]}
			/>
		</Pressable>
	);
};
export default GradientButton;
