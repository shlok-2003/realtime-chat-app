import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Typography } from '@/components/ui/typography';
import { Section } from '@/components/ui/container';

export default function NotFound() {
    const navigate = useNavigate();

    useEffect(() => {
        document.title = '404 | Not Found';
    }, []);

    return (
        <Section className="flex min-h-screen flex-col items-center justify-center gap-0">
            <Typography variant={'h1'} className="text-black">
                404
            </Typography>
            <Typography variant={'p'} className="text-black font-semibold">
                Page not found
            </Typography>
            <Button
                onClick={() => navigate('/login')}
                className="bg-black mt-4 rounded-md px-4 py-2 text-white"
            >
                Go back
            </Button>
        </Section>
    );
}
