import React from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import {ProgressBar, List, Pagination, ListGroup} from 'react-bootstrap';

import PostListElement from './PostListElement.jsx';

export class PostList extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            posts: []
        }

        // posts can be retrieve by either author/{AUTHOR_ID}/posts or posts
        this.props.dispatch({type: 'postsGetPosts', method: this.props.method, authorId: this.props.authorId});
        this.changePage = this.changePage.bind(this);
    }

    render()
    {
        // pagination
        const per_page = 10;
        const pages = Math.ceil(this.props.posts.length / per_page);
        const current_page = this.props.page;
        const start_offset = (current_page - 1) * per_page;
        let start_count = 0;

        // render
        if (this.props.posts.length) {
            // show the list of users
            return (
                <div>
                    <ListGroup>
                        {this.props.posts.map((post, index) => {
                            if (index >= start_offset && start_count < per_page) {
                                start_count++;
                                return (<PostListElement key={post.id} id={post.id} view="preview"/>);
                            }
                        })}
                    </ListGroup>
                    <Pagination className="users-pagination pull-right" bsSize="medium" maxButtons={10} first last next prev boundaryLinks items={pages} activePage={current_page} onSelect={this.changePage}/>
                </div>
            );
        } else {
            // show the loading state
            return (<ProgressBar active now={100}/>);
        }
    }

    changePage(page)
    {
        this.props.dispatch(push('/page=' + page));
    }
}

// export the connected class
function mapStateToProps(state) {
    console.log("mapStateToProps -- posts");
    console.dir(state);

    return {
        posts: state.posts.list || [],
        page: Number(state.routing.locationBeforeTransitions.query.page) || 1
    };
}
export default connect(mapStateToProps)(PostList);
