import {Mongo} from 'meteor/mongo';

export const Tasks = new Mongo.Collection('tasks');
export const TasksScoped = new Mongo.Collection('tasks_scoped');
