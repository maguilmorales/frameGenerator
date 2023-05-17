import { Canvas } from "@react-three/fiber";
import { AiWhisperer } from '../components/AiWhisperer';

export const AiWhispererPage = () => (
    <Canvas camera={{ position: [0, 0, 2] }} shadows>
        <AiWhisperer />
    </Canvas>
)