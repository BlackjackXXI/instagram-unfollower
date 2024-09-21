import "./styles.css";
import { useState } from "react";

export default function App() {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState(
    "⚠️ Primero debes subir el archivo 'usersNotFollowingBack.json'"
  );

  const handleCopyToClipboard = () => {
    const usersToUnfollow = users.filter((user) => user.checked);
    navigator.clipboard.writeText(JSON.stringify(usersToUnfollow)).then(() => {
      alert("Usuarios a eliminar copiados! 📄");
    });
  };

  const handleUploadFile = (e) => {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], "UTF-8");
    fileReader.onload = (e) => {
      const jsonFile = JSON.parse(e.target.result);
      setUsers(jsonFile);
      setMessage(
        "Selecciona (☑) de la lista los usuarios que queres dejar de seguir."
      );
    };
  };

  const handleUnfollowAll = () => {
    setUsers(users.map((user) => ({ ...user, checked: true })));
  };

  const handleCheckBoxChange = (e) => {
    const { name, checked } = e.target;
    setUsers(
      users.map((user) =>
        user.username === name ? { ...user, checked } : user
      )
    );
  };

  const handleListItemClick = (username) => {
    setUsers(
      users.map((user) =>
        user.username === username ? { ...user, checked: !user.checked } : user
      )
    );
  };

  return (
    <div className="App p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
        Remove Instagram Unfollowers
      </h1>
      <input
        type="file"
        onChange={handleUploadFile}
        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
      />
      <hr className="my-4" />
      <span className="text-gray-600 block text-center">{message}</span>
      <button
        onClick={handleUnfollowAll}
        disabled={!users.length}
        className="mt-4 w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Seleccionar todos los usuarios de la lista
      </button>
      {users.length > 0 && (
        <div className="space-y-2">
          {users.map((user) => (
            <div
              key={user.username}
              onClick={() => handleListItemClick(user.username)}
              className="flex justify-between items-center bg-gray-100 p-2 rounded-lg cursor-pointer"
            >
              <div className="flex-1">
                <div className="text-gray-800 font-semibold">
                  {user.full_name}
                </div>
                <a
                  href={`http://instagram.com/${user.username}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 hover:text-blue-800"
                  onClick={(e) => e.stopPropagation()}
                >
                  @{user.username}
                </a>
              </div>
              <input
                name={user.username}
                type="checkbox"
                checked={user.checked}
                onChange={handleCheckBoxChange}
                className="form-checkbox text-blue-600"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          ))}
        </div>
      )}
      <hr className="my-4" />
      <button
        onClick={handleCopyToClipboard}
        disabled={!users.length}
        className="w-full py-2 px-4 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Copiar lista de usuarios seleccionados
      </button>
      <div className="mt-6">
        <h4 className="font-semibold text-gray-700">Resources:</h4>
        <a
          target="_blank"
          rel="noreferrer"
          href="https://github.com/ann0nip/RemoveInstagramUnfollowers"
          className="text-blue-600 hover:text-blue-800"
        >
          Remove Instagram Unfollowers
        </a>
        <br />
        <a
          target="_blank"
          rel="noreferrer"
          href="https://jsonformatter.org/json-viewer/"
          className="text-blue-600 hover:text-blue-800"
        >
          JSON Formatter
        </a>
      </div>
    </div>
  );
}
