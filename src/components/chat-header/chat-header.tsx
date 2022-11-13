import { FC } from 'react';
import { setLoggedIn } from '../../store/authSlice';
import { useAppDispatch } from '../../store/hooks';
import { clearUserRoom, IUser } from '../../store/usersSlice';
import styles from './chat-header.module.css';
import { IChatHeader } from './chat-header.props';

export const ChatHeader: FC<IChatHeader> = () => {
	const dispatch = useAppDispatch();

	const loggedInUser: IUser = JSON.parse(sessionStorage.getItem('loggedInUser') as string);

	const onLogout = () => {
		console.log(loggedInUser);
		if (loggedInUser.currentRoom) dispatch(clearUserRoom(loggedInUser?.id));
		dispatch(setLoggedIn(false));
		sessionStorage.removeItem('loggedInUser');
		sessionStorage.removeItem('loggedIn');
	};

	return (
		<header className={styles.chatHeader}>
			<p>{loggedInUser.name}</p>
			<p>{loggedInUser.currentRoom?.name}</p>
			<button className={styles.chatHeader__logoutBtn} type="button" onClick={onLogout}>Logout</button>
		</header>
	);
};
