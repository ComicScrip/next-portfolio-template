import { useState, useEffect } from 'react';

export default function OfflineBanner() {
  const [connected, setConnected] = useState(true);

  useEffect(() => {
    setInterval(() => setConnected(window.navigator.onLine), 500);
  }, []);

  return (
    !connected && (
      <div className='bg-amber-500 p-3 text-center sticky'>
        No connection found, working offline
      </div>
    )
  );
}
