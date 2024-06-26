import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { mo3itoPakToken } from "./help/tokenName";
import { jwtDecode, JwtPayload } from "jwt-decode";

type CustomJwtPayload = JwtPayload & {
  infos?: {
    is_customer?: boolean;
    is_driver?: boolean;
  };
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = await request.cookies.get(mo3itoPakToken)?.value;
  let tokenValue: CustomJwtPayload | null = null;
  if (token) {
    try {
      tokenValue = jwtDecode<CustomJwtPayload>(token);
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  }

  if (
    pathname.startsWith("/application") &&
    !pathname.startsWith("/application/validation/enter-phone-number") &&
    !pathname.startsWith("/application/validation/verify-code") &&
    !pathname.startsWith("/application/registration") &&
    !tokenValue?.infos?.is_customer
  ) {
    return NextResponse.redirect(
      new URL("/application/validation/enter-phone-number", request.url)
    );
  }

  if (
    pathname.startsWith("/driver") &&
    !pathname.startsWith("/driver/register") &&
    !pathname.startsWith("/driver/login") &&
    !tokenValue?.infos?.is_driver
  ) {
    return NextResponse.redirect(new URL("/driver/register", request.url));
  }
}
