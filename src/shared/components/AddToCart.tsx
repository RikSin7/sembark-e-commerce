export default function AddToCart({ onAdding }) {
    return (
        <button
            onClick={(e) => {
                e.preventDefault();
                onAdding();
            }}
            className="mt-2 px-4 py-2 border rounded">
            Add to Cart
        </button>
    )
}