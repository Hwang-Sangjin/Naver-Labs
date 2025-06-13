import React, { useEffect, useMemo, useRef } from "react";
import { useLoader, useFrame } from "@react-three/fiber";
import { TextureLoader } from "three";
import * as THREE from "three";

const ImageSplitBox = () => {
  const texture1 = useLoader(TextureLoader, "/image/NaverNavigator.png");
  const texture2 = useLoader(TextureLoader, "/image/NaverNetflix.png");
  const texture3 = useLoader(TextureLoader, "/image/NaverPlusStore.png");
  const texture4 = useLoader(TextureLoader, "/image/NaverLabs.png");
  const boxes = 34;
  const meshRefs = useRef([]);
  const mountTime = useRef(0);

  const textureOffsets = useMemo(() => {
    const offsets = [];
    const uSize = 1 / boxes;

    for (let i = 0; i < boxes; i++) {
      offsets.push({
        offset: [i * uSize, 0],
        scale: [uSize, 1],
      });
    }
    return offsets;
  }, [boxes]);

  const materials = useMemo(() => {
    return textureOffsets.map((offset) => {
      const front = texture1.clone();
      const left = texture4.clone();
      const back = texture3.clone();
      const right = texture2.clone();

      [front, left, right, back].forEach((tex) => {
        tex.offset.set(...offset.offset);
        tex.repeat.set(...offset.scale);
        tex.needsUpdate = true;
      });

      return [
        new THREE.MeshStandardMaterial({ map: right }), // Right (+X)
        new THREE.MeshStandardMaterial({ map: left }), // Left (-X)
        new THREE.MeshStandardMaterial(), // Top (+Y)
        new THREE.MeshStandardMaterial(), // Bottom (-Y)
        new THREE.MeshStandardMaterial({ map: front }), // Front (+Z)
        new THREE.MeshStandardMaterial({ map: back }), // Back (-Z)
      ];
    });
  }, [texture1, texture2, texture3, texture4, boxes]);

  // Capture mount time
  useEffect(() => {
    mountTime.current = performance.now() / 1000; // Convert to seconds
  }, []);

  // Animation for individual meshes
  useFrame(({ clock }) => {
    const elapsedTime = performance.now() / 1000 - mountTime.current; // Time since mount
    meshRefs.current.forEach((mesh, index) => {
      if (mesh) {
        const startTime = index * 0.05; // Delay each box by 0.1 seconds
        if (elapsedTime > startTime) {
          mesh.position.z = THREE.MathUtils.lerp(
            mesh.position.z,
            0.2, // Target x position
            0.05 // Lerp factor (adjust for speed)
          );
        }
      }
    });
  });

  return (
    <group position={[0.15, 0.4, 0]}>
      {materials.map((material, index) => {
        const x = (index - (boxes - 1) / 2) * 0.495; // Initial spacing
        return (
          <mesh
            key={index}
            ref={(el) => (meshRefs.current[index] = el)}
            rotation={[0, Math.PI, 0]}
            position={[x, 0, -5]}
            material={material}
          >
            <boxGeometry args={[0.495, 4.5, 0.495]} />
          </mesh>
        );
      })}
    </group>
  );
};

export default ImageSplitBox;
