import AddEmployeeForm from '@/app/ui/dashboard/addEmployee/addEmployee-form';
import { cookies } from 'next/headers';

export default async function Page() {
    return (
        <AddEmployeeForm manager={cookies().get('username').value}/>
    );
}