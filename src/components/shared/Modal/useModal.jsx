import { useState, Fragment, useId, useCallback } from "react";
import { Dialog, DialogTitle, Transition } from "@headlessui/react";
import PropTypes from "prop-types";
const sizeClasses = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-2xl",
  xl: "max-w-4xl",
};

const colorClasses = {
  white: "bg-white",
  gray: "bg-gray-100",
  red: "bg-red-100",
  blue: "bg-blue-100",
  black: "bg-black text-white",
};
export const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const titleId = useId();

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  const ModalUI = ({
    modalTitle,
    children,
    footer,
    size = "md",
    color = "white",
  }) => {
    return (
      <Transition show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          onClose={close}
          aria-labelledby={modalTitle ? titleId : undefined}
        >
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <div
              className={`w-full transform rounded-lg p-6 shadow-xl transition-all ${
                colorClasses[color] || "bg-white"
              } ${sizeClasses[size]}`}
            >
              {modalTitle && (
                <DialogTitle
                  id={titleId}
                  className="text-lg font-semibold mb-4"
                >
                  {modalTitle}
                </DialogTitle>
              )}

              <div>{children}</div>

              {footer && <div className="mt-4">{footer}</div>}
            </div>
          </div>
        </Dialog>
      </Transition>
    );
  };

  ModalUI.propTypes = {
    modalTitle: PropTypes.string,
    children: PropTypes.node.isRequired,
    footer: PropTypes.node,
    size: PropTypes.oneOf(["sm", "md", "lg", "xl"]),
    color: PropTypes.string,
  };

  return { ModalUI, open, close, isOpen };
};
