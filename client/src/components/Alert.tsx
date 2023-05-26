export default function Alert({ type, message } : { type: string, message: string }) {
  return (
    <div className={`${type === "error" ? `bg-red-400` : `bg-green-400`} p-4 rounded-md mb-4`}>
      <p className="text-white">{message}</p>
    </div>
  );
}



