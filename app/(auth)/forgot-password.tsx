import { sendPasswordResetEmail } from 'firebase/auth';
import { Formik } from 'formik';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput } from 'react-native';

import { useRouter } from 'expo-router';
import { Button, FormErrorMessage } from '../../components';
import { View } from '../../components/Themed';
import { Colors, auth } from '../../config';
import { passwordResetSchema } from '../../utils';

export const ForgotPassword = () => {
	const [errorState, setErrorState] = useState('');
	const router = useRouter();

	const handleSendPasswordResetEmail = (values: any) => {
		const { email } = values;

		sendPasswordResetEmail(auth, email)
			.then(() => {
				console.log('Success: Password Reset Email sent.');
				router.push('/sign-in');
			})
			.catch((error) => setErrorState(error.message));
	};

	return (
		<View style={styles.container}>
			<View>
				<Text style={styles.screenTitle}>Reset your password</Text>
			</View>
			<Formik
				initialValues={{ email: '' }}
				validationSchema={passwordResetSchema}
				onSubmit={(values) => handleSendPasswordResetEmail(values)}
			>
				{({
					values,
					touched,
					errors,
					handleChange,
					handleSubmit,
					handleBlur,
				}) => (
					<>
						{/* Email input field */}
						<TextInput
							name="email"
							leftIconName="email"
							placeholder="Enter email"
							autoCapitalize="none"
							keyboardType="email-address"
							textContentType="emailAddress"
							value={values.email}
							onChangeText={handleChange('email')}
							onBlur={handleBlur('email')}
						/>
						<FormErrorMessage
							error={errors.email}
							visible={touched.email}
						/>
						{/* Display Screen Error Mesages */}
						{errorState !== '' ? (
							<FormErrorMessage
								error={errorState}
								visible={true}
							/>
						) : null}
						{/* Password Reset Send Email  button */}
						<Button style={styles.button} onPress={handleSubmit}>
							<Text style={styles.buttonText}>
								Send Reset Email
							</Text>
						</Button>
					</>
				)}
			</Formik>
			{/* Button to navigate to Login screen */}
			<Button
				style={styles.borderlessButtonContainer}
				borderless
				title={'Go back to Login'}
				onPress={() => router.push('sign-in')}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.white,
		paddingHorizontal: 12,
	},
	innercontainer: {
		alignItems: 'center',
	},
	screenTitle: {
		fontSize: 32,
		fontWeight: '700',
		color: Colors.black,
		paddingTop: 20,
	},
	button: {
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 8,
		backgroundColor: Colors.orange,
		padding: 10,
		borderRadius: 8,
	},
	buttonText: {
		fontSize: 20,
		color: Colors.white,
		fontWeight: '700',
	},
	borderlessButtonContainer: {
		marginTop: 16,
		alignItems: 'center',
		justifyContent: 'center',
	},
});
