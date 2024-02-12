import { IoFastFood } from "react-icons/io5";
import { Button } from '@/app/ui/button';

export default function LoginPage() {
  return (
    <main className="flex items-center justify-center md:h-screen bg-blue-700">
      <div className="relative mx-auto flex w-full flex-col space-y-2.5 p-4 md:-mt-32">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '180px', fontSize: '120px', textAlign: 'center' }}>
          <IoFastFood className="h-25 w-25" />
          <span style={{ marginLeft: '10px' }}>FrontDash</span>
        </div>
        <p style={{ textAlign: 'center', fontSize: '1.5rem' }}>
          FrontDash is a food delivery 
          service connecting customers with a wide array of local restaurants and eateries. With its user-friendly 
          platform, customers can easily browse menus, place orders, and receive their food without leaving the comfort of their home. 
          Offering an extensive selection of cuisines, DoorDash provides convenience and quality, making it a go-to choice for food 
          enthusiasts seeking diverse dining experiences delivered straight to their doorstep.
        </p>
        <div className="flex h-8 items-center justify-center space-x-1">
          <Button href='/loginPage'>Login</Button>
          <Button>Register</Button>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-black to-transparent flex items-center justify-center">
        <p>Created by: Matthew Moyer, Tanner Turba, and Samuel Evanson</p>
      </div>
    </main>
  );
}
