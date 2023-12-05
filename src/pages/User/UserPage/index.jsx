import { Card, Col, Row } from "antd";
import { useContext } from "react";
import { UserContextItem } from "../../../services/context/UserContext";
import style from "./index.module.scss";
const UserPage = () => {
  let { user, setUser } = useContext(UserContextItem);

  return (
    <>
      <Row>
          <img className={style.img} src={user.profilePicture} alt="" />
            <Card title={user.fullName} bordered={false} style={{ width: 300 }}>
              <p>Username: {user.username}</p>
              <p>Email: {user.email}</p>
            </Card>
      </Row>
    </>
  );
};

export default UserPage;
