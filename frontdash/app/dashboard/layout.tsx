import SideNav from '@/app/ui/dashboard/sidenav';
import Card from '../ui/dashboard/restaurant-card';
import GridList from '../ui/dashboard/gridlist';

export default function Layout({ children }: { children: React.ReactNode }) {
  const cards = [
    { 
        title: 'Card 1', 
        description: 'This is the description of Card 1.', 
        imageUrl: 'https://example.com/image1.jpg' 
    },
    { 
        title: 'Card 2', 
        description: 'This is the description of Card 2.', 
        imageUrl: 'https://example.com/image2.jpg' 
    },
    { 
        title: 'Card 3', 
        description: 'This is the description of Card 3.', 
        imageUrl: 'https://example.com/image3.jpg' 
    },
    { 
        title: 'Card 4', 
        description: 'This is the description of Card 4.', 
        imageUrl: 'https://example.com/image4.jpg' 
    },
    { 
      title: 'Card 5', 
      description: 'This is the description of Card 5.', 
      imageUrl: 'https://example.com/image5.jpg' 
    }
];

  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <SideNav />
      </div>
      <div className="grow p-6 md:overflow-y-auto md:p-12">{children}</div>
      <div className="grow p-6 md:overflow-y-auto md:p-12">
          <GridList cards={cards} />
      </div>
    </div>
  );
}