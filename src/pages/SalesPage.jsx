import { AiSales } from '../components/AiSales';
import { Canvas } from "@react-three/fiber";

export const SalesPage = () => (
    <Canvas camera={{ position: [-20, 20, 90] }} >
        <AiSales />
    </Canvas>
)