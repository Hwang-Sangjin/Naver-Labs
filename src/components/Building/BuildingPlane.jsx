const BuildingPlane = () => {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -6, 0]}>
      <planeGeometry args={[200, 200, 10, 10]} />
      <meshStandardMaterial color="#ffffff" />
    </mesh>
  );
};
export default BuildingPlane;
