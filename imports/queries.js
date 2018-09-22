import {Tasks} from "./collections";

export const tasksQuery = Tasks.createQuery('getTasks', {
    // $filter({filters, options, params}) {
    //     console.log(filters, options, params);
    // },
    name: 1,
    priority: 1,
});

if (Meteor.isServer) {
    tasksQuery.expose();
}