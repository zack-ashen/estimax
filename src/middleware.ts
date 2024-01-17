import { authMiddleware } from '@clerk/nextjs';
import { redirectToSignIn } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { Role, type SessionPublicMetadata } from './types';

const onboardingRoutes = [
  '/api/locations/search',
  '/api/propertyManagers',
  '/api/vendors',
  '/api/media',
];

const vendorRoute = '/vendor';

const propertyManagerRoute = '/pm';

export default authMiddleware({
  afterAuth(auth, req, evt) {
    const sessionClaims: SessionPublicMetadata = auth.sessionClaims
      ?.publicMetadata as SessionPublicMetadata;

    if (onboardingRoutes.includes(req.nextUrl.pathname)) {
      return NextResponse.next();
    }

    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: req.url });
    }

    // Redirect to onboarding if not completed
    if (
      auth.userId &&
      !sessionClaims.onboarding &&
      req.nextUrl.pathname !== '/auth/onboarding'
    ) {
      const onboardingUrl = new URL('/auth/onboarding', req.url);
      return NextResponse.redirect(onboardingUrl, 308);
    }

    // Redirect to vendor if vendor trying to access non vendor route
    if (
      auth.userId &&
      sessionClaims.role &&
      sessionClaims.role === Role.VENDOR && // Compare with the property "vendor" from the Role type
      !req.nextUrl.pathname.startsWith(vendorRoute)
    ) {
      const vendor = new URL('/vendor', req.url);
      return NextResponse.redirect(vendor);
    }

    // Redirect to pm if pm trying to access non pm route
    if (
      auth.userId &&
      sessionClaims.role &&
      sessionClaims.role === Role.PROPERTY_MANAGER &&
      !req.nextUrl.pathname.startsWith(propertyManagerRoute)
    ) {
      console.log('redirecting to pm1111');
      const pm = new URL('/pm', req.url);
      return NextResponse.redirect(pm);
    }

    return NextResponse.next();
  },

  publicRoutes: [
    '/api/auth/webhooks(.*)',
    '/',
    '/auth/signin',
    '/auth/signup',
    '/auth/sso-callback',
  ],
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
