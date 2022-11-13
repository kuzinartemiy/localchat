import { FC } from 'react';
import { useAppSelector } from '../../store/hooks';
import styles from './message.module.css';
import { IMessageProps } from './message.props';

export const Message: FC<IMessageProps> = ({
 id, date, author, text, type, quote,
}) => {
	const selectedMessage = useAppSelector((store) => store.messages.selectedMessage);
	const isMessageSelected: boolean = selectedMessage?.id === id;

	return (
  <div className={`${styles.message} ${isMessageSelected ? `${styles.message_selected}` : ''}`}>
    {quote && quote.quoteText
			&& (
				<div className={styles.message__quote}>
					<p className={styles.message__quoteAuthor}>{quote.quotedAuthor}</p>
					<p>{quote.quoteText}</p>
				</div>
			)}
    <p className={`${styles.message__text} ${styles[`message__text_type_${type}`]}`}>{text}</p>
    <span className={styles.message__caption}>
      <p className={styles.message__captionItem}>{date}</p>
      <p className={styles.message__captionItem}>{author}</p>
    </span>
  </div>
	);
};
