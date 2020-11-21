import { RequestHandler } from 'express';
import {Todo } from '../models/todo'

const TODOS: Todo[] = []

const createTodo: RequestHandler = ( req, res, next) => {
    const text = (req.body as {text: string}).text
    const newTodos = new Todo(Math.random().toString(),text)
    TODOS.push(newTodos)
    res.status(201).json({message: 'create the todo', createdTodo: newTodos})
}

const getTodos: RequestHandler = ( req, res, next) => {
    res.json({todos: TODOS})
} 

const updateTodo: RequestHandler< {id: string}> = ( req, res, next) => {
    const todoId = req.params.id
    const updateText = (req.body as {text:string}).text
    const todoIndex = TODOS.findIndex(todo => todo.id === todoId)
    if (todoIndex < 0) { throw new Error('Could not find todo') } 
    TODOS[todoIndex] = new Todo(TODOS[todoIndex].id, updateText) 
    res.json({message:'updated!', updateTodo: TODOS[todoIndex]})
} 

const deleteTodos: RequestHandler<{id: string}> = (req, res, next) => {
    const todoId = req.params.id
    const todoIndex = TODOS.findIndex(todo => todo.id === todoId)
    if (todoIndex < 0) { throw new Error('Could not find todo') }
    TODOS.splice(todoIndex, 1)
    res.json({message: 'Todo is deleted'})
}

export { createTodo, getTodos, updateTodo, deleteTodos}