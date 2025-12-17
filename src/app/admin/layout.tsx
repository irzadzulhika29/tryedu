import { ReactNode } from "react";
import { AdminLayout } from "@/components/common/layouts";

export default function AdminRootLayout({ children }: { children: ReactNode }) {
  return <AdminLayout>{children}</AdminLayout>;
}
