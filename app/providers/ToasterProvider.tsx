'use client';

import {Toaster} from 'react-hot-toast';

// We need this wrapper because of nextjs 13. 
// We need atleast 1 wrapper that is marked as 'use client' when we use libraries like this one
// in order for nextjs to know that this component is a client one. 
const ToasterProvider = () => {
    return (
        <Toaster/>
    )
}

export default ToasterProvider;