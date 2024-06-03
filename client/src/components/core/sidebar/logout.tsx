import useLogout from '@/hooks/use-logout';

import { BiLogOut } from '@/icons';
import { Box, Wrapper } from '@/components/ui/container';

export default function LogoutButton() {
    const { loading, logout } = useLogout();

    return (
        <Box className="mt-auto">
            {!loading ? (
                <BiLogOut
                    className="w-6 h-6 text-white cursor-pointer"
                    onClick={logout}
                />
            ) : (
                <Wrapper className="loading loading-spinner"></Wrapper>
            )}
        </Box>
    );
}
