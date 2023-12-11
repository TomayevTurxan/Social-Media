import React, { useContext, useEffect, useState } from "react";
import { Button, Space, Table, message  } from "antd";
import { UserContext } from "../../../../services/context/UsersContext";
import { getAllUsers, updateUseryByIDPut } from "../../../../services/api/user";
const UserTable = () => {
  let { users, setUsers } = useContext(UserContext);
  const [sortedInfo, setSortedInfo] = useState({
    columnKey: null,
    order: null,
  });
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await getAllUsers();
        setUsers(res);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [setUsers]);

  const blockUserHandler = async (userId) => {
    try {
      const updatedUsers = users.map((user) =>
        user.id === userId ? { ...user, isBlocked: !user.isBlocked } : user
      );

      setUsers(updatedUsers);
      console.log("updatedUsers", updatedUsers);

      const userToUpdate = updatedUsers.find((user) => user.id === userId);
      console.log("userToUpdate", userToUpdate);
      if (userToUpdate) {
        updateUseryByIDPut(userId, userToUpdate);
        if (userToUpdate.isBlocked) {
          // alert("User has been blocked");
          message.success("User has been blocked");
        } else {
          message.error("User has been unblocked");
        }
      }
    } catch (error) {
      console.error("Error blocking user:", error);
    }
  };
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id,
      sortOrder: sortedInfo.columnKey === "id" ? sortedInfo.order : null,
    },
    {
      title: "Name",
      dataIndex: "username",
      key: "username",
      sorter: (a, b) => a.username.localeCompare(b.username),
      sortOrder: sortedInfo.columnKey === "username" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: (a, b) => a.email.localeCompare(b.email),
      sortOrder: sortedInfo.columnKey === "email" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Block",
      key: "key",
      dataIndex: "key",
      render: (text, record) => (
        <Button
          onClick={() => {
            blockUserHandler(record.id);
          }}
          type="primary"
          danger
        >
          {record.isBlocked ? "Unblocked" : "Block"}
        </Button>
      ),
    },
  ];

  const handleChange = (pagination, filters, sorter) => {
    setSortedInfo(sorter);
  };

  return (
    <>
      <Space style={{ marginBottom: 16 }} />
      <Table
        columns={columns}
        dataSource={users}
        onChange={handleChange}
        rowKey="id"
      />
    </>
  );
};

export default UserTable;
