import React from 'react';
import { Hammer, Sword, Flame, Target, Eraser } from 'lucide-react';

const tools = [
    { id: 'hammer', icon: Hammer, label: 'Hammer' },
    { id: 'gun', icon: Target, label: 'Machine Gun' },
    { id: 'chainsaw', icon: Sword, label: 'Chainsaw' },
    { id: 'flame', icon: Flame, label: 'Flamethrower' },
    { id: 'washer', icon: Eraser, label: 'Washer' },
];

const Toolbar = ({ activeTool, onSelect }) => {
    return (
        <div className="ui-layer">
            {tools.map((tool) => (
                <button
                    key={tool.id}
                    className={`tool-btn ${activeTool === tool.id ? 'active' : ''}`}
                    onClick={() => onSelect(tool.id)}
                    title={tool.label}
                >
                    <tool.icon />
                </button>
            ))}
        </div>
    );
};

export default Toolbar;
