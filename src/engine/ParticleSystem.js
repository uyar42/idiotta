export class ParticleSystem {
  constructor() {
    this.particles = [];
  }

  addParticle(x, y, type) {
    const particle = {
      x,
      y,
      vx: (Math.random() - 0.5) * (type === 'spark' ? 10 : 2),
      vy: (Math.random() - 0.5) * (type === 'spark' ? 10 : 2) - (type === 'smoke' ? 2 : 0),
      life: 1.0,
      decay: Math.random() * 0.05 + 0.02,
      size: type === 'spark' ? Math.random() * 3 + 1 : Math.random() * 10 + 5,
      color: type === 'spark' ? `hsl(${Math.random() * 40 + 20}, 100%, 50%)` : `rgba(100, 100, 100, ${Math.random() * 0.5})`,
      type
    };
    this.particles.push(particle);
  }

  update() {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.life -= p.decay;

      if (p.type === 'smoke') {
        p.size += 0.2;
        p.vy *= 0.98;
      }

      if (p.life <= 0) {
        this.particles.splice(i, 1);
      }
    }
  }

  draw(ctx) {
    this.particles.forEach(p => {
      ctx.globalAlpha = p.life;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      if (p.type === 'spark') {
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      } else {
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      }
      ctx.fill();
    });
    ctx.globalAlpha = 1.0;
  }
}
