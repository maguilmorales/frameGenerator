import { GoodAi } from '../components/GoodAi';
import { Canvas } from "@react-three/fiber";

export const GoodAiPage = () => (
    <Canvas camera={{ position: [0, 0, 20]}} shadows>

        <GoodAi />
    </Canvas>
)