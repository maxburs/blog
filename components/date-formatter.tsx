import { parseISO, format } from 'date-fns';

interface Props {
  dateString: string;
  className?: string;
}

export const DateFormatter: React.FC<Props> = ({ dateString, className }) => {
  const date = parseISO(dateString);
  return (
    <time className={className} dateTime={dateString}>
      {format(date, 'LLLL	d, yyyy')}
    </time>
  );
};
