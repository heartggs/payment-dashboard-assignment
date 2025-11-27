"use client";

export default function DashboardSidebar() {
  return (
    <div className="drawer-side">
      <label
        htmlFor="admin-drawer"
        className="drawer-overlay lg:hidden"
        aria-label="close sidebar"
      />

      <aside
        className="
          flex min-h-full flex-col
          bg-[#1A73E8] border-r border-base-300 text-white
          w-52 lg:w-64"
      >
        <div className="h-16 flex items-center px-4 font-bold">
          올페이즈 관리자 대시보드
        </div>

        <ul className="menu w-full grow px-2 gap-3 text-sm">
          {/* 1Depth 메뉴들 */}
          <li>
            <button
              className="flex items-center gap-3 hover:bg-white hover:text-[#1A73E8]
      transition-colors"
            >
              {/* 대시보드 아이콘 */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                stroke="currentColor"
                className="size-4"
              >
                <path d="M3 10l9-7 9 7" />
                <path d="M4 10v11h6v-5a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v5h6V10" />
              </svg>
              <span>대시보드</span>
            </button>
          </li>

          <li>
            <button
              className="flex items-center gap-3 hover:bg-white hover:text-[#1A73E8]
      transition-colors"
            >
              {/* 결제 내역 */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                stroke="currentColor"
                className="size-4"
              >
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="M3 10h18" />
              </svg>
              <span>결제 내역</span>
            </button>
          </li>

          <li>
            <button
              className="flex items-center gap-3 hover:bg-white hover:text-[#1A73E8]
      transition-colors"
            >
              {/* 가맹점 관리 */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                stroke="currentColor"
                className="size-4"
              >
                <path d="M3 10l9-7 9 7" />
                <path d="M4 10v11h16V10" />
              </svg>
              <span>가맹점 관리</span>
            </button>
          </li>

          <li>
            <button
              className="flex items-center gap-3 hover:bg-white hover:text-[#1A73E8]
      transition-colors"
            >
              {/* 리포트 */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                stroke="currentColor"
                className="size-4"
              >
                <path d="M4 19h16" />
                <path d="M8 19V9" />
                <path d="M12 19V5" />
                <path d="M16 19v-7" />
              </svg>
              <span>리포트</span>
            </button>
          </li>

          <li>
            <button
              className="flex items-center gap-3 hover:bg-white hover:text-[#1A73E8]
      transition-colors"
            >
              {/* 설정 */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                stroke="currentColor"
                className="size-4"
              >
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a2 2 0 0 0 .6 2l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a2 2 0 0 0-2-.6 2 2 0 0 0-1 1.8V21a2 2 0 1 1-4 0v-.2a2 2 0 0 0-1-1.8 2 2 0 0 0-2 .6l-.1.1A2 2 0 1 1 2.8 17.1l.1-.1a2 2 0 0 0 .6-2 2 2 0 0 0-1.8-1H3a2 2 0 1 1 0-4h.2a2 2 0 0 0 1.8-1 2 2 0 0 0-.6-2l-.1-.1A2 2 0 1 1 7.1 2.8l.1.1a2 2 0 0 0 2 .6h.2a2 2 0 0 0 1-1.8V3a2 2 0 1 1 4 0v.2a2 2 0 0 0 1 1.8 2 2 0 0 0 2-.6l.1-.1A2 2 0 1 1 21.2 7.1l-.1.1a2 2 0 0 0-.6 2H21a2 2 0 1 1 0 4h-.2a2 2 0 0 0-1.4 1Z" />
              </svg>
              <span>설정</span>
            </button>
          </li>
        </ul>
      </aside>
    </div>
  );
}
