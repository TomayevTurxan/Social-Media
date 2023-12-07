import style from "./index.module.scss";
import { Button, Card, Col, Row } from "antd";
import { useContext, useEffect, useState } from "react";
import { UserContextItem } from "../../../services/context/UserContext";
import { FilterUserContext } from "../../../services/context/FilteredUser";
import { UserContext } from "../../../services/context/UsersContext";

const SearchUser = () => {
  let { user, setUser } = useContext(UserContextItem);
  let { users, setUsers } = useContext(UserContext);
  let { filteredUsers } = useContext(FilterUserContext);

  console.log("filteredUsers", filteredUsers);
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [setUser]);

  // const updatedUsers = users.map((user) => (user.id === filteredUsers.id ? filteredUsers : user));
  // setUsers(updatedUsers);

  return (
    <Row>
      <Col  span={17}>
        <Row
          style={{
            alignItems: "center",
            justifyContent: "flex-start",
            margin: "20px 0px",
          }}
        >
          {filteredUsers?.map((filterUser) => {
            return (
              <>
                <img
                  className={style.img}
                  src={filterUser.profilePicture}
                  alt=""
                />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div className={style.userInfo}>
                    <h3
                      style={{
                        display: "flex",
                      }}
                    >
                      {filterUser.fullName}{" "}
                      {!filterUser.isPublic ? (
                        <div className={style.lockIcon}>🔒</div>
                      ) : null}
                    </h3>
                  </div>

                  <Card bordered={false} style={{ width: 300 }}>
                    <p>Username: {filterUser.username}</p>
                    <p>Email: {filterUser.email}</p>
                    <p>Bio: {filterUser.bio}</p>
                    <div
                      style={{
                        margin: "10px 0px",
                      }}
                    >
                      <span
                        style={{
                          marginRight: "10px",
                        }}
                      >
                        <strong>
                          Followers: {filterUser.followers.length}
                        </strong>
                      </span>
                      <span>
                        <strong>
                          Following: {filterUser.followings.length}
                        </strong>
                      </span>
                    </div>
                  </Card>
                </div>
              </>
            );
          })}
        </Row>
      </Col>
    </Row>
  );
};

export default SearchUser;
