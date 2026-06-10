function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="bg-gray-800 text-white py-4 mt-8">
            <div className="container mx-auto px-4 text-center">
                <p className="text-sm text-gray-400 mt-2">© {year} Shoppy. All rights reserved.</p>
            </div>
        </footer>
    );
}

export default Footer