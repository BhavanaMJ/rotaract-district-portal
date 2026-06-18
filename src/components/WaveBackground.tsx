"use client";

import React, { useEffect, useRef } from "react";

interface WaveBackgroundProps {
  intensity?: number; // 0.1 to 1
  particleCount?: number;
}

export default function WaveBackground({
  intensity = 0.5,
  particleCount = 40,
}: WaveBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, radius: 150 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Track window resize
    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Track mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = e.clientX;
      mouseRef.current.targetY = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Initialize particles
    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      alpha: number;
      pulse: number;
      pulseSpeed: number;
    }> = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2.5 + 0.5,
        speedY: -(Math.random() * 0.4 + 0.1),
        speedX: Math.random() * 0.3 - 0.15,
        alpha: Math.random() * 0.5 + 0.2,
        pulse: Math.random() * Math.PI,
        pulseSpeed: Math.random() * 0.02 + 0.005,
      });
    }

    // Dynamic wave settings
    const waveLayers = [
      {
        y: height * 0.75,
        length: 0.001,
        amplitude: 60 * intensity,
        speed: 0.008,
        color: "rgba(0, 240, 255, 0.04)", // Electric blue
      },
      {
        y: height * 0.8,
        length: 0.0015,
        amplitude: 40 * intensity,
        speed: 0.012,
        color: "rgba(56, 189, 248, 0.06)", // Soft ocean glow
      },
      {
        y: height * 0.85,
        length: 0.0008,
        amplitude: 80 * intensity,
        speed: 0.005,
        color: "rgba(3, 7, 18, 0.5)", // Deep navy blockout
      },
    ];

    let time = 0;

    const animate = () => {
      if (!ctx || !canvas) return;
      time += 0.5;

      // Smooth mouse tracking
      const mouse = mouseRef.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // Draw background navy gradient
      const bgGradient = ctx.createLinearGradient(0, 0, 0, height);
      bgGradient.addColorStop(0, "#020c1b"); // Deep Navy
      bgGradient.addColorStop(0.5, "#030712"); // Navy Deep
      bgGradient.addColorStop(1, "#0a192f"); // Navy Medium
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, width, height);

      // Draw current wave layers (flowing lines)
      waveLayers.forEach((wave, idx) => {
        ctx.beginPath();
        ctx.moveTo(0, height);

        for (let i = 0; i <= width; i += 5) {
          // Base math for waves
          let sineY = Math.sin(i * wave.length + time * wave.speed + idx);
          let cosineY = Math.cos(i * wave.length * 0.8 - time * wave.speed * 0.6 + idx);
          
          let yVal = wave.y + (sineY + cosineY) * wave.amplitude;

          // Mouse ripple effect (adds distortion as mouse gets close to waves)
          const dx = i - mouse.x;
          const dy = yVal - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            yVal += Math.sin(dist * 0.05 - time * 0.1) * 20 * force;
          }

          ctx.lineTo(i, yVal);
        }

        ctx.lineTo(width, height);
        ctx.fillStyle = wave.color;
        ctx.fill();
      });

      // Draw floating data particles
      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX;
        p.pulse += p.pulseSpeed;

        // Reset positions if they go off-screen
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10 || p.x > width + 10) {
          p.x = Math.random() * width;
        }

        // Mouse interaction: push particles slightly away
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          const angle = Math.atan2(dy, dx);
          p.x += Math.cos(angle) * force * 2;
          p.y += Math.sin(angle) * force * 2;
        }

        // Draw particle with pulsing alpha
        const currentAlpha = p.alpha * (0.6 + Math.sin(p.pulse) * 0.4);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        
        // Soft glowing particle color
        ctx.fillStyle = `rgba(0, 240, 255, ${currentAlpha})`;
        ctx.shadowBlur = p.size * 2;
        ctx.shadowColor = "#00f0ff";
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      });

      // Ambient radial light reflection following cursor
      const radialGrad = ctx.createRadialGradient(
        mouse.x,
        mouse.y,
        10,
        mouse.x,
        mouse.y,
        mouse.radius
      );
      radialGrad.addColorStop(0, "rgba(56, 189, 248, 0.06)"); // Soft Ocean Glow
      radialGrad.addColorStop(1, "rgba(3, 7, 18, 0)");
      ctx.fillStyle = radialGrad;
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, mouse.radius, 0, Math.PI * 2);
      ctx.fill();

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, [intensity, particleCount]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-20 w-full h-full pointer-events-none"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
