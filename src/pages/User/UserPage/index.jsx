import style from "./index.module.scss";
import { Button, Card, Col, Row } from "antd";
import { useContext } from "react";
import { UserContextItem } from "../../../services/context/UserContext";
import { Box, Input, Modal, Typography } from "@mui/material";
import { useState } from "react";
const UserPage = () => {
  let { user, setUser } = useContext(UserContextItem);
  const [open, setOpen] = useState(false);
  const [editedUser, setEditedUser] = useState({
    username: user.username,
    email: user.email,
    fullName: user.fullName,
    bio: user.bio,
  });
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style2 = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const handleSaveChanges = () => {
    setUser(editedUser);
    handleClose();
  };
  return (
    <>
      <Row
        style={{
          alignItems: "center",
        }}
      >
        <img className={style.img} src={user.profilePicture} alt="" />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div className={style.userInfo}>
            <h3>{user.fullName}</h3>
            <Button onClick={handleOpen}>Edit</Button>
          </div>
          <Card bordered={false} style={{ width: 300 }}>
            <p>Username: {user.username}</p>
            <p>Email: {user.email}</p>
            <p>Bio: {user.bio}</p>
          </Card>
        </div>
      </Row>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style2}>
          <Col span={24}>
            <label htmlFor="username">Username:</label>
            <Input
              onChange={(e) => {
                setEditedUser({...editedUser,username:e.target.value});
              }}
              id="username"
              type="text"
              value={editedUser.username}
            />
          </Col>
          <Col span={24}>
            <label htmlFor="fullName">Full Name:</label>
            <Input
              onChange={(e) => {
                setEditedUser({...editedUser,fullName:e.target.value});
              }}
              id="fullName"
              type="text"
              value={editedUser.fullName}
            />
          </Col>

          <Col span={24}>
            <label htmlFor="email">Email:</label>
            <Input
              onChange={(e) => {
                setEditedUser({...editedUser,email:e.target.value});
              }}
              id="email"
              type="text"
              value={editedUser.email}
            />
          </Col>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSaveChanges}>Save Changes</Button>
        </Box>
      </Modal>
    </>
  );
};

export default UserPage;
