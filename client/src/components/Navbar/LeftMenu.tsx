import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

function LeftMenu(props: any) {
  return (
    <Menu mode={props.mode}>
    <Menu.Item key="mail">
      <Link to="/">Home</Link>
    </Menu.Item>
    <SubMenu title={<span>Blogs</span>}>
      <MenuItemGroup title="Post">
        <Menu.Item key="setting:1">
          <Link to="/createPost">
            Create Post
          </Link>
        </Menu.Item>
        <Menu.Item key="setting:2">
          <Link to="/post">
            Post List
          </Link>
        </Menu.Item>
      </MenuItemGroup>
      <MenuItemGroup title="Item 2">
        <Menu.Item key="setting:3">Option 3</Menu.Item>
        <Menu.Item key="setting:4">Option 4</Menu.Item>
      </MenuItemGroup>
    </SubMenu>
  </Menu>
  )
}

export default LeftMenu;