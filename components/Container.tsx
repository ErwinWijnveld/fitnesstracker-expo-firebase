import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { View } from './Themed';

const Container = ({ children, className, ...rest }: any) => {
	const insets = useSafeAreaInsets();

	return (
		<View className="flex-1 bg-dark px-8">
			<View className="flex-1" style={{ paddingTop: insets.top }}>
				{children}
			</View>
		</View>
	);
};
export default Container;
