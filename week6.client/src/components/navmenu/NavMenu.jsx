import { Component, React } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Navbar, Nav, NavItem, Collapse, NavbarToggler } from 'reactstrap';
import './NavMenu.css';

export class NavMenu extends Component {
    static displayName = NavMenu.name;

    constructor(props) {
        super(props);

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
            collapsed: true
        };
    }

    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }

    render() {
        return (
                <Navbar className="navbar-expand-sm navbar-light bg-dark" expand="md" sticky="top">
                    <NavbarToggler onClick={this.toggleNavbar} />
                    <Collapse isOpen={!this.state.collapsed} navbar>
                        <NavItem>
                            <Link to="/" className="title"> Company Website</Link>
                        </NavItem>
                        <Nav className="ms-auto" navbar>
                            <NavItem>
                                <NavLink className="nav-link-custom"  to="/stores">Stores</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link-custom"  to="/sales">Sales</NavLink>  {/*NavLink automatically highlights the link when hovered */}
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link-custom"  to="/customers">Customers</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link-custom" to="/products">Products</NavLink>
                            </NavItem>
                    
                        </Nav>
                    </Collapse>
                </Navbar>
        );
    }
}
