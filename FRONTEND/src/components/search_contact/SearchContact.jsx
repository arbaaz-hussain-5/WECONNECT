import { useEffect, useState } from "react";
import "./SearchContact.css";
import { useNavigate } from "react-router";

function SearchContact({ search_data, current_user }) {
  const [daser, setDaser] = useState([]);
  console.log(search_data);
  useEffect(() => {
    fetch(`${import.meta.env.VITE_SERVER_URL}/search`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id: current_user, reg: search_data }),
    }).then(async (response) => {
      if (response.status == 200) {
        const data = await response.json();
        setDaser(data);
      } else if (response.status == 401) {
        console.log("unauthorized access");
      } else {
        console.log("something went wrong while processing your request");
      }
    });
  }, [search_data, current_user]);

  return (
    <div className="search_contact">
      <div className="serhead">
        <span>People</span>
      </div>
      <div className="sscon">
      {daser.map((cont, index) => {
        return <SearchCon key = {index} name={cont.user_id} pic={cont.profile_pic} />;
      })}
      </div>
    </div>
  );
}

function SearchCon({ name, pic }) {
  const navigate = useNavigate();
  return (
    <div
      className="serch_cont"
      onClick={() => {
        navigate("/profile/" + name);
      }}
    >
      <img src={pic} />
      <span>{name}</span>
    </div>
  );
}

export default SearchContact;
