"use client";

import dynamic from "next/dynamic";

// We dynamically import the ATSChecker component with SSR (Server-Side Rendering) turned off.
// This ensures that the component, along with the pdfjs-dist library it uses,
// is only ever loaded and executed in the browser environment, not on the server.
// This is the standard and most robust way to solve errors like "DOMMatrix is not defined".
const ATSChecker = dynamic(() => import("./_components/ATSChecker"), {
  ssr: false,
  // You can add a loading component here if you wish
  loading: () => <p className="text-center mt-10">Loading ATS Checker...</p>,
});

export default function ATSPage() {
  return <ATSChecker />;
}
