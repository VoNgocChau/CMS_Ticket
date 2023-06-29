import { Header } from "antd/es/layout/layout";
import "./header.css";
import { Input, Avatar, Row, Col } from "antd";
import { icon_mail } from "../../assets/icon_mail";
import { icon_bell } from "../../assets/icon_bell";
import { icon_home } from "../../assets/icon_home";
import { BellOutlined, MailOutlined } from "@ant-design/icons";

const HeaderComponents = () => {
  return (
    <Header className="header">
      <Row justify={"space-between"} align={'middle'}>
        <Col style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start'}}>
          <Input.Search placeholder="Search" style={{ width: "200px" }} />
        </Col>
        <Col>
          {/* <div dangerouslySetInnerHTML={{ __html: icon_mail }}></div>
            <div dangerouslySetInnerHTML={{ __html: icon_bell }}></div> */}
          <div>
            <MailOutlined className="size__icon" />
            <BellOutlined className="size__icon" />
            <Avatar src="https://th.bing.com/th/id/OIP.52i24YJZZ9fQ-6nJzli-YgHaDW?pid=ImgDet&rs=1" size={45} className="avatar__style"/>
          </div>
        </Col>
      </Row>
    </Header>
  );
};

export default HeaderComponents;
