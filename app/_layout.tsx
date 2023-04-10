import { Slot } from 'expo-router';
import { Provider } from '../hooks/auth';
import useCachedResources from '../hooks/useCachedResources';

export const unstable_settings = {
	// Ensure any route can link back to `/`
	initialRouteName: '(slot)',
};

const Root = () => {
	const isLoadingComplete = useCachedResources();

	if (!isLoadingComplete) {
		return null;
	} else {
		return (
			<Provider>
				<Slot />
			</Provider>
		);
	}
};
export default Root;
