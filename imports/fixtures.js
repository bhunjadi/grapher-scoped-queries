import {Tasks, TasksScoped, Users} from "./collections";

Tasks.remove({});
TasksScoped.remove({});
Users.remove({});

_.times(5, n => {
    const doc = {
        name: `Task ${n + 1}`,
        priority: n < 2 ? 1 : n < 4 ? 2 : 3,
    };
    Tasks.insert(doc);
    TasksScoped.insert(doc);
});

const friends = [];
_.times(4, n => {
    const doc = {
        name: `User ${n + 1}`,
        friendIds: friends,
    };

    const id = Users.insert(doc);
    friends.push(id);
});
