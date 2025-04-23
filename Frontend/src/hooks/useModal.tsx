import { useState } from 'react';
/* https://blog.theashishmaurya.me/creating-a-react-modal-with-react-custom-hooks-and-typescript
 */
function useModal() {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => {
        setIsOpen(!isOpen);
    };

    return {
        isOpen,
        toggle
    };
}

export default useModal;
