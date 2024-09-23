import parseISO from 'date-fns/parseISO';

export interface Props {
  dateString: string;
  className?: string;
}

export function DateFormatter({ dateString, className }: Props) {
  const date = parseISO(dateString);
  return (
    <time class={className} dateTime={dateString}>
      {date.toLocaleDateString(undefined, {
        month: 'long',
        year: 'numeric',
        day: 'numeric',
      })}
    </time>
  );
}
