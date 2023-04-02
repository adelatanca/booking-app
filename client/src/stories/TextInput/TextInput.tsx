export interface TextInputProps {
  id: string;
  title: string;
  description: string;
  value: string;
  onChange: (val: string) => unknown;
}

export const TextInput = ({
  id,
  title,
  description,
  value,
  onChange,
}: TextInputProps) => {
  return (
    <div id={id}>
      <h2 className='text-2xl mt-4'>{title}</h2>
      <p className='text-gray-500 text-sm'>{description}</p>
      <input
        type='text'
        value={value}
        onChange={(ev) => onChange(ev.target.value)}
        placeholder={title}
      />
    </div>
  );
};
