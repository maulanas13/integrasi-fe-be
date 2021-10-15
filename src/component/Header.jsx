import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { API_URL } from "../Helpers/ApiUrl";
const Header = (props) => {
  const { Auth } = useSelector((state) => {
    return {
      Auth: state.AuthReducer,
    };
  });
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const onKirimVerified = async () => {
    try {
      // buat kriim email verified ulang
      await axios.get(`${API_URL}/auth/send/verified/${Auth.id}`);
      alert("berhasil kirim email verifikasi");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">reactstrap</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="/components/">Components</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://github.com/reactstrap/reactstrap">
                GitHub
              </NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Options
              </DropdownToggle>
              <DropdownMenu right>
                {Auth.isLogin ? (
                  Auth.isVerified ? (
                    <DropdownItem>sudah verified</DropdownItem>
                  ) : (
                    <DropdownItem onClick={onKirimVerified}>
                      belum verified
                    </DropdownItem>
                  )
                ) : null}
                <DropdownItem>Option 2</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Reset</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          <NavbarText>{Auth.username || "belum login"}</NavbarText>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Header;