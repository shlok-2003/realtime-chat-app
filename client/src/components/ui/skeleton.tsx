import React from 'react';
import { Box } from '@/components/ui/container';

export default function Skeleton() {
    return (
        <React.Fragment>
            <Box className="flex gap-3 items-center">
                <Box className="skeleton w-10 h-10 rounded-full shrink-0"></Box>
                <Box className="flex flex-col gap-1">
                    <Box className="skeleton h-4 w-40"></Box>
                    <Box className="skeleton h-4 w-40"></Box>
                </Box>
            </Box>
            <Box className="flex gap-3 items-center justify-end">
                <Box className="flex flex-col gap-1">
                    <Box className="skeleton h-4 w-40"></Box>
                </Box>
                <Box className="skeleton w-10 h-10 rounded-full shrink-0"></Box>
            </Box>
        </React.Fragment>
    );
}
