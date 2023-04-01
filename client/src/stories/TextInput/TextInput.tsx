export interface TextInputProps {
  id: string;
  title: string;
  description: string;
}

export const TextInput = ({ id, title, description }: TextInputProps) => {
  return (
    <div id={id}>
      <h2 className='text-2xl mt-4'>{title}</h2>
      <p className='text-gray-500 text-sm'>{description}</p>
      <input type='text' placeholder={title} />
    </div>
  );
};
