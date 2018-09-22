import React, {Component} from 'react';
import {render} from 'react-dom';
import {withQuery} from 'meteor/cultofcoders:grapher-react';
import {tasksQuery} from "../imports/queries";

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

const TasksListWrapper = withQuery(() => {
    return tasksQuery.clone({
        filters: {
            priority: 1,
        },
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
                    <TasksListWrapper />
                </div>
            </div>
        );
    }
}

Meteor.startup(() => {
    render(<App />, document.getElementById('render-target'));
});