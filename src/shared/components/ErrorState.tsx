interface ErrorStateProps {
    message: string;
    onRetry?: () => void;
}

function ErrorState({ message, onRetry }: ErrorStateProps) {
    return (
        <div className="text-center flex flex-col items-center justify-center py-12 h-[calc(100vh-100px)]">
            <p className="text-red-500 mb-4">{message}</p>
            {onRetry && (
                <button
                    onClick={onRetry}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Retry
                </button>
            )}
        </div>
    )
}

export default ErrorState