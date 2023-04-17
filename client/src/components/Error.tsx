import { useSpring, animated } from '@react-spring/web';
import { useHeight } from '../hooks/useHeight';

export interface ErrorProps {
  error?: boolean;
  errorMessage?: string;
  id: string;
  duration?: number;
  htmlFor?: string;
}

export const Error = ({
  error,
  errorMessage,
  id,
  duration = 200,
  htmlFor,
}: ErrorProps) => {
  const [errorRef, errorHeight] = useHeight();
  const animateError = useSpring({
    from: { opacity: 0, height: 0 },
    to: { opacity: error ? 1 : 0, height: error ? errorHeight : 0 },
    config: { duration },
  });

  return (
    <animated.div id={id} style={{ ...animateError, overflow: 'hidden' }}>
      <div
        ref={errorRef}
        id='inline-errmsg'
        style={{
          color: '#cc0033',
          fontWeight: 600,
          lineHeight: '2.4rem',
        }}>
        {htmlFor ? (
          <label htmlFor={htmlFor}>{errorMessage}</label>
        ) : (
          errorMessage
        )}
      </div>
    </animated.div>
  );
};
