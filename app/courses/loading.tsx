// app/tapris/loading.tsx

export default function Loading() {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-gradient-to-r from-yellow-100 via-white to-pink-100 animate-pulse">
      <div className="text-4xl font-bold mb-4 text-orange-700 animate-bounce">☕ Brewing your Tapri...</div>
      <div className="w-32 h-32 border-8 border-dashed border-orange-500 rounded-full animate-spin"></div>
      <p className="mt-6 text-sm text-gray-500">Hang tight, good vibes are loading ☁️</p>
    </div>
  );
}
