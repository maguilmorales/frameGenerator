import { EmotionalSupport } from '../components/EmotionalSupport';
import { Canvas } from "@react-three/fiber";

export const EmotionalSupportPage = () => (
    <Canvas camera={{ position: [0, 0,2.5]}} shadows>

        <EmotionalSupport />
    </Canvas>
)