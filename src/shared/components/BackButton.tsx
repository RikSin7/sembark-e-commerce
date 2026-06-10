import { useNavigate } from "react-router-dom";

function BackButton() {
    const navigate = useNavigate();
    return (
        <button
            onClick={() => navigate(-1)}
            className="my-4 px-4 py-2 border rounded"
        >
            Back
        </button>
    );
}

export default BackButton