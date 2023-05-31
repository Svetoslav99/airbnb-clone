'use client';

import React, { useEffect, useState } from 'react';

interface ClientOnlyProps {
    children: React.ReactNode;
}

// This will be A HOC that will protect the weird hydration error that we have because of the experimental use of app dir.
const ClientOnly: React.FC<ClientOnlyProps> = ({ children }) => {
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
    }, []);

    if (!hasMounted) {
        return null;
    }

    return <>{children}</>;
};

export default ClientOnly;
