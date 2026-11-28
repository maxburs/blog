export interface DateFormatterProps {
  /** `yyyy-mm-dd` */
  dateString: string;
  class?: string;
}

export function DateFormatter(props: DateFormatterProps) {
  return (
    <time class={props.class} datetime={props.dateString}>
      {/* Fixed locale and time zone so the prerendered date matches what
          client-side navigation renders. */}
      {new Date(props.dateString).toLocaleDateString('en-US', {
        timeZone: 'UTC',
        month: 'long',
        year: 'numeric',
        day: 'numeric',
      })}
    </time>
  );
}
