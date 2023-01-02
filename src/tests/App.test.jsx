import React from 'react';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import App from '../App';

describe('testa o input', () => {
  it('testa se adiciona tarefa corretamente', async () => {
    render(<App />);
    const input = screen.getByPlaceholderText(/type a task/i);
    await userEvent.type(input, 'Levantar');
    await userEvent.click(screen.getByRole('button', {
      name: /add todo/i
    }));
    expect(screen.getByText(/levantar/i)).toBeInTheDocument();
    localStorage.clear();
  });
  it('testa se adiciona tarefa atráves do enter corretamente', async () => {
    render(<App />);
    const input = screen.getByPlaceholderText(/type a task/i);
    await userEvent.type(input, 'Levantar{enter}');
    expect(screen.getByText(/levantar/i)).toBeInTheDocument();
  });
});

describe('testa se é possivel editar e deletar os elementos', () => {
  it('testa se é possivel cancelar edição', async () => {
    render(<App />);
    const input = screen.getByPlaceholderText(/type a task/i);
    await userEvent.type(input, 'Levantar{enter}');
    const elementBefore = screen.getByText(/levantar/i);
    const editButtton = screen.getByRole('button', {
      name: /edit/i
    });
    expect(elementBefore).toBeInTheDocument();
    await userEvent.click(editButtton);
    const sendEdit = screen.getByRole('button', {
      name: /send edit/i
    });
    expect(sendEdit).toBeInTheDocument();
    const cancelBtn = screen.getByRole('button', {
      name: /cancel/i
    });
    await userEvent.click(cancelBtn);
    expect(sendEdit).not.toBeInTheDocument();
  });
  it('testa se é possivel editar um elemento', async () => {
    render(<App />);
    const input = screen.getByRole('textbox');
    const elementBefore = screen.getByText(/levantar/i);
    const editButtton = screen.getByRole('button', {
      name: /edit/i
    });
    expect(elementBefore).toBeInTheDocument();
    await userEvent.click(editButtton);
    await userEvent.clear(input);
    await userEvent.type(input, 'alterado{enter}');
    expect(screen.getByText(/alterado/i)).toBeInTheDocument();
    localStorage.clear();
  });
  it('testa se é possivel deletar um elemento', async () => {
    render(<App />);
    const input = screen.getByPlaceholderText(/type a task/i);
    await userEvent.type(input, 'Levantar{enter}');
    const element = screen.getByText(/levantar/i);
    const deleteBtn = screen.getByRole('button', {
      name: /delete/i
    });
    expect(element).toBeInTheDocument();
    await userEvent.click(deleteBtn);
    expect(element).not.toBeInTheDocument();
  });
});

