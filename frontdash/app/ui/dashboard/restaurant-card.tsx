export default function Card({title, description, imageUrl}) {
    return (
        <div className="grow rounded-lg bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3 dark:bg-gray-900 dark:hover:bg-sky-900 dark:hover:text-blue-400">
            <img src={imageUrl} alt={title} className="w-full h-40 object-cover mb-4 rounded-lg" />
            <h2 className="text-xl font-semibold mb-2">{title}</h2>
            <p className="text-gray-700 dark:text-gray-300">{description}</p>
        </div>
    );
}