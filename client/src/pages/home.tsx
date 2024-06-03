import { useNavigate } from 'react-router-dom';
import { Box } from '@/components/ui/container';
import Sidebar from '@/components/core/sidebar/sidebar';
import MessageContainer from '@/components/core/messages/message-container';

import { useAuthContext } from '@/context/auth-context';

export default function Home() {
    const navigate = useNavigate();
    const { authUser } = useAuthContext();

    if (!authUser) {
        navigate('/login');
    }

    return (
        <Box className="flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
            <Sidebar />
            <MessageContainer />
        </Box>
    );
}
