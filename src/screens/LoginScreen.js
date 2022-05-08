import React, { useState } from 'react';
import {
	StyleSheet,
	TextInput,
	View,
	TouchableOpacity,
	ActivityIndicator,
	Modal,
	ScrollView,
	Text,
	Alert,
	Linking,
} from 'react-native';
import { signInWithEmailAndPassword } from '../utils/AuthProvider';
import COLORS from '../styles/colors';

const LoginScreen = ({ navigation }) => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const signIn = async () => {
		setError('');
		console.log('Validating...', { username, password });

		if (!username) {
			setError('Username cannot be empty!');
			return;
		}

		if (!password) {
			setError('Password cannot be empty!');
			return;
		}

		setIsLoading(true);
		console.log('Signinig in...');

		const result = await signInWithEmailAndPassword(username, password);

		if ( result.isSuccess === true ) {
			navigation.navigate('HomeScreen');
		}

		setTimeout(() => {
			setIsLoading(false);
		}, 100);

		if (result.errorMessage) {
			setError(result.errorMessage);
		}
	};

	const Loader = () => {
		if (isLoading) {
			return (
				<Modal visible={isLoading} transparent={true}>
					<View style={styles.loaderStyle}>
						<ActivityIndicator color={'#F9CD1B'} size={'large'} />
					</View>
				</Modal>
			);
		} else {
			return <></>;
		}
	};

	return (
		<ScrollView contentContainerStyle={styles.container}>
			<Text style={styles.titleText}>Login Here!</Text>
			<View style={{ marginBottom: 50 }} />
			<TextInput
				style={styles.textInput}
				placeholder="Email"
				onChangeText={text => setUsername(text.trim())}
			/>
			<TextInput
				secureTextEntry={true}
				style={styles.textInput}
				placeholder="Password"
				onChangeText={text => setPassword(text)}
			/>
			<TouchableOpacity style={styles.signInButton} onPress={signIn}>
				<Text style={styles.signInButtonText}>Login</Text>
			</TouchableOpacity>
			<Text style={styles.errorText}>{error}</Text>
			<Loader />
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 20,
		flex: 1,
		justifyContent: 'center',
	},
	signInButton: {
		borderRadius: 30,
		margin: 10,
		padding: 15,
		backgroundColor: '#F9CD1B',
		alignItems: 'center',
		elevation: 3,
	},
	signInButtonText: {
		fontWeight: '700',
		fontSize: 20,
	},
	headerText: {
		alignSelf: 'center',
		padding: 15,
		fontSize: 20,
		color: '#303030',
	},
	errorText: {
		alignSelf: 'center',
		padding: 15,
		color: 'red',
		fontWeight: '500',
		fontSize: 20,
		textAlign: 'center',
		minHeight: 100,
	},
	textInput: {
		borderRadius: 30,
		margin: 10,
		padding: 15,
		borderColor: COLORS.gray,
		borderWidth: 0.8,
		fontSize: 18,
		textAlign: 'center',
	},
	appLogo: {
		alignSelf: 'center',
		width: 80,
		height: 80,
		marginTop: 10,
		borderRadius: 7,
	},
	dmcLogo: {
		alignSelf: 'center',
		width: 100,
		height: 100,
		marginTop: 10,
		borderRadius: 7,
	},
	titleText: {
		textAlign: 'center',
		paddingTop: 5,
		fontSize: 22,
		color: '#303030',
		fontWeight: '500',
		fontFamily: 'Barlow-Medium',
	},
	loaderStyle: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'rgba(0,0,0,0.5)',
	},
	forgotPassword: {
		textAlign: 'center',
		paddingLeft: 25,
		fontSize: 16,
		color: 'black',
		textDecorationLine: 'underline',
		marginTop: 40,
	},
});

export default LoginScreen;
