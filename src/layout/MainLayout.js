import React from "react";
import { Pane, Menu, Heading } from "evergreen-ui";
import { Outlet } from "react-router-dom";
import container from "./containers/MainLayoutContainer";

const DefaultLayout = ({
  auth,
  navigation,
  onNavigationPressed,
  currentNav,
}) => {
  return (
    <Pane display="flex" flex={1} height="100vh">
      <Pane display="flex" flex={1} flexDirection="column">
        <Pane
          display="flex"
          alignItems="center"
          justifyContent="center"
          padding="1rem"
          flexDirection="column"
        >
          <Heading>Bike Rental</Heading>
          <Heading size={200}>{auth.email}</Heading>
        </Pane>
        <Menu>
          {navigation
            .filter((item) =>
              item.managerOnly ? (auth.role === 2 ? true : false) : true
            )
            .map((menu) => (
              <React.Fragment key={menu.name}>
                <Menu.OptionsGroup
                  selected={currentNav}
                  title={menu.name}
                  options={menu.children}
                  onChange={onNavigationPressed}
                />
                <Menu.Divider />
              </React.Fragment>
            ))}
        </Menu>
      </Pane>
      <Pane display="flex" flex={5} padding="1rem">
        <Outlet />
      </Pane>
    </Pane>
  );
};

export default container(DefaultLayout);
