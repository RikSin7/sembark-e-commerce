export default function Loader() {
    return (
        <div className="flex flex-col items-center justify-center py-12 h-[calc(100vh-100px)]">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-600">Loading products...</p>
        </div>
    );
}