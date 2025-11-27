import { Suspense } from "react";

import DashboardNavbar from "./components/layout/DashboardNavbar";
import DashboardSidebar from "./components/layout/DashboardSidebar";
import DashboardMainSection from "./components/layout/DashboardMainSection";
import DashboardMainSkeleton from "./components/layout/DashboardMainSkeleton";

export default function Page() {
  return (
    <div className="drawer lg:drawer-open bg-base-200 min-h-screen">
      {/* drawer 전체 구조 */}
      <input id="admin-drawer" type="checkbox" className="drawer-toggle" />

      {/* 네브바 + 메인 영역 */}
      <div className="drawer-content flex flex-col">
        <DashboardNavbar />

        <Suspense fallback={<DashboardMainSkeleton />}>
          <DashboardMainSection />
        </Suspense>
      </div>

      {/* 사이드바 */}
      <DashboardSidebar />
    </div>
  );
}
