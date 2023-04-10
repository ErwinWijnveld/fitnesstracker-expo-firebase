import React, { useCallback } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

import { Colors } from '../config';

export const Button = ({
	children,
	onPress,
	activeOpacity = 0.3,
	borderless = false,
	title,
	style,
	...rest
}: any) => {
	const _style = useCallback(
		({ pressed }: any) => [style, { opacity: pressed ? activeOpacity : 1 }],
		[]
	);

	if (borderless) {
		return (
			<Pressable {...rest} onPress={onPress} style={_style}>
				<Text style={styles.borderlessButtonText}>{title}</Text>
			</Pressable>
		);
	}

	return (
		<Pressable {...rest} onPress={onPress} style={_style}>
			{children}
		</Pressable>
	);
};

const styles = StyleSheet.create({
	borderlessButtonText: {
		fontSize: 16,
		color: Colors.blue,
	},
});
