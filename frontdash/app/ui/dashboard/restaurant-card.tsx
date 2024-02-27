export default function Card({title, description, imageUrl}) {
    return (
        <div className="bg-white rounded-lg shadow-lg p-6">
            <img src={imageUrl} alt={title} className="w-full h-40 object-cover mb-4 rounded-lg" />
            <h2 className="text-xl font-semibold mb-2">{title}</h2>
            <p className="text-gray-700">{description}</p>
        </div>
    );
}