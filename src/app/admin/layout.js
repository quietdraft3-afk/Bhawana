export const metadata = {
  title: "Admin — Bhawana Aryal",
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({ children }) {
  return <div className="admin-body">{children}</div>;
}
