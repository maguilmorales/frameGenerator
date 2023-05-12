import { Canvas } from "@react-three/fiber";
import { AiInnovations } from '../components/AiInnovations';

export const AiInnovationsPage = () => (
    <Canvas camera={{ position: [10, -2, -3] }} shadows>
        <AiInnovations />
    </Canvas>
)