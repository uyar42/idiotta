import React, { useEffect, useRef, useState } from 'react';
import { ParticleSystem } from '../engine/ParticleSystem';
import { Tools } from '../engine/Tools';
import { soundManager } from '../engine/SoundManager';

const DesktopCanvas = ({ selectedTool, onAction }) => {
    const canvasRef = useRef(null);
    const particleCanvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [lastPos, setLastPos] = useState({ x: 0, y: 0 });
    const particles = useRef(new ParticleSystem());
    const isChainsawActive = useRef(false);
    const isFlameActive = useRef(false);

    useEffect(() => {
        const handleResize = () => {
            const { innerWidth, innerHeight } = window;
            [canvasRef.current, particleCanvasRef.current].forEach(canvas => {
                if (canvas) {
                    canvas.width = innerWidth;
                    canvas.height = innerHeight;
                }
            });
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        let animationFrame;
        const render = () => {
            const ctx = particleCanvasRef.current?.getContext('2d');
            if (ctx) {
                ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
                particles.current.update();
                particles.current.draw(ctx);
            }
            animationFrame = requestAnimationFrame(render);
        };
        render();

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrame);
        };
    }, []);

    const handleMouseDown = (e) => {
        setIsDrawing(true);
        setLastPos({ x: e.clientX, y: e.clientY });

        if (selectedTool === 'chainsaw') {
            soundManager.startChainsaw();
            isChainsawActive.current = true;
        }

        if (selectedTool === 'flame') {
            soundManager.startFlame();
            isFlameActive.current = true;
        }

        performAction(e.clientX, e.clientY);
    };

    const handleMouseMove = (e) => {
        if (!isDrawing) return;
        performAction(e.clientX, e.clientY);
        setLastPos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseUp = () => {
        setIsDrawing(false);
        if (isChainsawActive.current) {
            soundManager.stopChainsaw();
            isChainsawActive.current = false;
        }
        if (isFlameActive.current) {
            soundManager.stopFlame();
            isFlameActive.current = false;
        }
    };

    const performAction = (x, y) => {
        const ctx = canvasRef.current.getContext('2d');
        const tool = Object.values(Tools).find(t => t.id === selectedTool);

        if (!tool) return;

        if (tool.id === 'chainsaw') {
            tool.draw(ctx, x, y, lastPos.x, lastPos.y);
            if (Math.random() > 0.3) particles.current.addParticle(x, y, 'spark');
        } else {
            tool.draw(ctx, x, y);
        }

        if (tool.id === 'hammer') {
            onAction('shake');
            soundManager.playHammer();
            for (let i = 0; i < 10; i++) particles.current.addParticle(x, y, 'spark');
        }

        if (tool.id === 'gun') {
            onAction('shake-light');
            soundManager.playGun();
            particles.current.addParticle(x, y, 'spark');
        }

        if (tool.id === 'flame') {
            particles.current.addParticle(x, y, 'smoke');
        }
    };

    return (
        <div className="desktop-container" onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
            <canvas ref={canvasRef} className="canvas-layer" />
            <canvas ref={particleCanvasRef} className="canvas-layer" />
            <div className="instruction-overlay">
                <h1>Desktop Destroyer</h1>
                <p>Choose a tool and destroy your desktop!</p>
            </div>
        </div>
    );
};

export default DesktopCanvas;
