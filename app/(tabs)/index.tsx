import { Text, View } from '../../components/Themed';
import { useAuth } from '../../hooks/auth';

const Index = () => {
	const { signOut } = useAuth();
	return (
		<View
			style={{
				flex: 1,
				alignItems: 'center',
				justifyContent: 'center',
			}}
			className="bg-dark"
		>
			<Text onPress={() => signOut()}>Signout</Text>
		</View>
	);
};
export default Index;
