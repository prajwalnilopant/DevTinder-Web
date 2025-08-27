import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";
import UserCard from "./UserCard";
import { useRef } from "react";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [photoURL, setPhotoURL] = useState(user.photoURL);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [about, setAbout] = useState(user.about);
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);

  const dispatch = useDispatch();
  const genderRef = useRef(null);

  const saveProfile = async () => {
    setError(""); // Clear Errors
    try {
      const res = await axios.patch(`${BASE_URL}/profile/edit`, { firstName, lastName, photoURL, age, gender, about }, { withCredentials: true });

      dispatch(addUser(res?.data?.data));
      setShowToast(true);

      setTimeout(() => setShowToast(false), 3000);
    } catch (err) {
      setError(err.response?.data || "Something went wrong!");
    }
  };

  return (
    <>
      <div className="flex justify-center my-10 gap-10">
        {/* Edit Profile Form */}
        <div className="card bg-base-300 w-96 shadow-xl">
          <div className="card-body">
            <h2 className="card-title justify-center">Edit Profile</h2>

            {/* First Name */}
            <label className="form-control w-full max-w-xs my-2">
              <span className="label-text">First Name:</span>
              <input type="text" value={firstName} className="input input-bordered w-full max-w-xs" onChange={(e) => setFirstName(e.target.value)} />
            </label>

            {/* Last Name */}
            <label className="form-control w-full max-w-xs my-2">
              <span className="label-text">Last Name:</span>
              <input type="text" value={lastName} className="input input-bordered w-full max-w-xs" onChange={(e) => setLastName(e.target.value)} />
            </label>

            {/* Photo URL */}
            <label className="form-control w-full max-w-xs my-2">
              <span className="label-text">Photo URL:</span>
              <input type="text" value={photoURL} className="input input-bordered w-full max-w-xs" onChange={(e) => setPhotoURL(e.target.value)} />
            </label>

            {/* Age */}
            <label className="form-control w-full max-w-xs my-2">
              <span className="label-text">Age:</span>
              <input type="text" value={age} className="input input-bordered w-full max-w-xs" onChange={(e) => setAge(e.target.value)} />
            </label>

            {/* Gender Dropdown */}
            <label className="form-control w-full max-w-xs my-2">
              <span className="label-text">Gender:</span>
              <details className="dropdown" ref={genderRef}>
                <summary className="border border-accent rounded-md px-2 py-1 w-full text-left font-semibold mx-2 hover:bg-accent hover:text-white transition-colors">
                  {gender || "Select Gender"}
                </summary>

                <ul className="menu dropdown-content bg-base-100 rounded-box w-52 p-2 shadow-lg border border-gray-300 mt-1">
                  {["Male", "Female", "Others"].map((g) => (
                    <li key={g}>
                      <a
                        onClick={() => {
                          setGender(g.toLowerCase());
                          genderRef.current.open = false; // 👈 closes the dropdown
                        }}
                        className="hover:bg-accent hover:text-white rounded-lg transition-colors"
                      >
                        {g}
                      </a>
                    </li>
                  ))}
                </ul>
              </details>
            </label>

            {/* About */}
            <label className="form-control w-full max-w-xs my-2">
              <span className="label-text">About:</span>
              <textarea
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                className="textarea textarea-bordered w-full max-w-xs"
                rows={4} // controls height
                placeholder="Tell us about yourself..."
              />
            </label>

            {/* Error Message */}
            {error && <p className="text-red-500 text-sm">{error}</p>}

            {/* Save Button */}
            <div className="card-actions justify-center mt-4">
              <button className="btn btn-primary" onClick={saveProfile}>
                Save Profile
              </button>
            </div>
          </div>
        </div>

        {/* Preview Card */}
        <UserCard user={{ firstName, lastName, photoURL, age, gender, about }} />
      </div>

      {/* Success Toast */}
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile Updated Successfully!</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
