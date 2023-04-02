export interface CheckboxProps {
  id: string;
  children: JSX.Element | string;
  perk: string;
  onChange: (val: any) => unknown;
  checked: boolean;
}

export const Checkbox = ({
  id,
  children,
  perk,
  onChange,
  checked,
}: CheckboxProps) => {
  return (
    <label
      id={id}
      className='border p-4 flex rounded-2xl gap-2 items-cente cursor-pointerr'>
      <input type='checkbox' checked={checked} name={id} onChange={onChange} />
      {children}
      <span>{perk}</span>
    </label>
  );
};

export default Checkbox;
