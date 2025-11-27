// app/components/layout/DashboardMainSkeleton.tsx
export default function DashboardMainSkeleton() {
  return (
    <main className="p-6 space-y-8">
      {/* 1. KPI 카드 */}
      <section className="card bg-white shadow-sm border border-base-300">
        <div className="card-body py-3 grid grid-cols-1 sm:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="skeleton h-3 w-20" />
              <div className="skeleton h-6 w-24" />
              <div className="skeleton h-3 w-16" />
            </div>
          ))}
        </div>
      </section>

      {/* 2. 상단 메인 영역: 일별 추이(좌 2) + 결제 분포(우 1) */}
      <section className="grid grid-cols-1 lg:grid-cols-[minmax(0,2.5fr)_minmax(0,1fr)] gap-6">
        {/* 2-1. 일별 결제 추이 */}
        <article className="card bg-white shadow-sm border border-base-300">
          <div className="card-body">
            <div className="skeleton h-4 w-32 mb-4" />
            <div className="skeleton h-64 w-full" />
          </div>
        </article>

        {/* 2-2. 결제 분포 (우측, 위/아래 두 카드) */}
        <div className="flex flex-col gap-4">
          {/* 결제 수단 분포 */}
          <article className="card bg-white shadow-sm border border-base-300">
            <div className="card-body">
              <div className="skeleton h-4 w-28 mb-4" />
              <div className="skeleton h-28 w-full" />
            </div>
          </article>

          {/* 결제 상태 진척 현황 (ProgressBar) */}
          <article className="card bg-white shadow-sm border border-base-300">
            <div className="card-body">
              <div className="skeleton h-4 w-32 mb-4" />
              <div className="space-y-2">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="skeleton h-3 w-full" />
                ))}
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* 3. 하단: 가맹점 TOP5 + 가맹점 업종 레이더 차트 */}
      <section className="grid grid-cols-1 xl:grid-cols-[minmax(0,0.5fr)_minmax(0,1fr)] gap-6 pb-4">
        {/* 3-1. 가맹점 업종 레이더 차트 */}
        <article className="card bg-white shadow-sm border border-base-300">
          <div className="card-body">
            <div className="skeleton h-4 w-40 mb-4" />
            <div className="skeleton h-64 w-full" />
          </div>
        </article>

        {/* 3-2. 가맹점 TOP 5 */}
        <article className="card bg-white shadow-sm border border-base-300">
          <div className="card-body">
            <div className="skeleton h-4 w-36 mb-4" />
            <div className="space-y-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="skeleton h-4 w-10" />
                  <div className="skeleton h-4 flex-1" />
                  <div className="skeleton h-4 w-16" />
                </div>
              ))}
            </div>
          </div>
        </article>
      </section>
    </main>
  );
}
