"use client";

import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, Environment, Float, ContactShadows, PresentationControls, useTexture, Text } from "@react-three/drei";
import * as THREE from "three";

function Model(props) {
  const { scene } = useGLTF("https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/macbook/model.gltf");
  return <primitive object={scene} {...props} />;
}

function FloatingCube({ position, color, speed, rotationFactor, scale = [1, 1, 1], onClick }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useState(false);
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    meshRef.current.position.y = position[1] + Math.sin(time * speed) * 0.2;
    meshRef.current.rotation.x = Math.sin(time * rotationFactor * 0.2);
    meshRef.current.rotation.y += 0.01 * rotationFactor;
    meshRef.current.rotation.z = Math.sin(time * rotationFactor * 0.3) * 0.1;
    
    if (hovered) {
      meshRef.current.scale.setScalar(1.1);
    } else if (active) {
      meshRef.current.scale.setScalar(0.9);
    } else {
      meshRef.current.scale.x = scale[0];
      meshRef.current.scale.y = scale[1];
      meshRef.current.scale.z = scale[2];
    }
  });

  return (
    <mesh 
      ref={meshRef} 
      position={position} 
      castShadow
      onClick={(e) => {
        e.stopPropagation();
        setActive(!active);
        if (onClick) onClick(e);
      }}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial 
        color={hovered ? "#ffffff" : color} 
        roughness={0.3} 
        metalness={0.8} 
        emissive={hovered ? color : "#000000"}
        emissiveIntensity={hovered ? 0.5 : 0}
      />
    </mesh>
  );
}

function FloatingGem({ position, color, speed, rotationFactor, scale = [1, 1, 1], onClick }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useState(false);
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    meshRef.current.position.y = position[1] + Math.sin(time * speed) * 0.2;
    meshRef.current.rotation.x = Math.sin(time * rotationFactor * 0.2);
    meshRef.current.rotation.y += 0.01 * rotationFactor;
    meshRef.current.rotation.z = Math.sin(time * rotationFactor * 0.3) * 0.1;
    
    if (hovered) {
      meshRef.current.scale.setScalar(1.1);
    } else if (active) {
      meshRef.current.scale.setScalar(0.9);
    } else {
      meshRef.current.scale.x = scale[0];
      meshRef.current.scale.y = scale[1];
      meshRef.current.scale.z = scale[2];
    }
  });

  return (
    <mesh 
      ref={meshRef} 
      position={position} 
      castShadow
      onClick={(e) => {
        e.stopPropagation();
        setActive(!active);
        if (onClick) onClick(e);
      }}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <octahedronGeometry args={[1, 0]} />
      <meshStandardMaterial 
        color={hovered ? "#ffffff" : color} 
        roughness={0.1} 
        metalness={1} 
        emissive={hovered ? color : "#000000"}
        emissiveIntensity={hovered ? 0.5 : 0}
      />
    </mesh>
  );
}

function FloatingSphere({ position, color, speed, rotationFactor, radius, scale = [1, 1, 1], onClick }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useState(false);
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    meshRef.current.position.y = position[1] + Math.sin(time * speed) * 0.2;
    meshRef.current.rotation.x = Math.sin(time * rotationFactor * 0.2);
    meshRef.current.rotation.y += 0.01 * rotationFactor;
    
    if (hovered) {
      meshRef.current.scale.setScalar(1.1);
    } else if (active) {
      meshRef.current.scale.setScalar(0.9);
    } else {
      meshRef.current.scale.x = scale[0];
      meshRef.current.scale.y = scale[1];
      meshRef.current.scale.z = scale[2];
    }
  });

  return (
    <mesh 
      ref={meshRef} 
      position={position} 
      castShadow
      onClick={(e) => {
        e.stopPropagation();
        setActive(!active);
        if (onClick) onClick(e);
      }}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <sphereGeometry args={[radius, 32, 32]} />
      <meshStandardMaterial 
        color={hovered ? "#ffffff" : color} 
        roughness={0.2} 
        metalness={0.8} 
        emissive={hovered ? color : "#000000"}
        emissiveIntensity={hovered ? 0.5 : 0}
      />
    </mesh>
  );
}

