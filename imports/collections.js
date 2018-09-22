import {Mongo} from 'meteor/mongo';

// We use separate collections just to show the same thing in isolation with scoped and normal queries.
export const Tasks = new Mongo.Collection('tasks');
export const TasksScoped = new Mongo.Collection('tasks_scoped');
export const Users = new Mongo.Collection('users');