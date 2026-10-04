import React from "react";
import { portfolioData } from "@/data/portfolioData";

export async function generateAndDownloadResume(): Promise<boolean> {
  try {
    const { pdf } = await import("@react-pdf/renderer");
    const { ResumeDocument } = await import("@/components/pdf/ResumeDocument");

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const element = React.createElement(ResumeDocument, { data: portfolioData }) as any;
    const blob = await pdf(element).toBlob();
    const url = URL.createObjectURL(blob);

    const filename = `${portfolioData.personal.name.replace(/\s+/g, "_")}_Resume.pdf`;
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => {
      URL.revokeObjectURL(url);
    }, 1000);

    return true;
  } catch (error) {
    console.error("Dynamic PDF generation failed, downloading fallback:", error);
    // Fallback directly to public PDF file if dynamic compilation has any issue
    try {
      const link = document.createElement("a");
      link.href = "/Ghulam_Ahmed_Resume.pdf";
      link.download = "Ghulam_Ahmed_Resume.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return true;
    } catch (fallbackError) {
      console.error("Fallback PDF download also failed:", fallbackError);
      return false;
    }
  }
}

export function openResumeInNewTab(): void {
  window.open("/Ghulam_Ahmed_Resume.pdf", "_blank", "noopener,noreferrer");
}
