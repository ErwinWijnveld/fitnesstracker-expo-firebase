import React from 'react';
import { View as RNView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const View = ({ isSafe, style, children, ...rest }: any) => {
	const insets = useSafeAreaInsets();

	if (isSafe) {
		return (
			<RNView {...rest} style={{ paddingTop: insets.top, ...style }}>
				{children}
			</RNView>
		);
	}

	return <RNView {...rest}>{children}</RNView>;
};
