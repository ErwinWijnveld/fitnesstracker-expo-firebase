import { Link } from 'expo-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Formik } from 'formik';
import { useState } from 'react';
import {
	KeyboardAvoidingView,
	Pressable,
	TextInput,
	TouchableOpacity,
} from 'react-native';
import { FormErrorMessage, Logo } from '../../components';
import Container from '../../components/Container';
import { Text, View } from '../../components/Themed';
import GradientButton from '../../components/buttons/GradientButton';
import Test from '../../components/buttons/Test';
import { Images, auth } from '../../config';
import { useAuth } from '../../hooks/auth';
import { loginValidationSchema } from '../../utils';

export default function SignIn() {
	const { signIn } = useAuth();
	const [errorState, setErrorState] = useState('');

	const handleLogin = (values: any) => {
		const { email, password } = values;
		signInWithEmailAndPassword(auth, email, password).catch((error) =>
			setErrorState(error.message)
		);
	};

	return (
		<>
			<Container>
				<KeyboardAvoidingView className="flex flex-1 justify-center pb-[40%]">
					{/* LogoContainer: consits app logo and screen title */}
					<View className="flex items-center pb-12">
						<Logo uri={Images.logo} />
					</View>
					<Formik
						initialValues={{
							email: '',
							password: '',
						}}
						validationSchema={loginValidationSchema}
						onSubmit={(values) => handleLogin(values)}
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
								{/* Input fields */}
								<TextInput
									name="email"
									leftIconName="email"
									placeholder="Enter email"
									placeholderTextColor={'#fff'}
									autoCapitalize="none"
									keyboardType="email-address"
									textContentType="emailAddress"
									autoFocus={true}
									value={values.email}
									onChangeText={handleChange('email')}
									onBlur={handleBlur('email')}
									className="mb-4 rounded-primary bg-highlight-secondary p-4 text-white"
								/>
								<FormErrorMessage
									error={errors.email}
									visible={touched.email}
								/>
								<TextInput
									name="password"
									leftIconName="key-variant"
									placeholder="Enter password"
									autoCapitalize="none"
									placeholderTextColor={'#fff'}
									secureTextEntry={true}
									autoCorrect={false}
									textContentType="password"
									value={values.password}
									onChangeText={handleChange('password')}
									onBlur={handleBlur('password')}
									className="mb-4 rounded-primary bg-highlight-secondary p-4 text-white"
								/>
								<FormErrorMessage
									error={errors.password}
									visible={touched.password}
								/>
								{/* Display Screen Error Mesages */}
								{errorState !== '' ? (
									<FormErrorMessage
										error={errorState}
										visible={true}
									/>
								) : null}
								{/* Login button */}
								<GradientButton onPress={handleSubmit}>
									Login
								</GradientButton>
							</>
						)}
					</Formik>
					{/* Button to navigate to SignupScreen to create a new account */}

					<Link href="/auth/forgot-password" className="mt-4">
						<Text className="text-right font-semibold text-primary">
							Forgot Password?
						</Text>
					</Link>
				</KeyboardAvoidingView>
			</Container>
			{/* App info footer */}
			<View className="absolute bottom-8 flex w-full items-center">
				<Text>
					Dont have an account?{' '}
					<TouchableOpacity
						// onPress={() => navigation.navigate('Signup')}
						className="translate-y-[2px]"
					>
						<Text className="font-semibold text-primary">
							Sign Up
						</Text>
					</TouchableOpacity>
				</Text>
			</View>
		</>
	);
}
