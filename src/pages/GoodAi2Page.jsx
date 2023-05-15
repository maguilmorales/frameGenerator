import { GoodAi2 } from '../components/GoodAi2';
import { Canvas } from "@react-three/fiber";

export const GoodAi2Page = () => (
    <Canvas camera={{ position: [0, 0, 10]}} shadows>

        <GoodAi2 />
    </Canvas>
)