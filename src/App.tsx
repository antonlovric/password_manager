import { useState } from 'react';
import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Button } from '@mui/material';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Button variant='contained'>Henlo</Button>
    </div>
  );
}

export default App;
