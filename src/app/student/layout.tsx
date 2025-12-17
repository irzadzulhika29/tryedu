import { ReactNode } from "react";
import { StudentLayout } from "@/components/common/layouts";

export default function StudentRootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <StudentLayout>{children}</StudentLayout>;
}
