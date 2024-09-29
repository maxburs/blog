import parseISO from 'date-fns/parseISO';

export interface Props {
  dateString: string;
  className?: string;
}

export const DateFormatter: React.FC<Props> = ({ dateString, className }) => {
  const date = parseISO(dateString);
  return (
    <time className={className} dateTime={dateString}>
      {date.toLocaleDateString(undefined, {
        month: 'long',
        year: 'numeric',
        day: 'numeric',
      })}
    </time>
  );
};
