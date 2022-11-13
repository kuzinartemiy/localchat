/* eslint-disable @typescript-eslint/no-explicit-any */
import { nanoid } from 'nanoid';
import { FC, FormEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addMessage, IMessage, selectMessage } from '../../store/messagesSlice';
import { IUser } from '../../store/usersSlice';
import EmojiPicker from './emoji-picker';
import styles from './message-form.module.css';
import { IMessageForm } from './message-form.props';

export const MessageForm: FC<IMessageForm> = () => {
	const [showEmojis, setShowEmojis] = useState<boolean>(false);
	const [message, setMessage] = useState<string>('');

	const dispatch = useAppDispatch();

	const selectedMessage = useAppSelector((store) => store.messages.selectedMessage);

	const loggedInUser: IUser = JSON.parse(sessionStorage.getItem('loggedInUser') as string);

	const sendMessage = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (loggedInUser && loggedInUser.currentRoom) {
			setMessage('');
			const newMessage: IMessage = {
				id: nanoid(),
				text: message,
				author: {
					id: loggedInUser.id,
					name: loggedInUser.name,
				},
				date: new Date().toLocaleString(),
				currentRoom: loggedInUser.currentRoom.id,
			};
			if (selectedMessage) {
				newMessage.quote = {
					quoteText: selectedMessage?.text,
					quotedAuthor: selectedMessage?.author.name,
				};
				dispatch(selectMessage(null));
			}
			dispatch(addMessage(newMessage));
		}
		setShowEmojis(false);
	};

	const addEmoji = (e: any) => {
    const sym: [] = e.unified.split('-');
    const codesArray: Array<any> = [];
    sym.forEach((el) => codesArray.push(`0x${el}`));
    const emoji = String.fromCodePoint(...codesArray);
    setMessage(message + emoji);
  };

	return (
  <form onSubmit={sendMessage} className={styles.messageForm}>
    <input required value={message} onChange={(event) => setMessage(event.target.value)} className={styles.messageForm__input} />
    <button className={styles.messageForm__sendBtn} type="submit" />
    {showEmojis && (
			<div className={styles.messageForm__emojiPicker}>
				<EmojiPicker
					onEmojiSelect={addEmoji}
				/>
			</div>
    )}
    <button className={styles.messageForm__emojiBtn} type="button" onClick={() => setShowEmojis(!showEmojis)} />
  </form>
	);
};
