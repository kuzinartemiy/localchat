import { FC } from 'react';
import { ChatHeader } from '../chat-header/chat-header';
import { Dialog } from '../dialog/dialog';
import { MessageForm } from '../message-form/message-form';
import styles from './chat.module.css';
import { IChat } from './chat.props';

export const Chat: FC<IChat> = () => {
	return (
		<div className={styles.chat}>
			<ChatHeader />
			<Dialog />
			<MessageForm />
		</div>
	);
};
