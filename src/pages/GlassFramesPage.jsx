import { GlassFrames } from '../components/GlassFrames';
import { Canvas } from "@react-three/fiber";

export const GlassFramesPage = () => (
    <Canvas camera={{ position: [0, 0, 20]}} shadows>

        <GlassFrames />
    </Canvas>
)