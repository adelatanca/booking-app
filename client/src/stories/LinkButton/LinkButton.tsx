export interface LinkButtonProps {
  classType: 'profile' | 'bookings' | 'places';
  svg?: JSX.Element | string;
  text: string;
  route: string;
}

export const LinkButton = ({
  classType,
  svg,
  text,
  route,
}: LinkButtonProps) => {
  const linkClasses = ({
    type,
  }: {
    type: 'profile' | 'bookings' | 'places';
  }) => {
    let classes = 'inline-flex gap-1 py-2 px-6 rounded-full shadow-lg mt-4';
    if (type === 'profile') {
      classes += ' bg-primary text-white';
    } else {
      classes += ' bg-gray-200';
    }
    return classes;
  };

  return (
    <div className={linkClasses({ type: classType })}>
      <div> {svg}</div>
      {text}
    </div>
  );
};
