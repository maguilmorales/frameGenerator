import { Canvas } from "@react-three/fiber";
import { AiCustomers } from '../components/AiCustomers';

export const AiCustomersPage = () => (
    <Canvas camera={{ position: [0, 0, 10] }} shadows>
        <AiCustomers />
    </Canvas>
)