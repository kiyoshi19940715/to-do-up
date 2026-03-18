"use client";

import { useState } from "react";

type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: "Next.jsを学ぶ", completed: false },
    { id: 2, text: "Tailwind CSSを使いこなす", completed: true },
  ]);
  const [inputValue, setInputValue] = useState("");

  const addTodo = () => {
    const trimmed = inputValue.trim();
    if (!trimmed) return;
    setTodos((prev) => [
      ...prev,
      { id: Date.now(), text: trimmed, completed: false },
    ]);
    setInputValue("");
  };

  const toggleTodo = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") addTodo();
  };

  const remaining = todos.filter((t) => !t.completed).length;

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-light tracking-widest text-stone-800 mb-1">
            TODO
          </h1>
          <p className="text-sm text-stone-400">
            {remaining === 0
              ? "すべて完了しました"
              : `残り ${remaining} 件のタスク`}
          </p>
        </div>

        {/* Input area */}
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="新しいタスクを追加..."
            className="flex-1 bg-white border border-stone-200 rounded-xl px-4 py-3 text-sm text-stone-700 placeholder-stone-300 outline-none focus:border-stone-400 transition-colors shadow-sm"
          />
          <button
            onClick={addTodo}
            disabled={!inputValue.trim()}
            className="bg-stone-800 hover:bg-stone-700 disabled:bg-stone-300 text-white rounded-xl px-5 py-3 text-sm font-medium transition-colors shadow-sm cursor-pointer disabled:cursor-not-allowed"
          >
            追加
          </button>
        </div>

        {/* Todo list */}
        <div className="space-y-2">
          {todos.length === 0 && (
            <div className="text-center py-12 text-stone-300 text-sm">
              タスクがありません
            </div>
          )}
          {todos.map((todo) => (
            <div
              key={todo.id}
              className={`group flex items-center gap-3 bg-white border rounded-xl px-4 py-3.5 shadow-sm transition-all ${
                todo.completed
                  ? "border-stone-100 opacity-60"
                  : "border-stone-200 hover:border-stone-300"
              }`}
            >
              {/* Checkbox */}
              <button
                onClick={() => toggleTodo(todo.id)}
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all cursor-pointer ${
                  todo.completed
                    ? "bg-stone-800 border-stone-800"
                    : "border-stone-300 hover:border-stone-500"
                }`}
              >
                {todo.completed && (
                  <svg
                    className="w-2.5 h-2.5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </button>

              {/* Text */}
              <span
                className={`flex-1 text-sm transition-all ${
                  todo.completed
                    ? "line-through text-stone-400"
                    : "text-stone-700"
                }`}
              >
                {todo.text}
              </span>

              {/* Delete button */}
              <button
                onClick={() => deleteTodo(todo.id)}
                className="opacity-0 group-hover:opacity-100 text-stone-300 hover:text-red-400 transition-all cursor-pointer p-0.5"
                aria-label="削除"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>

        {/* Footer */}
        {todos.length > 0 && (
          <div className="mt-6 flex justify-between items-center text-xs text-stone-300">
            <span>{todos.length} 件のタスク</span>
            <button
              onClick={() => setTodos((prev) => prev.filter((t) => !t.completed))}
              className="hover:text-stone-500 transition-colors cursor-pointer"
            >
              完了済みを削除
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
