import { cookies } from "next/headers";
import EditHoursForm from "../ui/dashboard/hours/modify-hours-form";
import { getAvailability } from "@/scripts/availability";

export default async function Page() {
  let username = cookies().get('username').value;
  let availability = (await getAvailability(username))[0];
  console.log(availability);

    return (
      <main>
        <EditHoursForm availability={availability} />
      </main>
    );
  }