import Layout from "../components/Layout";
import { confirmEmail } from "../models/user";
import Link from "next/link";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

export default function ConfirmEmailPage({ verified }) {
  const { t } = useTranslation("confirm-email");

  return (
    <Layout pageTitle={"Confirmation e-mail"}>
      <div className="text-center flex flex-col justify-center items-center mt-16">
        {verified ? (
          <div>{t("thanksForConfirming")}</div>
        ) : (
          <div>{t("invalidCode")}</div>
        )}

        <div>
          <Link href="/login">
            <a className="mt-6 inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-slate-800 hover:bg-white">
              {t("login")}
            </a>
          </Link>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ query, locale }) {
  const verified = await confirmEmail(query?.emailVerificationCode);
  return {
    props: {
      verified,
      ...(await serverSideTranslations(locale, ["common", "confirm-email"])),
    },
  };
}
