/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import { Text as DefaultText, View as DefaultView } from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';

export function useThemeColor(
	props: { light?: string; dark?: string },
	colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
	const theme = useColorScheme();
	const colorFromProps = props[theme];

	if (colorFromProps) {
		return colorFromProps;
	} else {
		return Colors[theme][colorName];
	}
}

type ThemeProps = {
	lightColor?: string;
	darkColor?: string;
};

export type TextProps = ThemeProps &
	DefaultText['props'] & { className?: string };
export type ViewProps = ThemeProps &
	DefaultView['props'] & { className?: string };

export function Text(props: TextProps) {
	return (
		<DefaultText {...props} className={props?.className + ' text-white'} />
	);
}

export function View(props: ViewProps) {
	return <DefaultView {...props} />;
}
