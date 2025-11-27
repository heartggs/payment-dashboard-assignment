export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col bg-base-200">
      {/* 상단 로딩바 - GlobalApiStatus랑 톤 맞추기 */}
      <div className="fixed top-0 left-0 right-0 z-100">
        <progress className="progress progress-primary w-full" />
      </div>

      {/* 가운데 스피너 + 텍스트 */}
      <div className="flex-1 flex flex-col items-center justify-center gap-4">
        <span className="loading loading-spinner loading-lg" />
        <p className="text-sm text-base-content/70">
          대시보드 데이터를 불러오는 중입니다...
        </p>
      </div>
    </div>
  );
}
