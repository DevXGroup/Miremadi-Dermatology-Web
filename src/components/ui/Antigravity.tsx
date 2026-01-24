import { Canvas, useFrame, useThree } from '@react-three/fiber';
import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';

interface AntigravityProps {
    count?: number;
    magnetRadius?: number;
    ringRadius?: number;
    waveSpeed?: number;
    waveAmplitude?: number;
    particleSize?: number;
    lerpSpeed?: number;
    color?: string;
    autoAnimate?: boolean;
    particleVariance?: number;
    rotationSpeed?: number;
    depthFactor?: number;
    pulseSpeed?: number;
    particleShape?: 'capsule' | 'sphere' | 'box' | 'tetrahedron';
    fieldStrength?: number;
}

const AntigravityInner: React.FC<AntigravityProps> = ({
    count = 100, // Slightly reduced count for performance
    magnetRadius = 15,
    ringRadius = 12,
    waveSpeed = 0.5, // Increased speed as requested
    waveAmplitude = 1.5,
    particleSize = 0.8,
    lerpSpeed = 0.1,
    color = '#818cf8',
    autoAnimate = true,
    particleVariance = 2,
    rotationSpeed = 0.15, // Faster rotation
    depthFactor = 1,
    pulseSpeed = 2.5, // Faster pulse
    particleShape = 'sphere',
    fieldStrength = 10
}) => {
    const meshRef = useRef<THREE.InstancedMesh>(null);
    const { viewport } = useThree();
    const dummy = useMemo(() => new THREE.Object3D(), []);

    const lastMousePos = useRef({ x: 0, y: 0 });
    const virtualMouse = useRef({ x: 0, y: 0 });

    const particles = useMemo(() => {
        const temp = [];
        const width = viewport.width || 100;
        const height = viewport.height || 100;

        for (let i = 0; i < count; i++) {
            temp.push({
                t: Math.random() * 100,
                speed: 0.015 + Math.random() / 150, // Faster base speed
                mx: (Math.random() - 0.5) * width,
                my: (Math.random() - 0.5) * height,
                mz: (Math.random() - 0.5) * 20,
                cx: (Math.random() - 0.5) * width,
                cy: (Math.random() - 0.5) * height,
                cz: (Math.random() - 0.5) * 20,
                randomRadiusOffset: (Math.random() - 0.5) * 2
            });
        }
        return temp;
    }, [count, viewport.width, viewport.height]);

    useFrame(state => {
        const mesh = meshRef.current;
        if (!mesh) return;

        const { viewport: v, pointer: m, clock } = state;
        const time = clock.getElapsedTime();

        let destX = (m.x * v.width) / 2;
        let destY = (m.y * v.height) / 2;

        if (autoAnimate) {
            destX = destX * 0.7 + Math.sin(time * 0.5) * (v.width / 5);
            destY = destY * 0.7 + Math.cos(time * 0.6) * (v.height / 5);
        }

        virtualMouse.current.x += (destX - virtualMouse.current.x) * 0.08;
        virtualMouse.current.y += (destY - virtualMouse.current.y) * 0.08;

        const targetX = virtualMouse.current.x;
        const targetY = virtualMouse.current.y;
        const globalRotation = time * rotationSpeed;

        particles.forEach((particle, i) => {
            particle.t += particle.speed;
            const t = particle.t;

            const dx = particle.mx - targetX;
            const dy = particle.my - targetY;
            const dist = Math.sqrt(dx * dx + dy * dy);

            let tx = particle.mx;
            let ty = particle.my;
            let tz = particle.mz * depthFactor;

            if (dist < magnetRadius) {
                const angle = Math.atan2(dy, dx) + globalRotation;
                const wave = Math.sin(t * waveSpeed + angle) * (0.5 * waveAmplitude);
                const r = ringRadius + wave + particle.randomRadiusOffset * (5 / (fieldStrength + 0.1));
                tx = targetX + r * Math.cos(angle);
                ty = targetY + r * Math.sin(angle);
                tz += Math.sin(t) * waveAmplitude;
            }

            particle.cx += (tx - particle.cx) * lerpSpeed;
            particle.cy += (ty - particle.cy) * lerpSpeed;
            particle.cz += (tz - particle.cz) * lerpSpeed;

            dummy.position.set(particle.cx, particle.cy, particle.cz);
            dummy.lookAt(targetX, targetY, particle.cz);
            dummy.rotateX(Math.PI / 2);

            const dToM = Math.sqrt(Math.pow(particle.cx - targetX, 2) + Math.pow(particle.cy - targetY, 2));
            const scale = Math.max(0.1, Math.min(1.2, 1 - Math.abs(dToM - ringRadius) / 15));
            const finalScale = scale * (0.8 + Math.sin(t * pulseSpeed) * 0.4) * particleSize;

            dummy.scale.set(finalScale, finalScale, finalScale);
            dummy.updateMatrix();
            mesh.setMatrixAt(i, dummy.matrix);
        });

        mesh.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
            {particleShape === 'capsule' && <capsuleGeometry args={[0.1, 0.4, 4, 8]} />}
            {particleShape === 'sphere' && <sphereGeometry args={[0.2, 8, 8]} />}
            {particleShape === 'box' && <boxGeometry args={[0.3, 0.3, 0.3]} />}
            {particleShape === 'tetrahedron' && <tetrahedronGeometry args={[0.3]} />}
            <meshBasicMaterial color={color} transparent opacity={0.5} />
        </instancedMesh>
    );
};

const Antigravity: React.FC<AntigravityProps> = props => {
    return (
        <div style={{ width: '100%', height: '100%' }}>
            <Canvas
                dpr={[1, 1.5]} // Performance: limit resolution
                camera={{ position: [0, 0, 50], fov: 35 }}
                style={{ background: 'transparent' }}
                gl={{ antialias: false, powerPreference: 'high-performance' }} // Performance hints
            >
                <AntigravityInner {...props} />
            </Canvas>
        </div>
    );
};

export default Antigravity;
