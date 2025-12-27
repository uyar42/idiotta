class SoundManager {
    constructor() {
        this.ctx = null;
        this.chainsawOsc = null;
    }

    init() {
        if (!this.ctx) {
            this.ctx = new (window.AudioContext || window.webkitAudioContext)();
            console.log('AudioContext initialized');
        }
        if (this.ctx.state === 'suspended') {
            this.ctx.resume().then(() => console.log('AudioContext resumed'));
        }
    }

    playHammer() {
        this.init();
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(150, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(40, this.ctx.currentTime + 0.1);

        gain.gain.setValueAtTime(0.5, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.2);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start();
        osc.stop(this.ctx.currentTime + 0.2);

        // Noise burst for impact
        const noise = this.ctx.createBufferSource();
        const bufferSize = this.ctx.sampleRate * 0.1;
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;

        noise.buffer = buffer;
        const noiseGain = this.ctx.createGain();
        noiseGain.gain.setValueAtTime(0.2, this.ctx.currentTime);
        noiseGain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.05);

        noise.connect(noiseGain);
        noiseGain.connect(this.ctx.destination);
        noise.start();
    }

    playGun() {
        this.init();
        const noise = this.ctx.createBufferSource();
        const bufferSize = this.ctx.sampleRate * 0.05;
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;

        noise.buffer = buffer;
        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.05);

        noise.connect(gain);
        gain.connect(this.ctx.destination);
        noise.start();
    }

    startChainsaw() {
        this.init();
        if (this.chainsawOsc) return;

        this.chainsawOsc = this.ctx.createOscillator();
        this.chainsawGain = this.ctx.createGain();

        this.chainsawOsc.type = 'sawtooth';
        this.chainsawOsc.frequency.setValueAtTime(60, this.ctx.currentTime);

        this.chainsawGain.gain.setValueAtTime(0.05, this.ctx.currentTime);

        this.chainsawOsc.connect(this.chainsawGain);
        this.chainsawGain.connect(this.ctx.destination);

        this.chainsawOsc.start();
    }

    stopChainsaw() {
        if (this.chainsawOsc) {
            this.chainsawGain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.1);
            this.chainsawOsc.stop(this.ctx.currentTime + 0.1);
            this.chainsawOsc = null;
        }
    }

    startFlame() {
        this.init();
        if (this.flameOsc) return;

        this.flameOsc = this.ctx.createBufferSource();
        const bufferSize = this.ctx.sampleRate * 2;
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;

        this.flameOsc.buffer = buffer;
        this.flameOsc.loop = true;

        this.flameFilter = this.ctx.createBiquadFilter();
        this.flameFilter.type = 'lowpass';
        this.flameFilter.frequency.setValueAtTime(400, this.ctx.currentTime);

        this.flameGain = this.ctx.createGain();
        this.flameGain.gain.setValueAtTime(0, this.ctx.currentTime);
        this.flameGain.gain.linearRampToValueAtTime(0.1, this.ctx.currentTime + 0.1);

        this.flameOsc.connect(this.flameFilter);
        this.flameFilter.connect(this.flameGain);
        this.flameGain.connect(this.ctx.destination);
        this.flameOsc.start();
    }

    stopFlame() {
        if (this.flameOsc) {
            this.flameGain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 0.1);
            this.flameOsc.stop(this.ctx.currentTime + 0.2);
            this.flameOsc = null;
        }
    }

    playFlame() {
        this.startFlame();
        setTimeout(() => this.stopFlame(), 200);
    }
}

export const soundManager = new SoundManager();
