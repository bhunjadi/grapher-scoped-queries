import {Tasks, TasksScoped} from "./collections";

export const tasksQuery = Tasks.createQuery('getTasks', {
    // $filter({filters, options, params}) {
    //     // here we prevent default filtering on the client (params.filters), using only server-side filtering
    // },
    name: 1,
    priority: 1,
}, {
    scoped: false,
});

export const tasksScopedQuery = TasksScoped.createQuery('getTasksScoped', {
    $filter() {

    },
    name: 1,
    priority: 1,
}, {
    // this is the default
    scoped: true,
});


if (Meteor.isServer) {
    const exposeConfig = {
        embody: {
            // This will deepExtend your body
            $filter({filters, params}) {
                filters.priority = params.priority;
            }
        }
    };

    tasksQuery.expose(exposeConfig);
    tasksScopedQuery.expose(exposeConfig);
}

