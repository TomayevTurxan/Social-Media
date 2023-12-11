import { Button, Col, Layout, Row } from "antd";
import style from "./index.module.scss";
import { useContext, useEffect, useState } from "react";
import { UserContextItem } from "../../../services/context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import Input from "antd/es/input/Input";
import { UserContext } from "../../../services/context/UsersContext";
import { getAllUsers } from "../../../services/api/user";
import { FilterUserContext } from "../../../services/context/FilteredUser";

const UserNavbar = () => {
  let { user, setUser } = useContext(UserContextItem);
  let { users, setUsers } = useContext(UserContext);
  let [search, setSearch] = useState("");
  let { filteredUsers, setFilteredUsers } = useContext(FilterUserContext);

  const navigate = useNavigate();

  const Logout = () => {
    navigate("/Login");
    setUser(null);
    localStorage.setItem("user", JSON.stringify([]));
  };

  useEffect(() => {
    getAllUsers().then((data) => {
      setUsers(data);
    });
  }, []);

  const handleSearch = (searchTerm) => {
    const filtered = users.filter((item) =>
      item.username
        .trim()
        .toLowerCase()
        .includes(searchTerm.trim().toLowerCase())
    );
    setFilteredUsers(filtered);
  };
  const clearSearchResults = () => {
    setFilteredUsers([]);
  };
  // console.log("filteredUsers", user);
  // console.log("filteredUsers", filteredUsers);
  // console.log("search", search);
  // console.log("users", users);
  // const filteredUsers =[]
  // const filteredUsers = users.filter((item) =>
  //   item.username.trim().toLowerCase().includes(search.trim().toLowerCase())
  // );
  // console.log("filteruser", filteredUsers);
  const handleFollow = async (id) => {
    console.log("id", id);
    let obj = users.find((elem) => elem.id == id);
    console.log("obj", obj);

    const isAlreadyFollowed = obj.requests.find(
      (follower) => follower.userID === user.id
    );
    const isAlreadyFollowed2 = obj.followers.find(
      (follower) => follower.userID === user.id
    );
    if (isAlreadyFollowed) {
      obj.requests = obj.requests.filter(
        (follower) => follower.userID !== user.id
      );
      console.log("Unfollowed");
    } else if (isAlreadyFollowed2) {
      obj.followers = obj.followers.filter(
        (follower) => follower.userID !== user.id
      );
    } else {
      if (!obj.isPublic) {
        obj.requests.push({ id: Date.now().toString(), userID: user.id });
        console.log("Followed");
      } else {
        obj.followers.push({ id: Date.now().toString(), userID: user.id });
        console.log("Follow request sent");
      }
    }
    const updatedUsers = users.map((user) => (user.id === obj.id ? obj : user));
    setUsers(updatedUsers);
    // console.log("obj",obj)
    const response = await fetch(
      `https://656dfda1bcc5618d3c245df9.mockapi.io/Users/${obj.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      }
    );
    if (!response.ok) {
      throw new Error("eror");
    }

    return await response.json();
  };

  return (
    <Row
      style={{
        backgroundColor: "#0476D0",
      }}
    >
      <div className="container">
        <Row className="navbar">
          <Col xs={8} sm={6} md={6} lg={6} xl={6}>
            <Link
              style={{
                marginRight: "20px",
              }}
              to="/user/Home"
            >
              <img
                style={{
                  width: "50px",
                }}
                src={user.profilePicture}
                alt=""
              />
            </Link>
          </Col>
          <Col xs={16} sm={12} md={12} lg={12} xl={12}>
            <div
              style={{
                position: "relative",
              }}
            >
              <Input
                style={{
                  width: "50%",
                  margin: "0 auto",
                }}
                placeholder="Search"
                onChange={(e) => {
                  setSearch(e.target.value);
                  clearSearchResults();
                  // if (search.trim().toLowerCase(.includes())) {
                  // }
                }}
              />
              <Button
                style={{
                  backgroundColor: "white",
                  border:"none"
                }}
                onClick={() => handleSearch(search)}
              >
                Search
              </Button>
            </div>
            <div
              className={style.searchDiv}
              style={{ height: `${search.length * 10}px` }}
            >
              <ul
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {console.log(filteredUsers)}
                {filteredUsers &&
                  filteredUsers.map((item) => {
                    console.log("itemId", item.id);

                    return (
                      <li
                        key={item.id}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Link to="/user/SearchUser">
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <img
                              style={{
                                marginRight: "10px",
                              }}
                              src={item.profilePicture}
                              alt=""
                            />
                            {item.username}
                          </div>
                        </Link>
                        <button
                          data-id={item.id}
                          onClick={(e) => {
                            console.log(item.id);
                            handleFollow(e.target.getAttribute("data-id"));
                          }}
                        >
                          {item.followers.find(
                            (follower) => follower.userID === user.id
                          )
                            ? "Followed"
                            : item.requests.find(
                                (follower) => follower.userID === user.id
                              )
                            ? "Requested"
                            : item.isPublic
                            ? "Follow +"
                            : "Private"}
                        </button>
                      </li>
                    );
                  })}
              </ul>
            </div>
          </Col>
          <Col xs={24} sm={6} md={6} lg={6} xl={6}>
            <Link to="/user/UserPage">
              <span
                style={{
                  marginRight: "20px",
                  color: "white",
                  textTransform: "uppercase",
                }}
              >
                {user.username}
              </span>
            </Link>
            <Button
              onClick={Logout}
              type="primary"
              style={{
                backgroundColor: "red",
              }}
            >
              Log Out
            </Button>
          </Col>
        </Row>
      </div>
    </Row>
  );
};

export default UserNavbar;
