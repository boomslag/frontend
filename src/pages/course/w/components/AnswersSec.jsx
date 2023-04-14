import React from 'react';
import AnswersList from './AnswersList';

export default function AnswersSec({
  answers,
  fetchAnswers,
  question,
  episode,
  count,
  setCount,
  pageSize,
  setPageSize,
  currentPage,
  setCurrentPage,
  maxPageSize,
  setMaxPageSize,
  filterBy,
  setFilterBy,
  orderBy,
  setOrderBy,
  searchTerm,
  setSearchTerm,
  loading,
  setLoading,
  authState,
}) {
  return (
    <div className="px-4">
      <AnswersList
        answers={answers}
        authState={authState}
        fetchAnswers={fetchAnswers}
        question={question}
        episode={episode}
        count={count}
        setCount={setCount}
        pageSize={pageSize}
        setPageSize={setPageSize}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        maxPageSize={maxPageSize}
        setMaxPageSize={setMaxPageSize}
        filterBy={filterBy}
        setFilterBy={setFilterBy}
        orderBy={orderBy}
        setOrderBy={setOrderBy}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        loading={loading}
        setLoading={setLoading}
      />
    </div>
  );
}
