"use client";

export default function DashboardNavbar() {
  return (
    <nav className="navbar w-full bg-white px-4 lg:px-6 shadow-sm">
      {/* 왼쪽: 햄버거 + 타이틀 */}
      <div className="navbar-start gap-2">
        {/* 모바일 전용 사이드바 토글 */}
        <label
          htmlFor="admin-drawer"
          aria-label="open sidebar"
          className="btn btn-square btn-ghost lg:hidden"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            stroke="currentColor"
            className="size-5"
          >
            <path d="M4 6h16" />
            <path d="M4 12h16" />
            <path d="M4 18h10" />
          </svg>
        </label>

        {/* 브랜드 / 페이지 타이틀 */}
        <div className="flex flex-col">
          <span className="text-sm font-semibold leading-tight">
            올페이즈 결제 대시보드
          </span>
          <span className="hidden text-xs text-base-content/60 sm:inline">
            오늘 결제 현황과 가맹점 요약을 확인할 수 있습니다.
          </span>
        </div>
      </div>

      {/* 가운데 영역 (지금은 비워두기 / 나중에 기간 필터 등 넣어도 됨) */}
      <div className="navbar-center" />

      {/* 오른쪽: 알림 + 프로필 */}
      <div className="navbar-end gap-2">
        {/* 알림 드롭다운 */}
        <div className="dropdown dropdown-end">
          <label
            tabIndex={0}
            className="btn btn-ghost btn-circle btn-sm"
            aria-label="알림 열기"
          >
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                stroke="currentColor"
                className="size-5"
              >
                <path d="M15 17h5l-1.4-1.4A2 2 0 0 1 18 14.2V11a6 6 0 0 0-5-5.9V5a1 1 0 0 0-2 0v.1A6 6 0 0 0 6 11v3.2a2 2 0 0 1-.6 1.4L4 17h5" />
                <path d="M10 19a2 2 0 0 0 4 0" />
              </svg>
            </div>
          </label>
        </div>

        {/* 프로필 드롭다운 */}
        <div className="dropdown dropdown-end">
          <label
            tabIndex={0}
            className="btn btn-ghost btn-sm px-2 normal-case flex items-center gap-2"
          >
            <div className="avatar">
              <div className="w-8 rounded-full bg-primary text-primary-content flex items-center justify-center text-xs font-semibold">
                올
              </div>
            </div>
            <div className="hidden sm:flex flex-col items-start">
              <span className="text-sm leading-tight font-semibold">
                올페이즈 운영자
              </span>
              <span className="text-[11px] text-base-content/60">
                Admin 계정
              </span>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-3 hidden sm:block"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-white rounded-box w-40 z-20"
          >
            <li>
              <button>프로필</button>
            </li>
            <li>
              <button>알림 설정</button>
            </li>
            <li>
              <button className="text-error">로그아웃</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
