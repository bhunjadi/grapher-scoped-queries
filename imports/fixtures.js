import {Tasks, TasksScoped} from "./collections";

Tasks.remove({});
TasksScoped.remove({});

_.times(3, n => {
    const doc = {
        name: `Task ${n + 1}`,
        priority: n < 2 ? 1 : 2,
    };
    Tasks.insert(doc);
    TasksScoped.insert(doc);
});
