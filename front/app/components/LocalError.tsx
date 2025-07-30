// "use client"

// type LocalErrorProps = {
//   message: string
//   onRetry?: () => void
// }

// export default function LocalError({ message, onRetry }: LocalErrorProps) {
//   return (
//     <div className="text-red-600 p-4">
//       <p>{message}</p>
//       {onRetry && (
//         <button onClick={onRetry} className="mt-2 px-3 py-1 bg-blue-500 text-white rounded">
//           再試行
//         </button>
//       )}
//     </div>
//   );
// }