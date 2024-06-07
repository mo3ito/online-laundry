import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { mo3itoPakToken } from "./help/tokenName";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(mo3itoPakToken)?.value;

  if (
    pathname.startsWith("/application") &&
    !pathname.startsWith("/application/validation/enter-phone-number") &&
    !pathname.startsWith("/application/validation/verify-code") &&
    !token
  ) {
    return NextResponse.redirect(
      new URL("/application/validation/enter-phone-number", request.url)
    );
  }
}
