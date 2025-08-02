import { SidebarContext } from '@/contexts/SidebarContext';
import React, { useState, useMemo } from 'react';

export const SidebarProvider = ({
    children,
    open: openProp,
    setOpen: setOpenProp,
    animate = true
}) => {
    const [openState, setOpenState] = useState(false);

    const contextValue = useMemo(() => ({
        open: openProp !== undefined ? openProp : openState,
        setOpen: setOpenProp !== undefined ? setOpenProp : setOpenState,
        animate
    }), [openProp, openState, setOpenProp, animate]);

    return (
        <SidebarContext.Provider value={contextValue}>
            {children}
        </SidebarContext.Provider>
    );
};

export default SidebarContext;