import { authMiddleware } from "@clerk/nextjs/server";
 
// https://clerk.com/docs/references/nextjs/auth-middleware
export default authMiddleware({
  publicRoutes: ["/api/uploadthing"],
});
 
export const config = {
      matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
 