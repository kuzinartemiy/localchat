import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { IQuote } from '../../store/messagesSlice';

export interface IMessageProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	id: string;
	date: string;
	author: string;
	text: string;
	type: 'other' | 'mine';
	quote?: IQuote;
}
