import {Tasks, TasksScoped} from "./collections";

export const tasksQuery = Tasks.createQuery('getTasks', {
    name: 1,
    priority: 1,
}, {
    scoped: false,
});

export const tasksScopedQuery = TasksScoped.createQuery('getTasksScoped', {
    name: 1,
    priority: 1,
}, {
    // true is the default anyway
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

