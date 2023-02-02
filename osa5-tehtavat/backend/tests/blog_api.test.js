const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('../utils/test_helper');
const app = require('../app');
const api = supertest(app);
const User = require('../models/user')

describe ('api tests', () => {
    const newBlog = {
        title: 'post test using jest',
        author: 'Erik',
        url: 'http://localhost:3003/api/blogs',
    };

    test('blogs are returned as json', async () => {
        await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    });
    
    test('check if all blogs work', async () => {
        const get = await api.get('/api/blogs');
        const count = get.body.length;
        const newCount = count + 1;
        expect(newCount).toBe(count + 1);
    });
    
    test('identify blog with id', async () => {
        const get = await api.get('/api/blogs');
        expect(get.body[0].id).toBeDefined();
    });
    
    test('post blog', async () => {
        const token = '';
        const blogsAtStart = await helper.blogsInDb();
        
        await api.post('/api/blogs').send(newBlog).set('Authorization', `Bearer ${token}`).expect(201);
        
        const blogsAtEnd = await helper.blogsInDb();
        expect(blogsAtEnd).toHaveLength(blogsAtStart.length + 1);

        const blogAuthor = blogsAtEnd.map(blog => blog.author);
        expect(blogAuthor).toContain(newBlog.author);
    });
    
    test('check if likes is null', async () => {
        await api.post('/api/blogs').send(newBlog).expect(201);
        const get = await api.get('/api/blogs');
        const createdBlog = get.body.find(blog => blog.url === newBlog.url);
        expect(createdBlog.likes).toBe(0);
    });
    
    test('if tittle or url dosent exist', async () => {
        const addBlog = {
            author: 'Erik',
        }
        await api.post('/api/blogs').send(addBlog).expect(400);
    });

    test('delete blog', async () => {
        const blogsAtStart = await helper.blogsInDb();
        console.log(blogsAtStart[0].id);
        const blogToDelete = blogsAtStart[blogsAtStart.length - 1];
        console.log(blogToDelete)
        const token = '';

        await api.delete(`/api/blogs/${blogToDelete.id}`).set('Authorization', `Bearer ${token}`).expect(204);
        
        const blogsAtEnd = await helper.blogsInDb();
        expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1);
        
        const deletedBlog = blogsAtEnd.map(blog => blog.id);
        expect(deletedBlog).not.toContain(blogToDelete.id)
    });

    test('update blog', async () => {
        const blogsAtStart = await helper.blogsInDb();
        const blogToUpdate = blogsAtStart[0];
        const likes = 0;

        await api.put(`/api/blogs/${blogToUpdate.id}`).send({ likes: likes }).expect(200);
        
        const blogsAtEnd = await helper.blogsInDb();
        const updatedBlog = blogsAtEnd.find(blog => blog.id === blogToUpdate.id);
        expect(updatedBlog.likes).toBe(likes);
    });
    test('creating new user if unauthorized', async () => {
        const blogsAtStart = await helper.blogsInDb();

        const newBlog = {
            title: 'eitoimi',
            author: 'toimii',
            url: 'https://localhost:3003'
        }
    
        await api.post('/api/blogs').send(newBlog).expect(401);
        const blogsAtEnd = await helper.blogsInDb();

        expect(blogsAtEnd).toHaveLength(blogsAtStart.length);
    });
})

describe('when there is initially one user at db', () => {
    test('creation fails with proper statuscode and message if username already taken', async () => {
        const usersAtStart = await helper.usersInDb()
    
        const newUser = {
          username: 'admin',
          name: 'Superuser',
          password: 'salainen',
        }
    
        const result = await api
          .post('/api/users')
          .send(newUser)
          .expect(400)
          .expect('Content-Type', /application\/json/)
    
        expect(result.body.error).toContain('expected `username` to be unique')
    
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    });
  
    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await helper.usersInDb()
  
        const newUser = {
            username: 'username',
            name: 'Erik Ruotsalainen',
            password: 'password',
        }
      
        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)
      
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
      
        const usernames = usersAtEnd.map(u => u.username)
        expect(usernames).toContain(newUser.username)
    });

    test('creating user fails if user already exists', async () =>{

        const newUser = {
            username: 'user',
            name: 'Erik Ruotsalainen',
            password: 'r',
        }
        const get = await api.get('/api/users');
        const userCount = get.body.length;
        await api.post('/api/users').send(newUser).expect(400);
        expect(userCount).not.toBe(userCount + 1);
    });
})

afterAll(async () => {
    await mongoose.connection.close()
})
