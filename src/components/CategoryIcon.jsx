export default function CategoryIcon({ icon, label }) {
  return (
    <div className="flex flex-col items-center justify-center text-center">
      <img src={icon} className="w-12 h-12" alt={label} />
      <span className="text-sm mt-2">{label}</span>
    </div>
  );
}