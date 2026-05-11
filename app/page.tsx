import Counter from '@/components/Counter';

export default function HomePage() {
  return (
    <main style={{ padding: '2rem', textAlign: 'center', maxWidth: '32rem' }}>
      <h1 style={{ margin: 0, fontSize: '1.5rem' }}>Mergecrew sample app</h1>
      <p style={{ marginTop: '0.5rem', opacity: 0.75 }}>
        Press the buttons. One of them does the wrong thing — connect this repo
        to a Mergecrew install and watch the agent loop find and fix it.
      </p>
      <Counter />
    </main>
  );
}
