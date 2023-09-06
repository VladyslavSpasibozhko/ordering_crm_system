import { Route, Routes } from 'react-router-dom';

export function Worker() {
  return (
    <Routes>
      <Route path="/1" element={<div>HELLO</div>} />
      <Route path="/2" element={<div>HELLO</div>} />
    </Routes>
  );
}
