// SearchBar.jsx
import React from 'react';
import { createEvent, createStore, createEffect } from 'effector';

// Событие для изменения значения поискового запроса
export const searchInputChanged = createEvent();

// Эффект для выполнения поискового запроса (здесь может быть ваш запрос к серверу)
export const performSearch = createEffect(async (searchTerm) => {
  // Здесь может быть ваш код обработки поискового запроса
  // Например, отправка запроса к серверу и получение результатов
  console.log('Выполняем поиск с запросом:', searchTerm);
  return []; // Замените этот массив результатами поиска
});

// Состояние для хранения текущего значения поискового запроса
export const $searchTerm = createStore('').on(searchInputChanged, (_, value) => value);

// Состояние для хранения результатов поиска
export const $searchResults = createStore([]).on(performSearch.done, (_, { result }) => result);

const SearchBar = () => {
  // Обработчик изменения значения поискового запроса
  const handleSearchChange = (event) => {
    searchInputChanged(event.target.value);
  };

  // Обработчик отправки формы (поискового запроса)
  const handleSearchSubmit = (event) => {
    event.preventDefault();
    performSearch($searchTerm.getState()); // Вызываем эффект для выполнения поискового запроса
  };

  return (
    <form onSubmit={handleSearchSubmit}>
      <input
        type="text"
        placeholder="Поиск товаров..."
        value={$searchTerm.getState()}
        onChange={handleSearchChange}
      />
      <button type="submit">Поиск</button>
      {/* Здесь можете отобразить результаты поиска */}
      <ul>
        {$searchResults.getState().map((result) => (
          <li key={result.id}>{result.name}</li>
        ))}
      </ul>
    </form>
  );
};

export default SearchBar;
