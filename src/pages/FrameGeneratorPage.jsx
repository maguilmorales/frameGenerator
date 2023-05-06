import { Canvas } from "@react-three/fiber";
import FrameGenerator from '../components/FrameGenerator';

export const FrameGeneratorPage = () => (
    <Canvas camera={{ position: [-20, 20, 90] }} >
        <FrameGenerator />
    </Canvas>
)