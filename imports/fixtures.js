import {Tasks} from "./collections";

Tasks.remove({});

_.times(3, n => {
    console.log('n ', n);

    Tasks.insert({
        name: `Task ${n + 1}`,
        priority: n < 2 ? 1 : 2,
    });
});
