"use client";

import { useState, useEffect } from "react";
import ResumeModal from "./ResumeModal";

export default function ResumeModalWrapper() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    const checkHash = () => {
      if (window.location.hash === "#resume") {
        setIsOpen(true);
      }
    };

    // Initial check
    checkHash();

    window.addEventListener("open-resume-modal", handleOpen);
    window.addEventListener("close-resume-modal", handleClose);
    window.addEventListener("hashchange", checkHash);

    return () => {
      window.removeEventListener("open-resume-modal", handleOpen);
      window.removeEventListener("close-resume-modal", handleClose);
      window.removeEventListener("hashchange", checkHash);
    };
  }, []);

  const handleModalClose = () => {
    setIsOpen(false);
    if (window.location.hash === "#resume") {
      history.pushState(
        "",
        document.title,
        window.location.pathname + window.location.search
      );
    }
  };

  return <ResumeModal isOpen={isOpen} onClose={handleModalClose} />;
}
