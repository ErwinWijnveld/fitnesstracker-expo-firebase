import { Slot, Stack } from 'expo-router';
import { Provider } from '../hooks/auth';
import useCachedResources from '../hooks/useCachedResources';
import DataProvider from '../hooks/useData';

export const unstable_settings = {
	// Ensure any route can link back to `/`
	initialRouteName: '(slot)',
};

const Root = () => {
	const isLoadingComplete = useCachedResources();

	if (!isLoadingComplete) {
		return null;
	}

	return (
		<Provider>
			<DataProvider>
				<Main />
			</DataProvider>
		</Provider>
	);
};

const Main = () => {
	return (
		<Stack
			screenOptions={{
				headerShown: false,
			}}
		>
			<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
			<Stack.Screen name="modal" options={{ presentation: 'modal' }} />
		</Stack>
	);
};
export default Root;
