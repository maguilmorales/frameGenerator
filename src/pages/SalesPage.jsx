import { AiSales } from '../components/AiSales';
import { Canvas } from "@react-three/fiber";

export const SalesPage = () => (
    <Canvas camera={{ position: [80, -130, 150] }} shadows >
        <AiSales />
    </Canvas>
)