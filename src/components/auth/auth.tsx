import { nanoid } from 'nanoid';
import {
 ChangeEvent, FC, FormEvent, useState,
} from 'react';
import { setLoggedIn } from '../../store/authSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
 addUserToDB, IRoom, setUserCurrenRoom,
} from '../../store/usersSlice';
import styles from './auth.module.css';
import { IAuth } from './auth.props';

const roomsOptions: IRoom[] = [
	{
		id: '1',
		name: 'Room_1',
		value: 'room_1',
	},
	{
		id: '2',
		name: 'Room_2',
		value: 'room_2',
	},
	{
		id: '3',
		name: 'Room_3',
		value: 'room_3',
	},
	{
		id: '4',
		name: 'Room_4',
		value: 'room_4',
	},
	{
		id: '5',
		name: 'Room_5',
		value: 'room_5',
	},
];

export const Auth: FC<IAuth> = () => {
	const dispatch = useAppDispatch();
	const [name, setName] = useState<string>('');
	const [selectedRoom, setSelectedRoom] = useState<IRoom>(roomsOptions[0]);

	const users = useAppSelector((store) => store.users.usersdb);

	const authFormSubmitHandler = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const existedUser = users.find((user) => user.name === name);
		if (existedUser) {
			if (existedUser.currentRoom) return alert('This user logged in!');

			dispatch(setUserCurrenRoom({
				room: selectedRoom,
				userId: existedUser.id,
			}));

			sessionStorage.setItem('loggedIn', JSON.stringify(true));
			sessionStorage.setItem('loggedInUser', JSON.stringify({ ...existedUser, currentRoom: selectedRoom }));
			dispatch(setLoggedIn(true));
		} else {
			const newUser = { id: nanoid(), name, currentRoom: selectedRoom };

			dispatch(addUserToDB(newUser));

			sessionStorage.setItem('loggedIn', JSON.stringify(true));
			sessionStorage.setItem('loggedInUser', JSON.stringify(newUser));
			dispatch(setLoggedIn(true));
		}
	};

	const changeRoomHandler = (event: ChangeEvent<HTMLSelectElement>) => {
		const selectedRoomElement = roomsOptions.find((room) => room.value === event.target.value);
		setSelectedRoom(selectedRoomElement as IRoom);
	};

	return (
		<div className={styles.auth}>
			<form className={styles.auth__form} onSubmit={authFormSubmitHandler}>
				<label htmlFor="name" className={styles.auth__inputLabel}>
					<input
						className={styles.auth__input}
						id="name"
						onChange={(event) => setName(event.target.value)}
						required
						placeholder="Input yout nickname"
					/>
					<p>Name</p>
				</label>
				<p>Select Room</p>
				<select onChange={changeRoomHandler}>
					{roomsOptions.map((room) => (
						<option key={room.id} value={room.value}>{room.name}</option>
					))}
				</select>
				<button className={styles.auth__enterBtn} type="submit">Enter</button>
			</form>
		</div>
	);
};
