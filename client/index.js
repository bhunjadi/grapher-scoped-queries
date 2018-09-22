import React, {Component} from 'react';
import {render} from 'react-dom';
import {withQuery} from 'meteor/cultofcoders:grapher-react';
import {tasksQuery, tasksScopedQuery, usersQuery} from "../imports/queries";

const TasksList = props => {
    const {isLoading, data: tasks} = props;
    if (isLoading) {
        return null;
    }

    return (
        <ul>
            {tasks.map(task => <li key={task._id}>{`${task.name} - prio ${task.priority}`}</li>)}
        </ul>
    );
};

const TasksListWrapper = withQuery(props => {
    return tasksQuery.clone({
        priority: props.priority,
    });
}, {
    reactive: true,
})(TasksList);

const TasksListScopedWrapper = withQuery(props => {
    return tasksScopedQuery.clone({
        priority: props.priority,
    });
}, {
    reactive: true,
})(TasksList);

const UsersList = props => {
    const {isLoading, data: users} = props;
    if (isLoading) {
        return null;
    }

    return (
        <ul>
            {users.map(user => <li key={user._id}>{`${user.name} - friends ${user.friends.map(({name}) => name).join(', ')}`}</li>)}
        </ul>
    );
};

const UsersListWrapper = withQuery(props => {
    return usersQuery.clone({
        name: props.name,
    });
}, {
    reactive: true,
})(UsersList);

class App extends Component {
    render() {
        return (
            <div>
                <h2>Queries without scope</h2>
                <div>
                    <TasksListWrapper priority={1} />
                </div>

                <div>
                    <TasksListWrapper priority={2} />
                </div>

                <p>"Normal" query that does not do any client side filtering does not work as expected. All task documents are merged because datasets are merged on the client side.</p>

                <h2>Queries with scope</h2>
                <div>
                    <TasksListScopedWrapper priority={1} />
                </div>

                <div>
                    <TasksListScopedWrapper priority={2} />
                </div>

                <p>Scoped query works as expected because its documents are filtered by subscriptionId and since this is unique for each subscription.</p>

                <h2>With scope, with linked collection the same as starting collection</h2>
                <div>
                    <UsersListWrapper name="User 4" />
                </div>
            </div>
        );
    }
}

Meteor.startup(() => {
    render(<App />, document.getElementById('render-target'));
});