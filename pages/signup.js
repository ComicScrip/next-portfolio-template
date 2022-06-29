import Layout from "../components/Layout";
import axios from "axios";
import { useState } from "react";
import Link from "next/link";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function SignupPage() {
  const { t } = useTranslation("signup");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    axios
      .post("/api/users", { email, name, password })
      .then(() => {
        toast.success(t("signupSuccess", { email }));
        setName("");
        setEmail("");
        setPassword("");
      })
      .catch((err) => {
        if (err.response && err.response.status === 409)
          setError(t("duplicateEmail"));
      });
  };

  return (
    <Layout pageTitle="register">
      <div className="mt-16 flex flex-col justify-center items-center">
        <h1 className="pageTitle text-center ">{t("signup")}</h1>
        <form
          onSubmit={handleSubmit}
          className="p-6 bg-slate-700/50 mt-6 rounded-xl w-80"
        >
          <label htmlFor="name">
            {t("name")}
            <input
              className="block mb-6 w-full"
              required
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label htmlFor="email">
            Email
            <input
              required
              className="block mb-6 w-full"
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <label htmlFor="password">
            {t("password")}
            <input
              className="block mb-6 w-full"
              required
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button className="w-full" type="submit">
            {t("letsgo")}
          </button>
          {error && <p className="pt-6">{error}</p>}
        </form>
        <Link href="/login">
          <a className="mt-6 text-sky-300 hover:text-sky-400">
            {t("alreadyHaveAnAccount")}
          </a>
        </Link>
      </div>
    </Layout>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "signup"])),
    },
  };
}
