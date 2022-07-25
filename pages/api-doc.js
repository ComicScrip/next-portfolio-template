import Script from "next/script";

export default function ApiDoc() {
  return (
    <>
      <Script
        src="https://unpkg.com/rapidoc/dist/rapidoc-min.js"
        type="module"
      />
      <rapi-doc spec-url="/api-spec.yaml" theme="dark">
        {" "}
      </rapi-doc>
    </>
  );
}