function FloatingText({ position, text, color, size = 0.5, rotation = [0, 0, 0] }) {
  const textRef = useRef();
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    textRef.current.position.y = position[1] + Math.sin(time * 0.5) * 0.1;
    textRef.current.rotation.y = rotation[1] + Math.sin(time * 0.2) * 0.1;
  });

  return (
    <Text
      ref={textRef}
      position={position}
      rotation={rotation}
      fontSize={size}
      color={color}
      anchorX="center"
      anchorY="middle"
      letterSpacing={0.05}
    >
      {text}
    </Text>
  );
}

function DigitalElements() {
  const [clicked, setClicked] = useState(null);
  
  const handleClick = (name) => {
    setClicked(name);
    setTimeout(() => setClicked(null), 2000);
  };
  
  return (
    <group>
      <FloatingCube 
        position={[-4, 2, 0]} 
        color="#4f46e5" 
        speed={0.5} 
        rotationFactor={1}
        onClick={() => handleClick("web")}
      />
      <FloatingText 
        position={[-4, 3.5, 0]} 
        text={clicked === "web" ? "Web Development" : "Web"} 
        color="#4f46e5" 
        size={0.4}
      />
      
      <FloatingGem 
        position={[4, -2, 2]} 
        color="#8b5cf6" 
        speed={0.7} 
        rotationFactor={0.8}
        onClick={() => handleClick("app")}
      />
      <FloatingText 
        position={[4, -0.5, 2]} 
        text={clicked === "app" ? "Mobile Apps" : "Apps"} 
        color="#8b5cf6" 
        size={0.4}
      />
      
      <FloatingSphere 
        position={[0, 0, -2]} 
        color="#3b82f6" 
        speed={0.6} 
        rotationFactor={0.5} 
        radius={1.5}
        onClick={() => handleClick("cloud")}
      />
      <FloatingText 
        position={[0, 2, -2]} 
        text={clicked === "cloud" ? "Cloud Solutions" : "Cloud"} 
        color="#3b82f6" 
        size={0.5}
      />
      
      <FloatingGem 
        position={[3, 3, -1]} 
        color="#06b6d4" 
        speed={0.8} 
        rotationFactor={1.2}
        onClick={() => handleClick("ai")}
      />
      <FloatingText 
        position={[3, 4.5, -1]} 
        text={clicked === "ai" ? "AI Integration" : "AI"} 
        color="#06b6d4" 
        size={0.4}
      />
      
      <FloatingCube 
        position={[-3, -3, 1]} 
        color="#ec4899" 
        speed={0.9} 
        rotationFactor={0.7}
        onClick={() => handleClick("design")}
      />
      <FloatingText 
        position={[-3, -1.5, 1]} 
        text={clicked === "design" ? "UI/UX Design" : "Design"} 
        color="#ec4899" 
        size={0.4}
      />
    </group>
  );
}

export function Scene3D({ className }) {
  return (
    <div className={className}>
      <Canvas 
        shadows 
        camera={{ position: [0, 0, 20], fov: 35 }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        
        <PresentationControls
          global
          config={{ mass: 2, tension: 500 }}
          snap={{ mass: 4, tension: 300 }}
          rotation={[0, 0.3, 0]}
          polar={[-Math.PI / 3, Math.PI / 3]}
          azimuth={[-Math.PI / 1.4, Math.PI / 2]}
        >
          <Float rotationIntensity={0.4}>
            <DigitalElements />
          </Float>
        </PresentationControls>
        
        <ContactShadows position={[0, -4, 0]} opacity={0.2} scale={20} blur={1.75} far={4.5} />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}

export function MacbookScene({ className }) {
  return (
    <div className={className}>
      <Canvas 
        shadows 
        camera={{ position: [0, 0, 20], fov: 35 }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        
        <PresentationControls
          global
          config={{ mass: 2, tension: 500 }}
          snap={{ mass: 4, tension: 300 }}
          rotation={[0, 0.3, 0]}
          polar={[-Math.PI / 3, Math.PI / 3]}
          azimuth={[-Math.PI / 1.4, Math.PI / 2]}
        >
          <Float rotationIntensity={0.4}>
            <Model scale={1.6} position={[0, -1.5, 0]} />
          </Float>
        </PresentationControls>
        
        <ContactShadows position={[0, -4, 0]} opacity={0.4} scale={20} blur={1.75} far={4.5} />
      </Canvas>
    </div>
  );
} 