import NextAuth, { DefaultSession } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";

import { db } from "@/lib/db";
import authConfig from "@/auth.config";
import { getTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmation";

export type ExtendedUser = DefaultSession["user"] & {
    role: "STUDENT" | "TEACHER"
}

declare module "next-auth" {
    interface Session {
        user: ExtendedUser
    }
}

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut
} = NextAuth({
    pages: {
        signIn: "/auth/login",
        error: "/auth/error"
    },
    events: {
        async linkAccount({ user }) {
            await db.user.update({
                where: { id: user.id },
                data: { emailVerified: new Date() }
            })
        }
    },
    callbacks: {
        async signIn({ user, account }) {
            //Allow OAuth without email verification
            if (account?.provider !== "credentials") return true;

            const id = user.id;
            const exsistingUser = await db.user.findUnique({ where: { id } });

            //Prevent sign in without email verification
            if (!exsistingUser || !exsistingUser.emailVerified) {
                return false;
            }

            if (exsistingUser.isTwoFactorEnabled) {
                const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(exsistingUser.id);

                if (!twoFactorConfirmation) return false;

                await db.twoFactorConfirmation.delete({
                    where: { id: twoFactorConfirmation.id }
                })
            }

            return true;
        },
        async session({ token, session }) {
            if (token.sub && session.user) {
                session.user.id = token.sub;
            }
            if (token.role && session.user) {
                session.user.role = token.role as "STUDENT" | "TEACHER";
            }
            return session;
        },
        async jwt({ token }) {
            if (!token.sub) return token;

            const id = token.sub;
            const exsistingUser = await db.user.findUnique({ where: { id } });

            if (!exsistingUser) return token;

            token.role = exsistingUser.role;

            return token;
        }
    },
    adapter: PrismaAdapter(db),
    session: { strategy: "jwt" },
    ...authConfig,
});