export const Tools = {
    HAMMER: {
        id: 'hammer',
        name: 'Hammer',
        draw: (ctx, x, y) => {
            ctx.strokeStyle = '#333';
            ctx.lineWidth = 2;
            ctx.beginPath();
            // Draw a "glass crack" effect
            for (let i = 0; i < 8; i++) {
                const angle = Math.random() * Math.PI * 2;
                const length = Math.random() * 40 + 20;
                ctx.moveTo(x, y);
                ctx.lineTo(x + Math.cos(angle) * length, y + Math.sin(angle) * length);

                // Small sub-cracks
                const subAngle = angle + (Math.random() - 0.5);
                ctx.moveTo(x + Math.cos(angle) * (length * 0.5), y + Math.sin(angle) * (length * 0.5));
                ctx.lineTo(x + Math.cos(subAngle) * (length * 0.8), y + Math.sin(subAngle) * (length * 0.8));
            }
            ctx.stroke();

            // Impact spot
            ctx.fillStyle = 'rgba(0,0,0,0.2)';
            ctx.beginPath();
            ctx.arc(x, y, 10, 0, Math.PI * 2);
            ctx.fill();
        }
    },
    MACHINE_GUN: {
        id: 'gun',
        name: 'Machine Gun',
        draw: (ctx, x, y) => {
            ctx.fillStyle = '#111';
            ctx.beginPath();
            ctx.arc(x, y, 4, 0, Math.PI * 2);
            ctx.fill();

            ctx.strokeStyle = '#444';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.arc(x, y, 6, 0, Math.PI * 2);
            ctx.stroke();
        }
    },
    CHAINSAW: {
        id: 'chainsaw',
        name: 'Chainsaw',
        draw: (ctx, x, y, lastX, lastY) => {
            if (!lastX) return;
            ctx.strokeStyle = 'rgba(50, 50, 50, 0.8)';
            ctx.lineWidth = 4;
            ctx.beginPath();
            ctx.moveTo(lastX, lastY);
            ctx.lineTo(x, y);
            ctx.stroke();

            // Scratches
            ctx.strokeStyle = 'rgba(0,0,0,0.4)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(lastX + 2, lastY + 2);
            ctx.lineTo(x + 2, y + 2);
            ctx.stroke();
        }
    },
    FLAMETHROWER: {
        id: 'flame',
        name: 'Flamethrower',
        draw: (ctx, x, y) => {
            const gradient = ctx.createRadialGradient(x, y, 0, x, y, 25);
            gradient.addColorStop(0, 'rgba(0, 0, 0, 0.6)');
            gradient.addColorStop(0.5, 'rgba(50, 20, 0, 0.3)');
            gradient.addColorStop(1, 'rgba(100, 50, 0, 0)');

            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(x, y, 25, 0, Math.PI * 2);
            ctx.fill();
        }
    },
    WASHER: {
        id: 'washer',
        name: 'Washer',
        draw: (ctx, x, y) => {
            ctx.save();
            ctx.globalCompositeOperation = 'destination-out';
            ctx.fillStyle = 'white';
            ctx.beginPath();
            ctx.arc(x, y, 60, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
    }
};
