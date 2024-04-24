import { getAllActiveDrivers } from "@/scripts/user";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    let drivers = await getAllActiveDrivers();
    return NextResponse.json(drivers);
}