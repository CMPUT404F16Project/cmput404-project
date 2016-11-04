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

            return (
                <div>
                    <ListGroup className="post-group">
                        {this.props.posts.map((post, index) => {
                            if (index >= start_offset && start_count < per_page) {
                                start_count++;
                                return (<PostListElement key={post.id} id={post.id} preview={true} canEdit={this.props.canEdit}/>);
                            }
                        })}
                    </ListGroup>
                    <Pagination className="users-pagination pull-right" bsSize="medium" maxButtons={10} first last next prev boundaryLinks items={pages} activePage={current_page}/>
                </div>
            );
        } else if (!this.props.resolved) {
            // show the loading state
            return (<ProgressBar active now={100}/>);
        } else {
            return (
                <div className="no-posts">
                    <div className="warning-text">
                        You currently do not have any posts available to read. <br/>
                        Click <a href="/addpost">Add Post</a> to make a new post!
                    </div>
                </div>
            );
        }
    }
}

// export the connected class
function mapStateToProps(state) {
    return {
        posts: state.posts.list || [],
        page: Number(state.routing.locationBeforeTransitions.query.page) || 1,
        resolved: state.posts.resolved
    };
}
export default connect(mapStateToProps)(PostList);
