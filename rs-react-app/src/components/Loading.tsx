export default function Loading() {
  return (
    <h1 className="flex justify-center p-2 text-xl light:text-black light:font-bold fade-in">
      <span className="animate-spin w-6 h-6 text-center">⟡ </span>
      Loading
      <span className="animate-spin w-6 h-6 text-center"> ⟡</span>
    </h1>
  );
}
