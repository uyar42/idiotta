import React, { useState } from 'react';
import DesktopCanvas from './components/DesktopCanvas';
import Toolbar from './components/Toolbar';

const App = () => {
  const [selectedTool, setSelectedTool] = useState('hammer');
  const [isShaking, setIsShaking] = useState(false);

  const handleAction = (type) => {
    if (type === 'shake') {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 200);
    }
    if (type === 'shake-light') {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 100);
    }
  };

  return (
    <div className={`app-root ${isShaking ? 'shake' : ''}`}>
      <DesktopCanvas selectedTool={selectedTool} onAction={handleAction} />
      <Toolbar activeTool={selectedTool} onSelect={(id) => setSelectedTool(id)} />
    </div>
  );
};

export default App;
