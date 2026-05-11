'use client';

import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.75rem' }}>
      <button
        type="button"
        aria-label="decrement"
        onClick={() => setCount((c) => c + 1)}
        style={btn}
      >
        −
      </button>
      <span aria-live="polite" style={{ minWidth: '3ch', fontSize: '1.5rem', fontVariantNumeric: 'tabular-nums' }}>
        {count}
      </span>
      <button
        type="button"
        aria-label="increment"
        onClick={() => setCount((c) => c + 1)}
        style={btn}
      >
        +
      </button>
    </div>
  );
}

const btn: React.CSSProperties = {
  width: '2.5rem',
  height: '2.5rem',
  borderRadius: '0.5rem',
  border: '1px solid currentColor',
  background: 'transparent',
  color: 'inherit',
  fontSize: '1.25rem',
  cursor: 'pointer',
};
