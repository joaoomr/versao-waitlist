import { Sidebar } from "@/components/layout/sidebar";
import { MobileNav } from "@/components/layout/mobile-nav";
import { MOCK_CURRENT_USER, MOCK_NOTIFICATIONS } from "@/lib/mock-data";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userName = MOCK_CURRENT_USER.user.name;
  const userImage = MOCK_CURRENT_USER.user.avatarUrl;
  const unreadNotifications = MOCK_NOTIFICATIONS.filter(
    (n) => !n.notification.read
  ).length;

  return (
    <div className="min-h-screen bg-bg">
      <Sidebar
        userName={userName}
        userImage={userImage}
        unreadNotifications={unreadNotifications}
      />
      <main className="p-4 pb-20 lg:ml-60 lg:p-8 lg:pb-8">{children}</main>
      <MobileNav />
    </div>
  );
}
