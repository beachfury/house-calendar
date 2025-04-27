export function Modal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 ${className}`}>
          {children}
        </div>
      </div>
    );
  }
  