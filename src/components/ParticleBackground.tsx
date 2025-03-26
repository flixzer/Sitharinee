import React, { useEffect, useRef } from 'react';

const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Particle class
    class Particle {
      x: number;
      y: number;
      size: number;
      speedY: number;
      opacity: number;
      rotation: number;
      rotationSpeed: number;
      private static canvas: HTMLCanvasElement = canvas as HTMLCanvasElement;

      constructor() {
        this.x = Math.random() * Particle.canvas.width;
        this.y = Particle.canvas.height + 100; // Start below screen
        this.size = Math.random() * 30 + 10; // Random size between 10-40
        this.speedY = Math.random() * 0.5 + 0.2; // Random speed
        this.opacity = Math.random() * 0.3; // Random opacity up to 0.3
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.02;
      }

      update() {
        this.y -= this.speedY;
        this.rotation += this.rotationSpeed;
        
        // Reset particle when it goes off screen
        if (this.y < -this.size) {
          this.y = Particle.canvas.height + 100;
          this.x = Math.random() * Particle.canvas.width;
        }
      }

      draw() {
        ctx!.save();
        ctx!.translate(this.x, this.y);
        ctx!.rotate(this.rotation);
        ctx!.globalAlpha = this.opacity;
        
        // Draw cube with rounded corners
        const radius = this.size * 0.2; // 20% of size for rounded corners
        ctx!.beginPath();
        ctx!.moveTo(-this.size/2 + radius, -this.size/2);
        ctx!.lineTo(this.size/2 - radius, -this.size/2);
        ctx!.arcTo(this.size/2, -this.size/2, this.size/2, -this.size/2 + radius, radius);
        ctx!.lineTo(this.size/2, this.size/2 - radius);
        ctx!.arcTo(this.size/2, this.size/2, this.size/2 - radius, this.size/2, radius);
        ctx!.lineTo(-this.size/2 + radius, this.size/2);
        ctx!.arcTo(-this.size/2, this.size/2, -this.size/2, this.size/2 - radius, radius);
        ctx!.lineTo(-this.size/2, -this.size/2 + radius);
        ctx!.arcTo(-this.size/2, -this.size/2, -this.size/2 + radius, -this.size/2, radius);
        ctx!.strokeStyle = '#ffffff';
        ctx!.stroke();
        
        ctx!.restore();
      }
    }

    // Create particles
    const particles: Particle[] = [];
    const particleCount = 20;
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // Animation loop
    let animationFrameId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', setCanvasSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full pointer-events-none"
      style={{ background: 'transparent' }}
    />
  );
};

export default ParticleBackground; 