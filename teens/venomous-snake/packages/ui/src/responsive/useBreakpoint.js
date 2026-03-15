import { useState, useEffect } from 'react';
export function useBreakpoint() {
    const getBreakpoint = () => {
        const width = window.innerWidth;
        if (width < 640)
            return 'mobile';
        if (width <= 1024)
            return 'tablet';
        return 'desktop';
    };
    const [breakpoint, setBreakpoint] = useState(getBreakpoint);
    useEffect(() => {
        const handleResize = () => setBreakpoint(getBreakpoint());
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    return breakpoint;
}
//# sourceMappingURL=useBreakpoint.js.map