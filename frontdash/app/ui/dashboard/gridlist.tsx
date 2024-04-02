import Card from "./restaurant-card";

export default function GridList( { cards } ) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {cards.map((card, index) => (
                <Card
                    key={index}
                    title={card.title}
                    description={card.description}
                    imageUrl={card.imageUrl}
                    restaurantId={card.restaurantId}
                />
            ))}
        </div>
    );
}