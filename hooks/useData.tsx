import { createContext, useContext, useState } from 'react';
import { getWorkoutData } from '../lib/workouts';

const DataContext = createContext<any>(undefined);

const DataProvider = ({ children, ...rest }: any) => {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const fetchData = async ({ fetchFunction }: any) => {
		setLoading(true);

		// replace with dynamic function
		fetchFunction()
			.then((response: any) => {
				setData(response);
				setLoading(false);
			})
			.catch((error: any) => {
				setError(error);
				setLoading(false);
			});
	};

	return (
		<DataContext.Provider
			{...rest}
			value={{ data, loading, error, fetchData }}
		>
			{children}
		</DataContext.Provider>
	);
};

export const useData = () => {
	const context = useContext(DataContext);

	// if you are trying to use this hook outside of a provider
	if (context === undefined) {
		throw new Error('Use it inside of a provider.');
	}

	return {
		data: context.data,
		loading: context.loading,
		error: context.error,
		fetchData: context.fetchData,
	};
};

export default DataProvider;
