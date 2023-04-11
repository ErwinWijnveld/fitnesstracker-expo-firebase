import React from 'react';
import { ActivityIndicator } from 'react-native';

import { COLORS } from '../lib/consts';
import { View } from './Themed';

export const LoadingIndicator = () => {
	return (
		<View className="flex-1 items-center justify-center bg-dark">
			<ActivityIndicator size="large" color={COLORS.primary} />
		</View>
	);
};
