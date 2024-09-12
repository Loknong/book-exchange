import React, { useEffect } from "react";

interface ModalWrapperProps {
    isOpen: boolean;
    closeModal: () => void;
    children: React.ReactNode;
}

const ModalWrapper: React.FC<ModalWrapperProps> = ({ isOpen, closeModal, children }) => {

    useEffect(() => {
        if (isOpen) {
            document.body.classList.add("overflow-hidden");
        } else {
            document.body.classList.remove("overflow-hidden");
        }
        return () => {
            document.body.classList.remove("overflow-hidden");
        }
    }, [isOpen])


    if (!isOpen) return null;




    return (
        <>
            {/* Modal Backdrop */}
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40" onClick={closeModal}></div>

            {/* Modal Content Wrapper */}
            <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg shadow-lg p-6 w-full sm:max-w-md md:max-w-[50rem]  h-[80vh] overflow-y-auto">
                    {children}
                </div>
            </div>
        </>
    );
};

export default ModalWrapper;
