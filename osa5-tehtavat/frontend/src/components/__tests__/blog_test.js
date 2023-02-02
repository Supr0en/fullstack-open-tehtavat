import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from '../Blog';
import CreateBlog from '../createBlog';

afterEach(() => {
    cleanup();
});

test('renders content', () => {
    const blog = {
        author: 'testi',
        title: 'test title',
    };

    render(<Blog blog={blog} />);

    const element = screen.getByText('testi');
    expect(element).toBeDefined();
});

test('renders blog title, author, likes and url after click', async () => {
    const blog = {
        author: 'John',
        title: 'Component renders',
        likes: 1,
        url: 'https://react-tests.com',
    };

    render(<Blog blog={blog} />);

    const user = userEvent.setup();
    const button = screen.getByText('View');
    await user.click(button);

    screen.getByText('Component ');
    screen.getByText('url: works.fi');
    screen.getByText('Likes: 1');
    screen.getByText('Author: John');
});

test('like button function test', async () => {
    const blog = {
        author: 'Pate',
        title: 'likes button test',
        likes: 1,
        url: 'works.fi',
    };

    const user = userEvent.setup();
    const updateBlogLikes = jest.fn();

    render(<Blog blog={blog} updateBlogLikes={updateBlogLikes} />);

    const showButton = screen.getByText('View');
    await user.click(showButton);

    const likeButton = screen.getByText('Like');
    await user.click(likeButton);
    await user.click(likeButton);

    expect(updateBlogLikes).toHaveBeenCalledTimes(2);
});

test('Testing blog form return data', async () => {
    const handleSubmit = jest.fn();

    render(<CreateBlog handleSubmit={handleSubmit} />);

    const showFormButton = screen.getByText('Create new blog');
    await userEvent.click(showFormButton);

    const titleInput = screen.getByPlaceholderText('title');
    const authorInput = screen.getByPlaceholderText('author');
    const urlInput = screen.getByPlaceholderText('url');
    const createButton = screen.getByText('Create');

    await userEvent.type(titleInput, 'Tompan blogi');
    await userEvent.type(authorInput, 'Tomppa tiukka');
    await userEvent.type(urlInput, 'tomppaBlogs.fi');
    await userEvent.click(createButton);

    expect(handleSubmit.mock.calls).toHaveLength(2);
});
