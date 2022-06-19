import { useState, useEffect } from "react";
import AdminLayout from "../../../components/AdminLayout";
import axios from "axios";
import { useRouter } from "next/router";
import qs from "query-string";

export default function UserListAdmin() {
  const [users, setUsers] = useState();
  const [error, setError] = useState("");
  const router = useRouter();
  const {
    pageNumber = 1,
    perPage = 10,
    nameOrEmailContains = "",
    active = "",
    sortBy = "",
  } = router.query;

  const [numberOfPages, setNumberOfPages] = useState(1);

  console.log(router.query);

  useEffect(() => {
    setError("");
    const controller = new AbortController();
    axios
      .get(`/api/users?${qs.stringify(router.query)}`, {
        signal: controller.signal,
      })
      .then((res) => {
        setUsers(res.data);
        if (res.headers["x-total-count"])
          setNumberOfPages(
            Math.ceil(parseInt(res.headers["x-total-count"], 10) / perPage)
          );
      })
      .catch((e) => {
        if (!axios.isCancel(e))
          setError("could not retrive users from the API");
      });

    return () => {
      controller.abort();
    };
  }, [router.query]);

  const setSearchParams = (newSearch) => {
    const queryString = qs.stringify(
      { ...router.query, pageNumber: 1, ...newSearch },
      { skipEmptyString: true }
    );
    router.push(`/admin/users${queryString ? "?" : ""}${queryString}`);
  };

  return (
    <AdminLayout pageTitle="Manage users">
      <h1 className="text-4xl font-bold mb-8">Manage users</h1>
      <label htmlFor="nameOrEmailContains" className="block">
        Search by name or email{" "}
        <input
          data-cy="nameOrEmailContains"
          className="p-2"
          id="nameOrEmailContains"
          value={nameOrEmailContains}
          onChange={(e) =>
            setSearchParams({
              nameOrEmailContains: e.target.value,
              pageNumber: 1,
            })
          }
        ></input>
      </label>
      <label htmlFor="active" className="block">
        Status{" "}
        <select
          data-cy="activeSelect"
          id="active"
          value={active}
          onChange={(e) => setSearchParams({ active: e.target.value })}
        >
          <option value="">All</option>
          <option value="true">Active</option>
          <option value="false">Not active</option>
        </select>
      </label>

      {error && <div className="text-red-500">{error}</div>}
      {!users && <p>Loading...</p>}
      {users?.length === 0 && <p>No user seems to match your search</p>}

      {users && users.length !== 0 && (
        <>
          <label htmlFor="pageNumber">
            Current page :
            <select
              data-cy="currentPageSelect"
              id="pagenumber"
              value={pageNumber}
              onChange={(e) => setSearchParams({ pageNumber: e.target.value })}
            >
              {Array(numberOfPages)
                .fill()
                .map((_, i) => i + 1)
                .map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
            </select>
          </label>
          <label htmlFor="perpage" className="ml-4">
            Max items per page :
            <select
              data-cy="perPageSelect"
              id="perpage"
              value={perPage}
              onChange={(e) => setSearchParams({ perPage: e.target.value })}
            >
              {[2, 5, 10, 20, 50].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </label>
          <table className="table-auto mt-[30px] mb-6 w-full">
            <thead>
              <tr>
                <th>
                  <div className="flex relative left-[10px]">
                    <div className="mr-4">Name</div>
                    <div className="flex">
                      <div
                        data-cy="sortByNameAscBtn"
                        onClick={() =>
                          setSearchParams({
                            sortBy: sortBy === "name.asc" ? "" : "name.asc",
                          })
                        }
                        className={`h-0 w-0 border-x-8 border-x-transparent border-b-[12px] relative top-1 cursor-pointer ${
                          sortBy === "name.asc"
                            ? "border-b-slate-700"
                            : "border-b-gray-300"
                        }`}
                      />
                      <div
                        data-cy="sortByNameDescBtn"
                        onClick={() =>
                          setSearchParams({
                            sortBy: sortBy === "name.desc" ? "" : "name.desc",
                          })
                        }
                        className={`rotate-180 h-0 w-0 border-x-8 border-x-transparent border-b-[12px] cursor-pointer ${
                          sortBy === "name.desc"
                            ? "border-b-slate-700"
                            : "border-b-gray-300"
                        } relative top-1`}
                      />
                    </div>
                  </div>
                </th>
                <th>
                  <div className="flex relative left-[10px]">
                    <div className="mr-4">Email</div>
                    <div className="flex">
                      <div
                        data-cy="sortByEmailAscBtn"
                        onClick={() =>
                          setSearchParams({
                            sortBy: sortBy === "email.asc" ? "" : "email.asc",
                          })
                        }
                        className={`h-0 w-0 border-x-8 border-x-transparent border-b-[12px] relative top-1 cursor-pointer ${
                          sortBy === "email.asc"
                            ? "border-b-slate-700"
                            : "border-b-gray-300"
                        }`}
                      />
                      <div
                        data-cy="sortByEmailDescBtn"
                        onClick={() =>
                          setSearchParams({
                            sortBy: sortBy === "email.desc" ? "" : "email.desc",
                          })
                        }
                        className={`rotate-180 h-0 w-0 border-x-8 border-x-transparent border-b-[12px] cursor-pointer ${
                          sortBy === "email.desc"
                            ? "border-b-slate-700"
                            : "border-b-gray-300"
                        } relative top-1`}
                      />
                    </div>
                  </div>
                </th>
                <th>Active</th>
              </tr>
            </thead>
            <tbody>
              {users.map(({ id, name, email, active }, index) => (
                <tr
                  className="border-b"
                  key={id}
                  data-cy={`users-table-row-${index}`}
                >
                  <td className="p-3 font-bold ">{name}</td>
                  <td className="p-3 font-bold text-center">{email}</td>
                  <td className="p-3 font-bold text-center">
                    {active ? "✅" : "❌"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </AdminLayout>
  );
}
