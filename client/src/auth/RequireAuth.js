import React from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from './useAuth';

export const RequireAuth = ({ children }) => {
	const { authed } = useAuth();
	const navigate = useNavigate();

	// Redirect to /login if the user is not authenticated within 1.5 seconds
	React.useEffect(() => {
		const clear = setTimeout(() => {
			!authed && navigate('/login');
		}, 1500);
		return () => clearTimeout(clear);
	}, [authed, navigate]);

	return (
<<<<<<< HEAD
		<>
			<div>
				{/* If app is loaded, we are passing the user and isAuthenticated values as a global state */}
				{authed ? (
					children
				) : (
					<div>
						<div className='flex justify-center mt-10'>
							<button className='btn loading text-base-100'>loading</button>
						</div>
					</div>
				)}
			</div>
		</>
=======
		<div>
			{/* If app is loaded, we are passing the user and isAuthenticated values as a global state */}
			{authed ? (
				children
			) : (
				<div>
					<div className='flex justify-center mt-10'>
						<button className='btn loading text-base-100'>loading</button>
					</div>
				</div>
			)}
		</div>
>>>>>>> main-holder
	);
};