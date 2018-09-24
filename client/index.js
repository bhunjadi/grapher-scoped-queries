import React, {Component} from 'react';
import {render} from 'react-dom';
import {withQuery} from 'meteor/cultofcoders:grapher-react';
import {tasksQuery, tasksScopedQuery, usersQuery} from '../imports/queries';
import {TasksScoped, Users} from '../imports/collections';

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

const LocalCollectionDocs = props => {
    const {collection} = props;
    const docs = Object.values(collection._collection._docs._map);
    return (
        <div>
            <pre>
            {JSON.stringify(docs, null, 2)}
            </pre>
        </div>
    );
};

const UsersList = props => {
    const {isLoading, data: users} = props;
    if (isLoading) {
        return null;
    }

    return (
        <div>
            <ul>
                {users.map(user => <li
                    key={user._id}>{`${user.name} - friends ${user.friends.map(({name}) => name).join(', ')}`}</li>)}
            </ul>

            <p>Local Users collection raw data</p>
            <LocalCollectionDocs collection={Users}/>
        </div>
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
                <h2>
                    Available Queries
                </h2>
                <div>
                    <ul>
                        <li>
                            tasksQuery - not scoped, fetches tasks by priority
                        </li>
                        <li>
                            tasksScopedQuery - scoped, fetches tasks by priority
                        </li>
                        <li>
                            usersQuery - scoped, fetches users by name
                        </li>
                    </ul>
                </div>

                <h2>Case 1: interquery overlap</h2>
                <h3>Without scope - tasksQuery</h3>
                <div>
                    <p>
                        Using <b>tasksQuery</b> and filtering by priority=1.
                    </p>
                    <TasksListWrapper priority={1}/>
                </div>

                <div>
                    <p>
                        Using <b>tasksQuery</b> and filtering by priority=2.
                    </p>
                    <TasksListWrapper priority={2}/>
                </div>

                <p>"Normal" query that does not do any client side filtering does not work as expected. All task
                    documents are merged because datasets are merged on the client side.</p>

                <h3>Scoped - tasksScopedQuery</h3>
                <div>
                    <p>
                        Using <b>tasksScopedQuery</b> and filtering by priority={`{$gte: 2}`}.
                    </p>
                    <TasksListScopedWrapper priority={{$gte: 2}}/>
                </div>

                <div>
                    <p>
                        Using <b>tasksScopedQuery</b> and filtering by priority={`{$lte: 2}`}.
                    </p>
                    <TasksListScopedWrapper priority={{$lte: 2}}/>
                </div>

                <p>Scoped query works as expected because its documents are filtered by subscriptionId and since this is
                    unique for each subscription.</p>

                <h2>Case 2: intraquery overlap</h2>
                <h3>Scoped, with linked collection the same as starting collection (users)</h3>

                <p>In this example, users collection is used. Each user can have friends (stored in friendIds) and there
                    is a <strong>friends</strong> link added to the Users collection</p>

                <p>Only User 4 is fetched by name, and this users is set to have User 1, 2 and 3 for friends</p>

                <div>
                    <UsersListWrapper name="User 4"/>
                </div>
            </div>
        );
    }
}

Meteor.startup(() => {
    render(<App/>, document.getElementById('render-target'));
});
