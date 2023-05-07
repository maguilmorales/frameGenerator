import { AiSales } from '../components/AiSales';
import { Canvas } from "@react-three/fiber";

export const SalesPage = () => (
    <Canvas camera={{ position: [0, 0, 90] }} shadows >
        <AiSales />
    </Canvas>
)