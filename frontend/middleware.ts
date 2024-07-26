import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { mo3itoPakToken } from "./help/tokenName";
import { jwtDecode, JwtPayload } from "jwt-decode";

type CustomJwtPayload = JwtPayload & {
  infos?: {
    is_customer?: boolean;
    is_driver?: boolean;
    is_dryer?: boolean;
    is_register_by_admin?: boolean;
    is_admin: boolean;
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

  const publicPaths = [
    "/application/validation/enter-phone-number",
    "/application/validation/verify-code",
    "/application/registration",
  ];

  if (pathname.startsWith("/application")) {
    if (tokenValue?.infos?.is_customer) {
      return NextResponse.next();
    } else if (!publicPaths.some((path) => pathname.startsWith(path))) {
      return NextResponse.redirect(
        new URL("/application/validation/enter-phone-number", request.url)
      );
    }
  }

  if (
    pathname.startsWith("/driver") &&
    !pathname.startsWith("/driver/register") &&
    !pathname.startsWith("/driver/login") &&
    !tokenValue?.infos?.is_driver
  ) {
    return NextResponse.redirect(new URL("/driver/login", request.url));
  }

  if (
    pathname === "/driver/orders/get" &&
    tokenValue?.infos?.is_driver &&
    !tokenValue.infos?.is_register_by_admin
  ) {
    return NextResponse.redirect(new URL("/driver", request.url));
  }

  if (
    pathname === "/driver/orders/send" &&
    tokenValue?.infos?.is_driver &&
    !tokenValue.infos?.is_register_by_admin
  ) {
    return NextResponse.redirect(new URL("/driver", request.url));
  }

  if (
    pathname.startsWith("/dryer") &&
    !pathname.startsWith("/dryer/register") &&
    !pathname.startsWith("/dryer/login") &&
    !tokenValue?.infos?.is_dryer
  ) {
    return NextResponse.redirect(new URL("/dryer/login", request.url));
  }

  if (
    pathname.startsWith("/admin") &&
    !pathname.startsWith("/admin/register") &&
    !pathname.startsWith("/admin/login") &&
    !tokenValue?.infos?.is_admin
  ) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }
}
