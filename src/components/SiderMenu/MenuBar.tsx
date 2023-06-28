import { HomeOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";

import {Link} from 'react-router-dom'
import SubMenu from "antd/es/menu/SubMenu";
import {icon_home} from "../../assets/icon_home";
import './menu.css'


type MenuItem = {
    key: string;
    icon: React.ReactNode;
    label: React.ReactNode;
    path: string;
    children?: MenuItem[];
  };
  
  function getItem(
    label: React.ReactNode,
    key: string,
    icon: React.ReactNode,
    path: string,
    children?: MenuItem[]
  ): MenuItem {
    return {
      key,
      icon,
      label,
      path,
      children,
    } as MenuItem;
  }
  
  const items: MenuItem[] = [
    getItem("Trang chủ", "1", (<span dangerouslySetInnerHTML={{__html: icon_home}}/>), "/dashboard"),
    getItem("Quản lý vé", "2", <HomeOutlined />, "/manage_ticket"),
    getItem("Đối soát vé", "3", <HomeOutlined />, "/ticket_reconciliation"),
    getItem("Cài đặt", "4", <HomeOutlined />, "/setting", [
      getItem("Gói dịch vụ", "4.1", <HomeOutlined />, "/services"),
    ]),
  ];
const MenuBar = () => {
  return (
    <Sider theme="light">
          <div className="menu">
            {/* start_logo */}
            {/* <div
              dangerouslySetInnerHTML={{ __html: logoMenu }}
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "40px",
              }}
            ></div> */}
            {/* end_logo */}

            {/* start_menu */}
            <Menu
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1"]}
              mode="vertical"
              theme="light"
              style={{minHeight: '100vh'}}
            >
              {items.map((item) =>
                item.children ? (
                  <SubMenu key={item.key} icon={item.icon} title={item.label}>
                    {item.children.map((child) => (
                      <Menu.Item key={child.key}>
                        <Link to={child.path}>{child.label}</Link>
                      </Menu.Item>
                    ))}
                  </SubMenu>
                ) : (
                  <Menu.Item key={item.key} icon={item.icon}>
                    <Link to={item.path}>{item.label}</Link>
                  </Menu.Item>
                )
              )}
            </Menu>
            {/* end_menu */}
          </div>
        </Sider>
  )
}

export default MenuBar