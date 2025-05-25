export default function PageContainer({ children }) {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6">
      {children}
    </div>
  );
}