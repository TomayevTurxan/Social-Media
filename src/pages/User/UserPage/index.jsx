import style from "./index.module.scss";
import { Button, Card, Col, Row } from "antd";
import { useContext, useEffect } from "react";
import { UserContextItem } from "../../../services/context/UserContext";
import { Avatar, Box, Input, Modal } from "@mui/material";
import { useState } from "react";
import { updateUseryByIDPut } from "../../../services/api/user";
import Swal from "sweetalert2";
import { UserContext } from "../../../services/context/UsersContext";
const UserPage = () => {
  let { user, setUser } = useContext(UserContextItem);
  let { users } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [editedUser, setEditedUser] = useState({
    username: user.username,
    email: user.email,
    fullName: user.fullName,
    bio: user.bio,
    profilePicture: user.profilePicture,
    followers: user.followers,
    requests: user.requests,
    posts: user.posts,
    stories: user.posts,
    isVerified: user.isVerified,
    isAdmin: user.isAdmin,
    following: user.followings,
    id: user.id,
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [setUser]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //followers modal
  const [open2, setOpen2] = useState(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);

  //followings modal
  const [open3, setOpen3] = useState(false);
  const handleOpen3 = () => setOpen3(true);
  const handleClose3 = () => setOpen3(false);

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

  const handleSaveChanges = async () => {
    try {
      const res = await updateUseryByIDPut(user.id, editedUser);
      console.log("Success", res);
      localStorage.setItem("user", JSON.stringify(editedUser));
      setUser(editedUser);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your profile has been edited",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error("Error updating user:", error);
    }

    handleClose();
  };

  const handleAccept = async (requestSender) => {
    const requestIndex = user.requests.findIndex(
      (request) => request.userID === requestSender.id
    );
  
    const updatedRequests = [
      ...user.requests.slice(0, requestIndex),
      ...user.requests.slice(requestIndex + 1),
    ];
  
    setUser((prevUser) => ({
      ...prevUser,
      requests: updatedRequests,
      followers: [
        ...prevUser.followers,
        { id: Date.now(), userID: requestSender.id },
      ],
    }));
  
    try {
      const response = await fetch(
        `https://656dfda1bcc5618d3c245df9.mockapi.io/Users/${user.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...user,
            requests: updatedRequests,
            followers: [
              ...user.followers,
              { id: Date.now().toString(), userID: requestSender.id },
            ],
          }),
        }
      );
  
      if (response.ok) {
        const data = await response.json();
        console.log("Success", data);
  
        localStorage.setItem(
          "user",
          JSON.stringify({
            ...user,
            requests: updatedRequests,
            followers: [
              ...user.followers,
              { id: Date.now().toString(), userID: requestSender.id },
            ],
          })
        );
  
        setUser({
          ...user,
          requests: updatedRequests,
          followers: [
            ...user.followers,
            { id: Date.now().toString(), userID: requestSender.id },
          ],
        });
  
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Already Ulvi is your friend",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        console.error("Error updating user:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }



    const updatedFollowings = [
      ...requestSender.followings,
      { id: Date.now().toString(), userID: user.id },
    ];
  
    const updatedSender = { ...requestSender, followings: updatedFollowings };
    const updatedCurrentUser = {
      ...user,
      requests: updatedRequests,
      followers: [...user.followers, { id: Date.now(), userID: requestSender.id }],
    };
  
    try {
      const responseSender = await updateUseryByIDPut(requestSender.id, updatedSender);
      if (responseSender.ok) {
        console.log("erer", await responseSender.json());
      } else {
        console.error("reer:", responseSender.statusText);
      }
  
      const responseCurrentUser = await updateUseryByIDPut(user.id, updatedCurrentUser);
      if (responseCurrentUser.ok) {
        console.log("err", await responseCurrentUser.json());
      } else {
        console.error("err", responseCurrentUser.statusText);
      }
  
      setUser(updatedCurrentUser);
  
    } catch (error) {
      console.error("reererer", error);
    }
  };
  

  //reject elemek
  const handleReject = (requestSender) => {
    const requestIndex = user.requests.findIndex(
      (request) => request.userID === requestSender.id
    );
    console.log("requestSenderID", requestSender.id);
    const updatedRequests = [
      ...user.requests.slice(0, requestIndex),
      ...user.requests.slice(requestIndex + 1),
    ];

    setUser((prevUser) => ({ ...prevUser, requests: updatedRequests }));

    fetch(`https://656dfda1bcc5618d3c245df9.mockapi.io/Users/${user.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...user, requests: updatedRequests }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success", data);
        localStorage.setItem(
          "user",
          JSON.stringify({ ...user, requests: updatedRequests })
        );
        setUser({ ...user, requests: updatedRequests });
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: " Ulvi is rejected",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        console.error("Error updating user:", error);
      });
  };

  const RemoveFollower = async (followerID) => {
    try {
      const updatedFollowers = user.followers.filter(
        (follower) => follower.userID !== followerID
      );
  
      setUser((prevUser) => ({ ...prevUser, followers: updatedFollowers }));
  
      const response = await fetch(
        `https://656dfda1bcc5618d3c245df9.mockapi.io/Users/${user.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...user,
            followers: updatedFollowers,
          }),
        }
      );
  
      console.log("Response status:", response.status);
  
      if (response.ok) {
        const data = await response.json();
        console.log("Success", data);
  
        const follower = users.find((user) => user.id === followerID);
        const updatedFollowings = follower.followings.filter(
          (following) => following.userID !== user.id
        );
  
        setUser((prevUser) => ({
          ...prevUser,
          followings: updatedFollowings,
        }));
  
        await fetch(
          `https://656dfda1bcc5618d3c245df9.mockapi.io/Users/${followerID}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ...follower,
              followings: updatedFollowings,
            }),
          }
        );
  
  
        handleClose2();
  
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Follower removed successfully",
          showConfirmButton: false,
          timer: 1500,
        });
  
      } else {
        console.error("Error removing follower:", response.statusText);
      }
    } catch (error) {
      console.error("Error removing follower:", error);
    }
  };
  
  
  
  
  
  
  
  return (
    <>
      <Row
        style={{
          alignItems: "center",
          justifyContent: "center",
          margin: "20px 0px",
        }}
      >
        <Col xs={24} sm={24} md={12} lg={12}>
          <Card
            title="Takip istekleri"
            extra={<a href="#">More</a>}
            style={{
              width: "50%",
              margin: "10px auto"
            }}
          >
            {user.requests.map((requestUserId) => {
              console.log("user", user.requests);
              console.log("requestUserId", requestUserId.userID);
              const requestSender = users.find(
                (user) => user.id === requestUserId.userID
              );
              console.log("requestSender", requestSender);
              return (
                <div
                  key={requestUserId.userID}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <p>{requestSender?.fullName}</p>

                  <Button onClick={() => handleAccept(requestSender)}>
                    Accept
                  </Button>
                  <Button onClick={() => handleReject(requestSender)}>
                    Reject
                  </Button>
                </div>
              );
            })}
          </Card>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Card
              bordered={false}
              style={{
                width: "50%",
              }}
            >
              <img
                style={{
                  width: "100%",
                }}
                className={style.img}
                src={user.profilePicture}
                alt=""
              />
              <div className={style.userInfo}>
                <h3>{user.fullName}</h3>
                <Button onClick={handleOpen}>Edit</Button>
              </div>
              <p>Username: {user.username}</p>
              <p>Email: {user.email}</p>
              <p>Bio: {user.bio}</p>
              <div
                style={{
                  margin: "10px 0px",
                }}
              >
                <span
                  style={{
                    marginRight: "10px",
                  }}
                  onClick={handleOpen2}
                >
                  <strong>Followers: {user.followers.length}</strong>
                </span>
                <span onClick={handleOpen3}>
                  <strong>Following: {user.followings.length}</strong>
                </span>
              </div>
            </Card>
          </div>
        </Col>
      </Row>

      {/* followersModal */}
      <Modal
        open={open2}
        onClose={handleClose2}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style2}>
          {user.followers?.map((item, idx) => {
            console.log("itemId", item.userID);
            let followerUser = users.find((user) => user.id == item.userID);
            console.log("followerUser", followerUser);
            return (
              <>
                <ul>
                  <li
                    key={idx}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      padding: "5px 10px",
                      justifyContent: "space-between",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        gap: "10px",
                        alignItems: "center",
                      }}
                    >
                      <Avatar src={followerUser?.profilePicture} />
                      <span>{followerUser?.username}</span>
                    </div>
                    <Button onClick={() => RemoveFollower(item.userID)}>
                      Remove
                    </Button>
                  </li>
                </ul>
              </>
            );
          })}
        </Box>
      </Modal>

      {/* followingsModal */}
      <Modal
        open={open3}
        onClose={handleClose3}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style2}>
          {user.followings?.map((item, idx) => {
            console.log("itemId", item.userID);
            let followingUser = users.find((user) => user.id == item.userID);
            console.log("followerUser", followingUser);
            return (
              <>
                <ul>
                  <li
                    key={idx}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      padding: "5px 10px",
                      justifyContent: "space-between",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        gap: "10px",
                        alignItems: "center",
                      }}
                    >
                      <Avatar src={followingUser?.profilePicture} />
                      <span>{followingUser?.username}</span>
                    </div>
                    <Button>Remove</Button>
                  </li>
                </ul>
              </>
            );
          })}
        </Box>
      </Modal>
      {/* Edit Modal       */}
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
                setEditedUser({ ...editedUser, username: e.target.value });
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
                setEditedUser({ ...editedUser, fullName: e.target.value });
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
                setEditedUser({ ...editedUser, email: e.target.value });
              }}
              id="email"
              type="text"
              value={editedUser.email}
            />
          </Col>

          <Col span={24}>
            <label htmlFor="bio">Bio:</label>
            <Input
              onChange={(e) => {
                setEditedUser({ ...editedUser, bio: e.target.value });
              }}
              id="bio"
              type="text"
              value={editedUser.bio}
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
