const HomeSlide = ({ position }) => {
  return (
    <mesh position={position}>
      <boxGeometry args={[1, 0.1, 1]} />
      <meshBasicMaterial
        color={"#14cf64"}
        transparent={true} // Enable transparency
        opacity={0.25} // 0.25~1
      />
    </mesh>
  );
};

export default HomeSlide;
