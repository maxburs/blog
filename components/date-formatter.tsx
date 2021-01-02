import { parseISO, format } from 'date-fns';

interface Props {
  dateString: string;
}

export const DateFormatter: React.FC<Props> = ({ dateString }) => {
  const date = parseISO(dateString);
  return <time dateTime={dateString}>{format(date, 'LLLL	d, yyyy')}</time>;
};
