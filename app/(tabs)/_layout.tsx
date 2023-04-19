import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { COLORS } from '../../lib/consts';

const TabLayout = () => {
	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: COLORS.primary,
				headerShown: false,
				// change the color of the tab bar
				tabBarStyle: {
					backgroundColor: COLORS.dark,
					borderTopColor: COLORS.dark,
				},
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					tabBarLabel: 'Home',
					tabBarIcon: ({ color, size }: any) => (
						<MaterialCommunityIcons
							name="home"
							color={color}
							size={size}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="workouts"
				options={{
					tabBarLabel: 'Workouts',
					tabBarIcon: ({ color, size }: any) => (
						<MaterialCommunityIcons
							name="dumbbell"
							color={color}
							size={size}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="workout/[workoutId]"
				options={{
					href: null,
				}}
			/>
		</Tabs>
	);
};

export default TabLayout;
