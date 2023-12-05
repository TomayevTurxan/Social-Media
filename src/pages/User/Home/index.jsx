import { Card, Col } from "antd";
import { useContext } from "react";
import { SearchContext } from "../../../services/context/Search";

const Home = () => {
  const {search,setSearch} = useContext(SearchContext)
  return (
    <Col span={6}>
      <Card
        title="Users"
        extra={<a href="#">More</a>}
        style={{ width: 300 }}
      >
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
      </Card>
    </Col>
  );
};

export default Home;
