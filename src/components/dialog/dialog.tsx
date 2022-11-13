import { FC, useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { IMessage, selectMessage } from '../../store/messagesSlice';
import { IUser } from '../../store/usersSlice';
import { Message } from '../message/message';
import styles from './dialog.module.css';
import { IDialog } from './dialog.props';

export const Dialog: FC<IDialog> = () => {
	const dispatch = useAppDispatch();

	const bottomRef = useRef<null | HTMLDivElement>(null);
	const loggedInUser: IUser = JSON.parse(sessionStorage.getItem('loggedInUser') as string);
	const messagesList = useAppSelector((store) => store.messages.messagesList);
	const filteredMessagesByRoom = loggedInUser ? messagesList.filter((message) => message.currentRoom === loggedInUser.currentRoom?.id) : [];
	const selectedMessage = useAppSelector((store) => store.messages.selectedMessage);

	const selectMessageHandler = (message: IMessage) => {
		selectedMessage?.id === message.id ? dispatch(selectMessage(null)) : dispatch(selectMessage(message));
	};

	useEffect(() => {
		bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
	}, [messagesList]);

	return (
  <ul className={styles.dialog}>
    {filteredMessagesByRoom.map((message) => {
			const isAuthorLoggedInUser = message.author.id === loggedInUser.id;
			return (
				<li
					key={message.id}
					style={{ alignSelf: `${isAuthorLoggedInUser ? 'flex-end' : 'flex-start'}` }}
					onClick={() => selectMessageHandler(message)}
				>
					<Message
						id={message.id}
						type={isAuthorLoggedInUser ? 'mine' : 'other'}
						date={message.date}
						author={message.author.name}
						text={message.text}
						quote={{
							quotedAuthor: message.quote?.quotedAuthor as string,
							quoteText: message.quote?.quoteText as string,
						}}
					/>
				<div ref={bottomRef} />
				</li>
			);
		})}
  </ul>
	);
};
