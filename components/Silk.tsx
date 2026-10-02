'use client';

/* eslint-disable react/no-unknown-property */
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { forwardRef, useRef, useMemo, useLayoutEffect, useEffect, useState } from 'react';
import { Color, Mesh, ShaderMaterial } from 'three';

if (typeof window !== "undefined") {
  const originalWarn = console.warn;
  console.warn = (...args) => {
    if (typeof args[0] === "string" && args[0].includes("THREE.Clock")) return;
    originalWarn.apply(console, args);
  };
}

interface SilkProps {
  speed?: number;
  scale?: number;
  color?: string;
  darkColor?: string;
  noiseIntensity?: number;
  rotation?: number;
  lightMode?: boolean;
  className?: string;
}

const hexToNormalizedRGB = (hex: string): [number, number, number] => {
  hex = hex.replace('#', '');
  if (hex.length === 3) {
    hex = hex.split('').map(c => c + c).join('');
  }
  return [
    parseInt(hex.slice(0, 2), 16) / 255,
    parseInt(hex.slice(2, 4), 16) / 255,
    parseInt(hex.slice(4, 6), 16) / 255
  ];
};

const vertexShader = `
varying vec2 vUv;
varying vec3 vPosition;

void main() {
  vPosition = position;
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
varying vec2 vUv;
varying vec3 vPosition;

uniform float uTime;
uniform vec3  uColor;
uniform vec3  uDarkColor;
uniform float uSpeed;
uniform float uScale;
uniform float uRotation;
uniform float uNoiseIntensity;
uniform float uLightMode;

const float e = 2.71828182845904523536;

float noise(vec2 texCoord) {
  float G = e;
  vec2  r = (G * sin(G * texCoord));
  return fract(r.x * r.y * (1.0 + texCoord.x));
}

vec2 rotateUvs(vec2 uv, float angle) {
  float c = cos(angle);
  float s = sin(angle);
  mat2  rot = mat2(c, -s, s, c);
  return rot * uv;
}

void main() {
  float rnd        = noise(gl_FragCoord.xy);
  vec2  uv         = rotateUvs(vUv * uScale, uRotation);
  vec2  tex        = uv * uScale;
  float tOffset    = uSpeed * uTime;

  tex.y += 0.03 * sin(8.0 * tex.x - tOffset);

  float pattern = 0.6 +
                  0.4 * sin(5.0 * (tex.x + tex.y +
                                   cos(3.0 * tex.x + 5.0 * tex.y) +
                                   0.02 * tOffset) +
                           sin(20.0 * (tex.x + tex.y - 0.1 * tOffset)));

  // Normalize wave pattern to 0.0 - 1.0
  float normPattern = clamp((pattern - 0.2) / 0.8, 0.0, 1.0);
  
  // Smooth fabric specular highlights
  float fabricCurve = smoothstep(0.05, 0.95, normPattern);

  // Balanced micro-texture grain that doesn't plunge into black
  float grain = (rnd - 0.5) / 25.0 * uNoiseIntensity;

  // Seamless interpolation between gray (uDarkColor) and highlight (uColor)
  vec3 result = mix(uDarkColor, uColor, fabricCurve) + vec3(grain);

  if (uLightMode > 0.5) {
    float fold = smoothstep(0.28, 0.9, pattern);
    float specular = smoothstep(0.72, 0.98, pattern);
    vec3 shadowColor = uDarkColor;
    vec3 bodyColor = min(uColor * 1.18, vec3(1.0));
    vec3 lightBase = mix(shadowColor, bodyColor, fold);
    lightBase = mix(lightBase, vec3(1.0), specular * 0.92);
    float fineNoise = noise(gl_FragCoord.xy * 0.63 + vec2(17.0, 41.0));
    float grainSignal = (rnd + fineNoise - 1.0);
    float grainStrength = clamp(uNoiseIntensity * 0.038, 0.0, 0.16);
    result = lightBase + grainSignal * grainStrength;
  }

  gl_FragColor = vec4(clamp(result, 0.0, 1.0), 1.0);
}
`;

const SilkPlane = forwardRef<Mesh, { uniforms: Record<string, { value: any }> }>(
  function SilkPlane({ uniforms }, ref) {
    const { viewport } = useThree();

    useLayoutEffect(() => {
      const mesh = (ref as React.RefObject<Mesh | null>)?.current;
      if (mesh) {
        mesh.scale.set(viewport.width, viewport.height, 1);
      }
    }, [ref, viewport]);

    useFrame((_, delta) => {
      const mesh = (ref as React.RefObject<Mesh | null>)?.current;
      if (mesh && mesh.material) {
        (mesh.material as ShaderMaterial).uniforms.uTime.value += 0.1 * delta;
      }
    });

    return (
      <mesh ref={ref}>
        <planeGeometry args={[1, 1, 1, 1]} />
        <shaderMaterial
          uniforms={uniforms}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          transparent={true}
        />
      </mesh>
    );
  }
);
SilkPlane.displayName = 'SilkPlane';

const Silk: React.FC<SilkProps> = ({
  speed = 4.6,
  scale = 1,
  color = '#ffffff',
  darkColor = '#CCD2E3',
  noiseIntensity = 2.6,
  rotation = 0,
  lightMode = false,
  className = 'w-full h-full'
}) => {
  const [mounted, setMounted] = useState(false);
  const meshRef = useRef<Mesh>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const uniforms = useMemo(
    () => ({
      uSpeed: { value: speed },
      uScale: { value: scale },
      uNoiseIntensity: { value: noiseIntensity },
      uColor: { value: new Color(...hexToNormalizedRGB(color)) },
      uDarkColor: { value: new Color(...hexToNormalizedRGB(darkColor)) },
      uRotation: { value: rotation },
      uLightMode: { value: lightMode ? 1 : 0 },
      uTime: { value: 0 }
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    uniforms.uSpeed.value = speed;
    uniforms.uScale.value = scale;
    uniforms.uNoiseIntensity.value = noiseIntensity;
    uniforms.uColor.value.setRGB(...hexToNormalizedRGB(color));
    uniforms.uDarkColor.value.setRGB(...hexToNormalizedRGB(darkColor));
    uniforms.uRotation.value = rotation;
    uniforms.uLightMode.value = lightMode ? 1 : 0;
  }, [speed, scale, noiseIntensity, color, darkColor, rotation, lightMode, uniforms]);

  if (!mounted) {
    return <div className={className} />;
  }

  return (
    <div className={className}>
      <Canvas
        dpr={[1, 2]}
        frameloop="always"
        gl={{ alpha: true, antialias: true }}
        style={{ width: '100%', height: '100%' }}
      >
        <SilkPlane ref={meshRef} uniforms={uniforms} />
      </Canvas>
    </div>
  );
};

export default Silk;
