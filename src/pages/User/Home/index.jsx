import { Card, Col, Input, Row } from "antd";
import { useContext } from "react";
import { SearchContext } from "../../../services/context/Search";
import { InfoCircleOutlined, UserOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import { UserContextItem } from "../../../services/context/UserContext";
import style from "./index.module.scss";
import { Button } from "@mui/material";
import Post from "./Post";

const Home = () => {
  const { search, setSearch } = useContext(SearchContext);
  return (
    <Row>
      <Col span={7}></Col>
      <Col span={10}>
        <Post/>
      </Col>
      <Col span={7}></Col>
    </Row>
  );
};

export default Home;
