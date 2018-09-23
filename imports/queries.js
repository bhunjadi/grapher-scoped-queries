import {Tasks, TasksScoped, Users} from "./collections";

Users.addLinks({
    friends: {
        collection: Users,
        field: 'friendIds',
        type: 'many'
    },
});

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
    scoped: true,
});

export const usersQuery = Users.createQuery('getUsers', {
    name: 1,
    friends: {
        name: 1,
    },
}, {
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

    usersQuery.expose({
        embody: {
            $filter({filters, params}) {
                filters.name = params.name;
            }
        }
    })
}
