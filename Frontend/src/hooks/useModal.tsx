import { useState } from 'react';
/* https://blog.theashishmaurya.me/creating-a-react-modal-with-react-custom-hooks-and-typescript
 */
function useModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenSettings, setIsOpenSettings] = useState(false);

    const toggle = () => {
        setIsOpen(!isOpen);
    };
    const toggleSettings = () => {
        setIsOpenSettings(!isOpenSettings);
    };

    return {
        isOpen,
        toggle,
        isOpenSettings,
        toggleSettings
    };
}

export default useModal;
