export interface CheckboxProps {
  id: string;
  children: JSX.Element | string;
  perk: string;
}

export const Checkbox = ({ id, children, perk }: CheckboxProps) => {
  return (
    <label
      id={id}
      className='border p-4 flex rounded-2xl gap-2 items-cente cursor-pointerr'>
      <input type='checkbox' />
      {children}
      <span>{perk}</span>
    </label>
  );
};

export default Checkbox;
