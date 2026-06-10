export const ErrorScreen = ({ message }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-950 text-white p-4">
      <div className="bg-red-500/10 border border-red-500/20 p-6 rounded-xl text-center">
        <p className="text-red-400 font-medium">🔴 Ops! {message}</p>
      </div>
    </div>
  );
}