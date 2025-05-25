export default function TopNav({ title }) {
  return (
    <div className="w-full flex justify-between items-center p-4 border-b border-gray-200">
      <h1 className="text-xl font-semibold text-gray-800">{title}</h1>
    </div>
  );
}