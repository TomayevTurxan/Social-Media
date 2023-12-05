import { Button, Col, Layout, Row } from "antd";
import style from "./index.module.scss";
import { useContext } from "react";
import { UserContextItem } from "../../../services/context/UserContext";
import { Link, useNavigate } from "react-router-dom";
const UserNavbar = () => {
  let { user, setUser } = useContext(UserContextItem);
  const navigate = useNavigate();

  const Logout = () => {
    navigate("/Login");
    setUser(null);
    localStorage.setItem("user", JSON.stringify(user));
  };

  return (
    <Row
      style={{
        backgroundColor: "#d55845",
      }}
    >
      <div className="container">
        <Row className="navbar">
          <Col span={21}>
            <img
              style={{
                width: "50px",
              }}
              src={user.profilePicture}
              alt=""
            />
          </Col>
          <Col span={3}>
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
            <Button onClick={Logout} type="primary" danger>
              Log Out
            </Button>
          </Col>
        </Row>
      </div>
    </Row>
  );
};

export default UserNavbar;
