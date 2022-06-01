import Layout from "../components/Layout";
import CurrentUserContext from "../contexts/currentUserContext";
import { signIn, signOut } from "next-auth/react";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import { useContext } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

export default function LoginPage({ csrfToken }) {
  const { currentUserProfile } = useContext(CurrentUserContext);
  const { query } = useRouter();
  const { t } = useTranslation("login");

  return (
    <Layout pageTitle={t("login")}>
      <div className="m-6">
        {currentUserProfile ? (
          <div className="flex flex-col items-center">
            {t("loggedInAs")} {currentUserProfile.email} <br />
            <button className="mt-6" onClick={() => signOut()}>
              {t("logout")}
            </button>
          </div>
        ) : (
          <>
            <h1 className="pageTitle text-center">{t("login")}</h1>

            <div className="max-w-xl m-auto flex flex-col items-center">
              <button className="" onClick={() => signIn("github")}>
                {t("with")} Github
              </button>

              <p className="text-2xl mt-8 mb-8 text-center">{t("or")}</p>

              <form
                method="post"
                className="bg-slate-700 p-12 rounded-2xl shadow-black/30 shadow-lg min-w-[320px]"
                action="/api/auth/callback/credentials"
              >
                <input
                  id="csrfToken"
                  name="csrfToken"
                  type="hidden"
                  defaultValue={csrfToken}
                />
                <label>
                  {t("username")}
                  <input
                    id="username"
                    name="username"
                    type="text"
                    className="block w-full mb-2"
                    placeholder="me@something.com"
                  />
                </label>
                <label>
                  {t("password")}
                  <input
                    className="block w-full"
                    name="password"
                    type="password"
                    id="password"
                  />
                </label>
                <button
                  id="credentials-login-btn"
                  className="bg-amber-500 mt-6 w-full"
                  type="submit"
                >
                  {t("tryThoseCredentials")}
                </button>
                {query.error === "CredentialsSignin" && (
                  <p className="p-6 bg-slate-700 text-red-400 font-bold text-center">
                    {t("invalidCredsMessage")}
                  </p>
                )}
                <Link href="/signup">
                  <a className="mt-6 text-sky-300 hover:text-sky-400 text-center w-full block">
                    {t("notRegistered")}
                  </a>
                </Link>
              </form>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}

const getCsrfTokenAndSetCookies = async ({ res, query }) => {
  // to make it work on Vercel
  let baseUrl = process.env.NEXTAUTH_URL || `https://${process.env.VERCEL_URL}`;
  // capturing the callback url if any, which should include the current domain for security ?
  const callbackUrlIsPresent = typeof query?.callbackUrl === "string";
  const callbackUrlIsValid =
    callbackUrlIsPresent && query?.callbackUrl.startsWith(baseUrl);
  const host = callbackUrlIsValid ? query?.callbackUrl : baseUrl;
  const redirectURL = encodeURIComponent(host);
  // getting both the csrf form token and (next-auth.csrf-token cookie + next-auth.callback-url cookie)
  const csrfUrl = `${baseUrl}/api/auth/csrf?callbackUrl=${redirectURL}`;
  const csrfResponse = await fetch(csrfUrl);
  const { csrfToken } = await csrfResponse.json();
  const { headers } = csrfResponse;
  // placing the cookies
  const [csrfCookie, redirectCookie] = headers.get("set-cookie").split(",");
  res.setHeader("set-cookie", [csrfCookie, redirectCookie]);
  // placing form csrf token
  return csrfToken;
};

export async function getServerSideProps(context) {
  return {
    props: {
      csrfToken: await getCsrfTokenAndSetCookies(context),
      ...(await serverSideTranslations(context.locale, ["common", "login"])),
    },
  };
}
