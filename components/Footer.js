export default function Footer() {
  return (
    <footer className="bg-slate-700 p-6 text-white">
      <nav className="flex flex-col items-center">
        <div className="flex">
          {/* eslint-disable-next-line */}
          <img
            width={20}
            height={20}
            src="https://upload.wikimedia.org/wikipedia/commons/8/8b/Copyleft.svg"
            alt="copyleft"
            className="mr-4"
            style={{ filter: "invert(1)" }}
          />
          CopyLeft - 2021
        </div>
      </nav>
    </footer>
  );
}
