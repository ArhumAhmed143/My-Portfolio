import React from "react";
import { portfolioData } from "@/data/portfolioData";

export async function generateAndDownloadResume() {
  try {
    const { pdf } = await import("@react-pdf/renderer");
    const { ResumeDocument } = await import("@/components/pdf/ResumeDocument");

    const element = React.createElement(ResumeDocument, { data: portfolioData });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const blob = await pdf(element as any).toBlob();
    const url = URL.createObjectURL(blob);

    const filename = `${portfolioData.personal.name.replace(/\s+/g, "_")}_Resume.pdf`;
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Failed to generate PDF resume:", error);
  }
}
