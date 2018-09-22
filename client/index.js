import React, {Component} from 'react';
import {render} from 'react-dom';
import {withQuery} from 'meteor/cultofcoders:grapher-react';
import {tasksQuery, tasksScopedQuery} from "../imports/queries";

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
            </div>
        );
    }
}

Meteor.startup(() => {
    render(<App />, document.getElementById('render-target'));
});