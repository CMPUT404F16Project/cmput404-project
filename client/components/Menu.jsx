import React from 'react';
import {connect} from 'react-redux';
import {Nav, NavItem, Glyphicon} from 'react-bootstrap';
import {IndexLinkContainer, LinkContainer} from 'react-router-bootstrap';
import Utils from '../utils/utils.js'

export class Menu extends React.Component
{
    constructor(props)
    {
        super(props);
        this.handleSelect = this.handleSelect.bind(this);
    }

    render()
    {
        const author = Utils.getAuthor(),
            isActive = Utils.getAuthor().is_active,
            authorName = author && author.displayName ? author.displayName : "my friend";

        if (Utils.getToken() && isActive) {
            return (
                <Nav bsStyle="pills" onSelect={this.handleSelect}>
                    <NavItem className="nav-item">
                        Hello, {authorName}!
                    </NavItem>
                    <NavItem className="nav-item float-right" eventKey={"logOut"}>
                        Log Out
                        <Glyphicon glyph="log-out"/>
                    </NavItem>
                    <LinkContainer to="/profile">
                        <NavItem className="nav-item float-right">
                            Profile
                            <Glyphicon glyph="user"/>
                        </NavItem>
                    </LinkContainer>
                    <LinkContainer to="/myimages">
                        <NavItem className="nav-item float-right">
                            My Images
                            <Glyphicon glyph="picture"/>
                        </NavItem>
                    </LinkContainer>
                    <LinkContainer to="/myposts">
                        <NavItem className="nav-item float-right">
                            My posts
                            <Glyphicon glyph="list"/>
                        </NavItem>
                    </LinkContainer>
                    <LinkContainer to="/friends?view=myfriends">
                        <NavItem className="nav-item float-right">
                            Friends
                            <Glyphicon glyph="globe"/>
                        </NavItem>
                    </LinkContainer>
                    <LinkContainer to="/addpost">
                        <NavItem className="nav-item float-right">
                            Add Post
                            <Glyphicon glyph="plus-sign"/>
                        </NavItem>
                    </LinkContainer>
                    <LinkContainer to="/dashboard">
                        <NavItem className="nav-item float-right">
                            Dashboard
                            <Glyphicon glyph="dashboard"/>
                        </NavItem>
                    </LinkContainer>
                </Nav>
            );
        } else if (Utils.getToken() && !isActive) {
            return (
                <Nav bsStyle="pills" onSelect={this.handleSelect}>
                    <NavItem className="nav-item">
                        Hello, {authorName}!
                    </NavItem>
                    <NavItem className="nav-item float-right" eventKey={"logOut"}>
                        Log Out
                        <Glyphicon glyph="log-out"/>
                    </NavItem>
                </Nav>
            );
        } else {
            return (
                <Nav bsStyle="pills" onSelect={this.handleSelect}>
                    <IndexLinkContainer to="/">
                        <NavItem className="nav-item">
                            Hello World Blog
                        </NavItem>
                    </IndexLinkContainer>
                </Nav>
            );
        }
    }

    handleSelect(key) {
        switch (key) {
            case "logOut":
                this.props.dispatch({type: "authLogout"});
                break;
            default:

        }
    }
}

function mapStateToProps(state) {
    return {loggedIn: state.loggedIn};
}
export default connect(mapStateToProps)(Menu);
