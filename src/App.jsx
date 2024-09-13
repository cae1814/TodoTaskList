import { TodoList } from './ComponentScreen/TodoList';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

export const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<TodoList/>}  />
        </Routes>
      </BrowserRouter>
    </>
  )
}

