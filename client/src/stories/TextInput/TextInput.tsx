import { Error } from '../../components/Error';
import { NumericFormat } from 'react-number-format';

export interface TextInputProps {
  id: string;
  type: 'numeric' | 'text' | 'number';
  title: string;
  description?: string;
  value: string | number | undefined;
  onChange: (val: string) => unknown;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  error?: boolean;
  errorMessage?: string;
  placeholder?: string;
}

export const TextInput = ({
  id,
  type,
  title,
  description,
  value,
  onChange,
  onBlur,
  onFocus,
  error,
  errorMessage,
  placeholder,
}: TextInputProps) => {
  return (
    <div id={id}>
      <h2 className='text-2xl mt-4'>{title}</h2>
      <p className='text-gray-500 text-sm'>{description}</p>
      {type === 'number' ? (
        <NumericFormat
          allowNegative={false}
          onBlur={onBlur}
          onFocus={onFocus}
          onValueChange={(values: any) => onChange(values.value)}
          type='tel'
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(ev) => onChange(ev.target.value)}
          onBlur={onBlur}
          onFocus={onFocus}
          placeholder={placeholder}
        />
      )}

      <Error
        error={error}
        errorMessage={errorMessage}
        id={`${id}-error`}
        htmlFor={`ui-text-input-${id}`}
      />
    </div>
  );
};
