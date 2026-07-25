import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({
    user: "Harkirat",
    email: "Harkirat@gmail.com",
  });
}

export function POST() {
  return NextResponse.json({
    user: "Harkirat",
    email: "Harkirat@gmail.com",
  });
}