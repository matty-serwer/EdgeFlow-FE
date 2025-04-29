import React, { useEffect, useState } from 'react';
import { connectStomp, disconnectStomp } from './utils/stompClient';

export default function App() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    connectStomp(setData);
    return () => disconnectStomp();
  }, []);

  return (
    <div>
      <h1>EdgeFlow Dashboard</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}