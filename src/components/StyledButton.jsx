export default function StyledButton({ text }) {
  return (
    <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-purple-800 transition">
      {text}
    </button>
  );
}